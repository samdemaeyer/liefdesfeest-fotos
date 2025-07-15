import { NextRequest, NextResponse } from 'next/server';
import { generatePresignedUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const { filename, fileType } = await request.json();

    if (!filename || !fileType) {
      return NextResponse.json(
        { error: 'Filename and file type are required' },
        { status: 400 }
      );
    }

    // Validate file type (only allow images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    const { uploadUrl, key } = await generatePresignedUrl(filename, fileType);

    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
