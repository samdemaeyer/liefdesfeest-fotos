'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import type { UploadedFile } from '@/types';
import { formatFileSize, validateImageFile } from '@/lib/utils';
import PhotoGrid from '@/components/PhotoGrid';
import { useIsMobile } from '@/hooks/useIsMobile';
import WeddingHeader from '@/components/WeddingHeader';

export default function HomePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshGallery, setRefreshGallery] = useState(0);
  const isMobile = useIsMobile();

  const uploadFile = useCallback(async (file: File) => {
    try {
      // Get presigned URL
      const response = await fetch('/api/upload/presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, key } = await response.json();

      // Upload file to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      return { key, url: uploadUrl.split('?')[0] };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);

      // Validate files before processing
      const validFiles = acceptedFiles.filter((file) => {
        const validation = validateImageFile(file);
        if (!validation.isValid) {
          console.error(
            `File ${file.name} validation failed:`,
            validation.error
          );
          // You could show a toast notification here
          return false;
        }
        return true;
      });

      const newFiles: UploadedFile[] = validFiles.map((file) => ({
        file,
        key: '',
        url: '',
        status: 'uploading' as const,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Upload files concurrently
      const uploadPromises = validFiles.map(async (file, index) => {
        try {
          const { key, url } = await uploadFile(file);

          setUploadedFiles((prev) =>
            prev.map((f, i) =>
              i >= prev.length - validFiles.length + index
                ? { ...f, key, url, status: 'success' as const }
                : f
            )
          );
        } catch (error) {
          console.error('Upload error:', error);
          setUploadedFiles((prev) =>
            prev.map((f, i) =>
              i >= prev.length - validFiles.length + index
                ? { ...f, status: 'error' as const }
                : f
            )
          );
        }
      });

      await Promise.all(uploadPromises);
      setIsUploading(false);
      // Refresh the gallery to show new uploads
      setRefreshGallery((prev) => prev + 1);
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='min-h-screen wedding-bg wedding-pattern'>
      {/* Wedding Header */}
      <WeddingHeader />

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-[#841811] bg-[#841811]/10 shadow-lg'
              : 'border-[#841811]/30 hover:border-[#841811]/60 hover:bg-[#841811]/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className='space-y-6'>
            {/* Upload Icon */}
            <div className='mx-auto w-20 h-20 rounded-full bg-[#841811]/10 flex items-center justify-center'>
              <svg
                className='w-10 h-10 text-[#841811]'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
              >
                <title>Upload Icon</title>
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div>
              <p className='text-xl wedding-text font-semibold mb-2'>
                {isDragActive
                  ? 'Laat je kostbare herinneringen hier vallen...'
                  : "Deel je prachtige foto's met ons"}
              </p>
              <p className='text-base wedding-text opacity-70'>
                {isMobile
                  ? 'Klik om te selecteren'
                  : 'Sleep je foto&apos;s hierheen of klik om te selecteren'}
              </p>
              {!isMobile && (
                <p className='text-sm wedding-text opacity-50 mt-2'>
                  Ondersteunt: JPEG, PNG, GIF, WebP
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Upload Status */}
        {isUploading && (
          <div className='mt-8 text-center'>
            <div className='inline-flex items-center px-6 py-3 bg-[#841811]/10 text-[#841811] rounded-lg border border-[#841811]/20'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-[#841811]'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <title>Animate spin</title>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              <span className='font-semibold'>
                Je herinneringen uploaden...
              </span>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className='mt-12'>
            <h2 className='wedding-title text-2xl font-bold mb-6 text-center'>
              Je Geüploade Foto&apos;s
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.file.name}-${index}`}
                  className='relative rounded-lg overflow-hidden border-2 border-[#841811]/20 hover:border-[#841811]/40 transition-all duration-300'
                >
                  <div className='aspect-square bg-[#841811]/5 flex items-center justify-center'>
                    {file.status === 'uploading' && (
                      <div className='text-center'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#841811] mx-auto mb-2'></div>
                        <p className='text-sm wedding-text'>Uploaden...</p>
                      </div>
                    )}
                    {file.status === 'success' && (
                      <div className='w-full h-full relative'>
                        <Image
                          src={URL.createObjectURL(file.file)}
                          alt={file.file.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className='text-center'>
                        <div className='text-red-500 text-2xl mb-2'>✕</div>
                        <p className='text-sm text-red-600'>Upload mislukt</p>
                      </div>
                    )}
                  </div>
                  <div className='p-3 bg-white/80 backdrop-blur-sm'>
                    <p className='text-sm wedding-text font-medium truncate'>
                      {file.file.name}
                    </p>
                    <p className='text-xs wedding-text opacity-70'>
                      {formatFileSize(file.file.size)}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        <div className='mt-12'>
          <h2 className='wedding-title text-3xl font-bold mb-8 text-center decorative-border'>
            Onze Prachtige Herinneringen
          </h2>
          <PhotoGrid key={refreshGallery} />
        </div>
      </div>
    </div>
  );
}
