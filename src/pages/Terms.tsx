import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - ShareClip</title>
        <meta name="description" content="Read ShareClip's terms of service to understand your rights and responsibilities when using our service." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Terms of Service"
          description="Last updated: March 2024"
        />

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Acceptance of Terms</h2>
              <p className="mt-4 text-gray-600">
                By accessing and using ShareClip, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Use License</h2>
              <p className="mt-4 text-gray-600">
                ShareClip grants you a temporary, limited license to use our service for sharing text and images. All shared content must comply with applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Prohibited Content</h2>
              <p className="mt-4 text-gray-600">
                Users may not share:
              </p>
              <ul className="mt-2 list-disc pl-5 text-gray-600">
                <li>Illegal content</li>
                <li>Malicious software</li>
                <li>Copyrighted material without permission</li>
                <li>Harmful or offensive content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
              <p className="mt-4 text-gray-600">
                ShareClip is provided "as is" without warranties of any kind. We are not responsible for any damages or losses resulting from the use of our service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;