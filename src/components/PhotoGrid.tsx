"use client";

import { useState, useEffect } from "react";
import { Photo, PhotosResponse } from "@/types";
import PhotoLightbox from "./PhotoLightbox";

interface PhotoGridProps {
	refreshTrigger?: number;
}

export default function PhotoGrid({ refreshTrigger = 0 }: PhotoGridProps) {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
		null,
	);

	const fetchPhotos = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch("/api/photos");

			if (!response.ok) {
				throw new Error("Failed to fetch photos");
			}

			const data: PhotosResponse = await response.json();
			setPhotos(data.photos);
		} catch (err) {
			console.error("Error fetching photos:", err);
			setError("Failed to load photos");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, [refreshTrigger]);

	const openLightbox = (index: number) => {
		setSelectedPhotoIndex(index);
	};

	const closeLightbox = () => {
		setSelectedPhotoIndex(null);
	};

	if (loading) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">
					Photo Gallery
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							className="aspect-square bg-gray-200 rounded-lg animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">
					Photo Gallery
				</h2>
				<div className="text-center py-8">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={fetchPhotos}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (photos.length === 0) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">
					Photo Gallery
				</h2>
				<div className="text-center py-8">
					<div className="w-16 h-16 mx-auto mb-4 text-gray-400">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<p className="text-gray-600">No photos uploaded yet</p>
					<p className="text-sm text-gray-500 mt-1">
						Upload your first photo to get started!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-semibold text-gray-900 mb-4">
				Photo Gallery ({photos.length} photo{photos.length !== 1 ? "s" : ""})
			</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
				{photos.map((photo, index) => (
					<div
						key={photo.key}
						className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group bg-gray-200 hover:shadow-lg transition-shadow"
						onClick={() => openLightbox(index)}
					>
						<img
							src={photo.url}
							alt={photo.filename}
							className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
							onError={(e) => {
								console.error(
									"Image failed to load:",
									photo.filename,
									photo.url,
								);
								// Show placeholder
								e.currentTarget.src =
									"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNTAgMTUwTDEwMCAxMDBMMTUwIDE1MEg1MFoiIGZpbGw9IiNEMUQ1REIiLz48Y2lyY2xlIGN4PSIxMzAiIGN5PSI3MCIgcj0iMTAiIGZpbGw9IiNEMUQ1REIiLz48L3N2Zz4=";
							}}
							onLoad={() => {
								console.log("Image loaded successfully:", photo.filename);
							}}
						/>

						{/* Hover overlay */}
						<div className="inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center">
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
									/>
								</svg>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Lightbox */}
			{selectedPhotoIndex !== null && (
				<PhotoLightbox
					photos={photos}
					currentIndex={selectedPhotoIndex}
					onClose={closeLightbox}
					onNext={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
					onPrevious={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
				/>
			)}
		</div>
	);
}
