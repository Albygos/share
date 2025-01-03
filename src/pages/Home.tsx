import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ref, set, get, remove } from 'firebase/database';
import { db } from '../lib/firebase';
import { Copy, Save, Search } from 'lucide-react';

const Home = () => {
  const [text, setText] = useState('');
  const [fetchId, setFetchId] = useState('');
  const [result, setResult] = useState<{ text: string; id?: string } | null>(null);

  const generateId = () => Math.floor(100 + Math.random() * 900).toString();

  const saveText = async () => {
    if (!text) {
      alert('Please enter some text.');
      return;
    }

    const id = generateId();
    const textRef = ref(db, `clipboard/${id}`);

    try {
      await set(textRef, { text, timestamp: Date.now() });
      setResult({ text, id });
      setText('');

      // Auto-delete after 3 minutes
      setTimeout(async () => {
        await remove(textRef);
        if (result?.id === id) {
          setResult(null);
        }
      }, 180000);
    } catch (error) {
      console.error('Error saving text:', error);
      alert('Failed to save text. Please try again.');
    }
  };

  const fetchText = async () => {
    if (!fetchId) {
      alert('Please enter an ID.');
      return;
    }

    const textRef = ref(db, `clipboard/${fetchId}`);
    try {
      const snapshot = await get(textRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setResult({ text: data.text });
      } else {
        alert('No text found for this ID or it has expired.');
      }

      setFetchId('');
    } catch (error) {
      console.error('Error fetching text:', error);
      alert('Failed to fetch text. Please try again.');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>ShareClip - Secure Text Sharing</title>
        <meta name="description" content="Share text securely with auto-expiring links. Perfect for sharing sensitive information temporarily." />
        <meta name="keywords" content="online clipboard, text sharing, secure sharing, temporary text storage" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Share Text Securely</h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                  Enter your text
                </label>
                <div className="mt-1">
                  <textarea
                    id="text"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <button
                  onClick={saveText}
                  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Text
                </button>
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
                  Fetch text by ID
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
                    onClick={fetchText}
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
                    <div className="flex">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-blue-800">
                          {result.id ? `Text saved! ID: ${result.id}` : 'Retrieved Text'}
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>{result.text}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.text)}
                        className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">How it works</h2>
            <div className="mt-4 text-sm text-gray-500">
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter your text in the input field above</li>
                <li>Click "Save Text" to get a unique 3-digit ID</li>
                <li>Share the ID with someone who needs to access the text</li>
                <li>They can retrieve the text by entering the ID in the fetch field</li>
                <li>The text automatically expires after 3 minutes for security</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;