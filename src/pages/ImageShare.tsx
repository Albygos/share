import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ref as dbRef, set, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { Upload, Search, Copy, Image, Download } from 'lucide-react';
import { convertImageToBinary, downloadImage } from '../utils/imageUtils';

const ImageShare = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fetchId, setFetchId] = useState('');
  const [result, setResult] = useState<{ url: string; id?: string; filename?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.floor(100 + Math.random() * 900).toString();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadImage = async () => {
    if (!file) {
      alert('Please select an image.');
      return;
    }

    const id = generateId();
    const imageRef = dbRef(db, `images/${id}`);

    try {
      const binaryData = await convertImageToBinary(file);
      
      await set(imageRef, {
        data: binaryData,
        filename: file.name,
        timestamp: Date.now()
      });

      setResult({ url: binaryData, id, filename: file.name });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Auto-delete after 3 minutes
      setTimeout(async () => {
        await imageRef.remove();
        if (result?.id === id) {
          setResult(null);
        }
      }, 180000);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const fetchImage = async () => {
    if (!fetchId) {
      alert('Please enter an ID.');
      return;
    }

    const imageRef = dbRef(db, `images/${fetchId}`);
    try {
      const snapshot = await get(imageRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setResult({ 
          url: data.data,
          filename: data.filename 
        });
      } else {
        alert('No image found for this ID or it has expired.');
      }

      setFetchId('');
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Failed to fetch image. Please try again.');
    }
  };

  const handleDownload = () => {
    if (result?.url && result?.filename) {
      downloadImage(result.url, result.filename);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>ShareClip - Secure Image Sharing</title>
        <meta name="description" content="Share images securely with auto-expiring links. Perfect for sharing images temporarily." />
        <meta name="keywords" content="image sharing, secure image sharing, temporary image storage" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Share Images Securely</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {file && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Selected: {file.name}</p>
                    <button
                      onClick={uploadImage}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-sm text-gray-500">or</span>
                </div>
              </div>

              <div>
                <label htmlFor="fetchId" className="block text-sm font-medium text-gray-700">
                  Fetch image by ID
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="fetchId"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    value={fetchId}
                    onChange={(e) => setFetchId(e.target.value)}
                    placeholder="Enter 3-digit ID"
                  />
                  <button
                    onClick={fetchImage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Fetch
                  </button>
                </div>
              </div>

              {result && (
                <div className="mt-6">
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-blue-800">
                          {result.id ? `Image uploaded! ID: ${result.id}` : 'Retrieved Image'}
                        </h3>
                        <div className="mt-2">
                          <img src={result.url} alt="Shared" className="max-w-full h-auto rounded-lg" />
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(result.url)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy URL
                        </button>
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageShare;