export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const validateImageFile = (
	file: File,
): { isValid: boolean; error?: string } => {
	// Check file type
	const allowedTypes = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/gif",
		"image/webp",
	];
	if (!allowedTypes.includes(file.type)) {
		return {
			isValid: false,
			error: "Only JPEG, PNG, GIF, and WebP images are allowed",
		};
	}

	// Check file size (max 10MB)
	const maxSize = 10 * 1024 * 1024; // 10MB in bytes
	if (file.size > maxSize) {
		return {
			isValid: false,
			error: "File size must be less than 10MB",
		};
	}

	return { isValid: true };
};

export const generateUniqueFilename = (originalFilename: string): string => {
	const timestamp = Date.now();
	const randomString = Math.random().toString(36).substring(2, 15);
	const extension = originalFilename.split(".").pop();
	const nameWithoutExtension = originalFilename.replace(/\.[^/.]+$/, "");

	return `${nameWithoutExtension}-${timestamp}-${randomString}.${extension}`;
};

export const getFileExtension = (filename: string): string => {
	return filename.split(".").pop()?.toLowerCase() || "";
};

export const isImageFile = (file: File): boolean => {
	return file.type.startsWith("image/");
};

export const createImagePreview = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			if (e.target?.result) {
				resolve(e.target.result as string);
			} else {
				reject(new Error("Failed to read file"));
			}
		};

		reader.onerror = () => reject(new Error("Failed to read file"));
		reader.readAsDataURL(file);
	});
};
