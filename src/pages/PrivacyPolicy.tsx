import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - ShareClip</title>
        <meta name="description" content="ShareClip's privacy policy explains how we handle your data and protect your privacy." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Privacy Policy"
          description="Last updated: March 2024"
        />

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Information Collection</h2>
              <p className="mt-4 text-gray-600">
                ShareClip is designed with privacy in mind. We only temporarily store the content you choose to share, and it's automatically deleted after 3 minutes. We do not collect any personal information unless explicitly provided through our contact form.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Data Storage</h2>
              <p className="mt-4 text-gray-600">
                All shared content is stored securely and temporarily. We use industry-standard encryption to protect your data during transmission and storage. Content is automatically deleted after 3 minutes, leaving no permanent record.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
              <p className="mt-4 text-gray-600">
                ShareClip uses only essential cookies necessary for the functioning of the service. We do not use tracking or advertising cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
              <p className="mt-4 text-gray-600">
                We use Firebase for temporary content storage. Please refer to Google's privacy policy for information about how Firebase handles data.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;