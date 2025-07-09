import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
	region: process.env.AWS_REGION || "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
	},
});

export const generatePresignedUrl = async (
	filename: string,
	fileType: string,
	expiresIn: number = 3600,
): Promise<{ uploadUrl: string; key: string }> => {
	const key = `${process.env.S3_UPLOAD_FOLDER || "uploads/"}${Date.now()}-${filename}`;

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: key,
		ContentType: fileType,
	});

	const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });

	return { uploadUrl, key };
};

export const generateViewUrl = async (
	key: string,
	expiresIn: number = 3600,
): Promise<string> => {
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: key,
	});

	return await getSignedUrl(s3Client, command, { expiresIn });
};

export { s3Client };
