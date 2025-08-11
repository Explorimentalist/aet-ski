// src/app/admin/upload-logos/page.tsx
'use client';

import { useState } from 'react';
import { uploadAllLogos } from '@/utils/uploadLogos';
import { Button } from '@/components/Button';
import { getLogosForUpload } from '@/data/logos';

export default function UploadLogosPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<Array<{success: boolean; name: string; publicId?: string; error?: string}>>([]);
  const [showPreview, setShowPreview] = useState(false);

  const logosToUpload = getLogosForUpload();

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const uploadResults = await uploadAllLogos();
      setResults(uploadResults);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Logo Upload Utility
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Upload Logos to Cloudinary
          </h2>
          
          <p className="text-gray-600 mb-6">
            This will upload {logosToUpload.length} logos to your Cloudinary account in the &quot;logos&quot; folder.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="secondary"
              className="mr-4"
            >
              {showPreview ? 'Hide' : 'Show'} Logo Preview
            </Button>

            <Button
              onClick={handleUpload}
              disabled={isUploading}
              variant="primary"
            >
              {isUploading ? 'Uploading...' : 'Upload All Logos'}
            </Button>
          </div>
        </div>

        {showPreview && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Logos to Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {logosToUpload.map((logo) => (
                <div key={logo.publicId} className="border rounded p-4">
                  <h4 className="font-medium text-sm mb-2">{logo.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">ID: {logo.publicId}</p>
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="w-full h-16 object-contain bg-gray-100 rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1 break-all">
                    {logo.url}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Results</h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded ${
                    result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{result.name}</span>
                    <span className="text-sm">
                      {result.success ? '✅ Success' : '❌ Failed'}
                    </span>
                  </div>
                  {result.success && (
                    <p className="text-sm mt-1">
                      Public ID: {result.publicId}
                    </p>
                  )}
                  {!result.success && (
                    <p className="text-sm mt-1">
                      Error: {result.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Make sure you have configured your Cloudinary upload preset &quot;aet-ski-preset&quot;</li>
            <li>• This page is for development/admin use only</li>
            <li>• Remove this page before deploying to production</li>
            <li>• Check the browser console for detailed upload logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
