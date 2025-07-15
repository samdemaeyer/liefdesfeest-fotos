export interface UploadedFile {
  file: File;
  key: string;
  url: string;
  status: 'uploading' | 'success' | 'error';
}

export interface PresignedUrlRequest {
  filename: string;
  fileType: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
}

export interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
  uploadFolder?: string;
}

export interface UploadError {
  message: string;
  code?: string;
}

export type FileStatus = 'uploading' | 'success' | 'error';

export interface FileUploadProgress {
  filename: string;
  progress: number;
  status: FileStatus;
}

export interface Photo {
  key: string;
  url: string;
  size: number;
  lastModified: Date;
  filename: string;
}

export interface PhotosResponse {
  photos: Photo[];
}
