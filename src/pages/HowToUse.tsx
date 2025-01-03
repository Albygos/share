import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import { FileText, Image, Clock, Lock } from 'lucide-react';

const HowToUse = () => {
  return (
    <>
      <Helmet>
        <title>How to Use ShareClip - Quick Guide</title>
        <meta name="description" content="Learn how to use ShareClip for secure text and image sharing. Simple steps to share and retrieve content." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="How to Use ShareClip"
          description="Follow these simple steps to share text and images securely"
        />

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-indigo-600" />
                  Sharing Text
                </h2>
                <ol className="mt-4 space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">1.</span>
                    Go to the Text Share page
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">2.</span>
                    Enter your text in the input field
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">3.</span>
                    Click "Save Text" to get a unique 3-digit ID
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">4.</span>
                    Share the ID with the recipient
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Image className="h-6 w-6 mr-2 text-indigo-600" />
                  Sharing Images
                </h2>
                <ol className="mt-4 space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">1.</span>
                    Navigate to the Image Share page
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">2.</span>
                    Upload your image (up to 10MB)
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">3.</span>
                    Get your unique 3-digit ID
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">4.</span>
                    Share the ID with others
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-indigo-600" />
                  Content Expiration
                </h2>
                <p className="mt-4 text-gray-600">
                  All shared content automatically expires after 3 minutes for security. Make sure recipients access the content within this timeframe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Lock className="h-6 w-6 mr-2 text-indigo-600" />
                  Security Tips
                </h2>
                <ul className="mt-4 space-y-4 text-gray-600">
                  <li>Share IDs through a different communication channel than the sensitive content</li>
                  <li>Ensure recipients are ready to access the content before sharing</li>
                  <li>Don't share the same content multiple times with the same ID</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;