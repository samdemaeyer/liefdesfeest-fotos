import { NextResponse } from "next/server";
import { s3Client, generateViewUrl } from "@/lib/s3";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET() {
	try {
		const command = new ListObjectsV2Command({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Prefix: process.env.S3_UPLOAD_FOLDER || "uploads/",
		});

		const response = await s3Client.send(command);

		if (!response.Contents) {
			return NextResponse.json({ photos: [] });
		}

		// Filter out folder entries and generate pre-signed URLs
		const photos = await Promise.all(
			response.Contents.filter(
				(object) =>
					object.Key &&
					!object.Key.endsWith("/") &&
					object.Size &&
					object.Size > 0,
			).map(async (object) => {
				const viewUrl = await generateViewUrl(object.Key!, 3600); // 1 hour expiry
				return {
					key: object.Key!,
					url: viewUrl,
					size: object.Size!,
					lastModified: object.LastModified!,
					filename: object.Key!.split("/").pop() || object.Key!,
				};
			}),
		);

		// Sort by most recent first
		photos.sort(
			(a, b) =>
				new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime(),
		);

		return NextResponse.json({ photos });
	} catch (error) {
		console.error("Error listing photos:", error);
		return NextResponse.json(
			{ error: "Failed to list photos" },
			{ status: 500 },
		);
	}
}
