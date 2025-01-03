import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact ShareClip - Get Support</title>
        <meta name="description" content="Contact our support team for help with ShareClip. We're here to assist you with any questions or issues." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Contact Us"
          description="Get in touch with our support team"
        />

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-indigo-600" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">Email Support</h3>
                </div>
                <p className="mt-2 text-gray-600">
                  For general inquiries and support:
                  <a href="mailto:support@shareclip.com" className="block mt-1 text-indigo-600 hover:text-indigo-500">
                    support@shareclip.com
                  </a>
                </p>
              </div>

              <div>
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">Live Chat</h3>
                </div>
                <p className="mt-2 text-gray-600">
                  Chat with our support team during business hours:
                  <span className="block mt-1">
                    Monday - Friday, 9AM - 5PM EST
                  </span>
                </p>
              </div>
            </div>

            <form className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;