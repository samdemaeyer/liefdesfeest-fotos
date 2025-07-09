"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UploadedFile } from "@/types";
import { formatFileSize, validateImageFile } from "@/lib/utils";

export default function HomePage() {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const uploadFile = async (file: File) => {
		try {
			// Get presigned URL
			const response = await fetch("/api/upload/presigned-url", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filename: file.name,
					fileType: file.type,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get upload URL");
			}

			const { uploadUrl, key } = await response.json();

			// Upload file to S3
			const uploadResponse = await fetch(uploadUrl, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": file.type,
				},
			});

			if (!uploadResponse.ok) {
				throw new Error("Failed to upload file");
			}

			return { key, url: uploadUrl.split("?")[0] };
		} catch (error) {
			console.error("Upload error:", error);
			throw error;
		}
	};

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setIsUploading(true);

		// Validate files before processing
		const validFiles = acceptedFiles.filter((file) => {
			const validation = validateImageFile(file);
			if (!validation.isValid) {
				console.error(`File ${file.name} validation failed:`, validation.error);
				// You could show a toast notification here
				return false;
			}
			return true;
		});

		const newFiles: UploadedFile[] = validFiles.map((file) => ({
			file,
			key: "",
			url: "",
			status: "uploading" as const,
		}));

		setUploadedFiles((prev) => [...prev, ...newFiles]);

		// Upload files concurrently
		const uploadPromises = validFiles.map(async (file, index) => {
			try {
				const { key, url } = await uploadFile(file);

				setUploadedFiles((prev) =>
					prev.map((f, i) =>
						i >= prev.length - validFiles.length + index
							? { ...f, key, url, status: "success" as const }
							: f,
					),
				);
			} catch (error) {
				console.error("Upload error:", error);
				setUploadedFiles((prev) =>
					prev.map((f, i) =>
						i >= prev.length - validFiles.length + index
							? { ...f, status: "error" as const }
							: f,
					),
				);
			}
		});

		await Promise.all(uploadPromises);
		setIsUploading(false);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
		},
		multiple: true,
	});

	const removeFile = (index: number) => {
		setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Photo Upload
					</h1>
					<p className="text-lg text-gray-600">
						Securely upload your photos to AWS S3
					</p>
				</div>

				{/* Upload Area */}
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
						isDragActive
							? "border-blue-500 bg-blue-50"
							: "border-gray-300 hover:border-gray-400"
					}`}
				>
					<input {...getInputProps()} />
					<div className="space-y-4">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div>
							<p className="text-xl text-gray-600">
								{isDragActive
									? "Drop your photos here..."
									: "Drag and drop photos here, or click to select"}
							</p>
							<p className="text-sm text-gray-500 mt-2">
								Supports: JPEG, PNG, GIF, WebP
							</p>
						</div>
					</div>
				</div>

				{/* Upload Status */}
				{isUploading && (
					<div className="mt-6 text-center">
						<div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Uploading photos...
						</div>
					</div>
				)}

				{/* Uploaded Files */}
				{uploadedFiles.length > 0 && (
					<div className="mt-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Uploaded Photos
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{uploadedFiles.map((fileData, index) => (
								<div
									key={index}
									className="bg-white rounded-lg shadow-md overflow-hidden"
								>
									<div className="aspect-square relative">
										{fileData.status === "success" && (
											<Image
												src={URL.createObjectURL(fileData.file)}
												alt={fileData.file.name}
												fill
												className="object-cover"
											/>
										)}
										{fileData.status === "uploading" && (
											<div className="flex items-center justify-center h-full bg-gray-100">
												<svg
													className="animate-spin h-8 w-8 text-gray-600"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
											</div>
										)}
										{fileData.status === "error" && (
											<div className="flex items-center justify-center h-full bg-red-100">
												<svg
													className="h-8 w-8 text-red-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
										)}
									</div>
									<div className="p-4">
										<p className="text-sm font-medium text-gray-900 truncate">
											{fileData.file.name}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											{formatFileSize(fileData.file.size)}
										</p>
										<div className="mt-2 flex items-center justify-between">
											<span
												className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
													fileData.status === "success"
														? "bg-green-100 text-green-800"
														: fileData.status === "uploading"
															? "bg-blue-100 text-blue-800"
															: "bg-red-100 text-red-800"
												}`}
											>
												{fileData.status === "success"
													? "Uploaded"
													: fileData.status === "uploading"
														? "Uploading..."
														: "Failed"}
											</span>
											<button
												onClick={() => removeFile(index)}
												className="text-red-600 hover:text-red-800 text-sm"
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
