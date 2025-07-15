# Photo Upload App

A secure, modern photo upload application built with Next.js 14 and TypeScript. This application allows users to upload photos directly to AWS S3 using pre-signed URLs for enhanced security.

## Features

- 🔐 **Secure Uploads**: Uses AWS S3 pre-signed URLs for secure file uploads
- 📸 **Image Support**: Supports JPEG, PNG, GIF, and WebP formats
- 🖱️ **Drag & Drop**: Modern drag-and-drop interface with React Dropzone
- 📱 **Responsive**: Mobile-friendly design with Tailwind CSS
- ⚡ **Fast**: Built with Next.js 14 App Router for optimal performance
- 🔄 **Real-time Status**: Live upload progress and status indicators
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS

## Prerequisites

- Node.js 18.0 or later
- npm or yarn
- AWS account with S3 bucket configured
- AWS IAM user with S3 permissions

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd liefdesfeest-fotos
npm install
```

### 2. AWS S3 Configuration

Create an S3 bucket in your AWS account:

1. Go to AWS S3 console
2. Create a new bucket
3. Configure CORS for your bucket with the following policy:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

### 3. AWS IAM User Setup

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name

# Optional: Set a folder prefix for uploads
S3_UPLOAD_FOLDER=uploads/
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── upload/
│   │   │       └── presigned-url/
│   │   │           └── route.ts          # API route for pre-signed URLs
│   │   ├── globals.css                   # Global styles
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Main upload page
│   └── lib/
│       └── s3.ts                         # S3 configuration and utilities
├── public/                               # Static assets
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript configuration
└── tailwind.config.js                    # Tailwind CSS configuration
```

## API Routes

### POST `/api/upload/presigned-url`

Generates a pre-signed URL for S3 upload.

**Request Body:**

```json
{
  "filename": "photo.jpg",
  "fileType": "image/jpeg"
}
```

**Response:**

```json
{
  "uploadUrl": "https://your-bucket.s3.amazonaws.com/...",
  "key": "uploads/1234567890-photo.jpg"
}
```

## Security Features

- **Pre-signed URLs**: Files are uploaded directly to S3 using temporary, secure URLs
- **File Type Validation**: Only image files are accepted
- **CORS Configuration**: Properly configured CORS for cross-origin uploads
- **Environment Variables**: Sensitive credentials stored in environment variables

## Customization

### Supported File Types

Modify the `allowedTypes` array in `src/app/api/upload/presigned-url/route.ts`:

```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
```

### Upload Folder Structure

Change the S3 upload folder by modifying the `S3_UPLOAD_FOLDER` environment variable.

### UI Customization

The UI is built with Tailwind CSS. Modify the classes in `src/app/page.tsx` to customize the appearance.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your S3 bucket has the correct CORS configuration
2. **Permission Denied**: Verify your IAM user has the correct S3 permissions
3. **Environment Variables**: Make sure all required environment variables are set

### Debug Mode

Add console logs to the API routes for debugging:

```typescript
console.log('Environment check:', {
  bucket: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_REGION,
  hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
});
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
