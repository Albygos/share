import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shared content stay available?",
      answer: "All shared content (both text and images) automatically expires after 3 minutes for security purposes."
    },
    {
      question: "Is there a size limit for images?",
      answer: "Yes, images must be under 10MB in size. Supported formats include PNG, JPG, and GIF."
    },
    {
      question: "Can I delete shared content before it expires?",
      answer: "Currently, content can't be manually deleted before expiration. It will automatically delete after 3 minutes."
    },
    {
      question: "Is my shared content secure?",
      answer: "Yes, content is shared using randomly generated 3-digit IDs and automatically expires. However, anyone with the ID can access the content within the 3-minute window."
    },
    {
      question: "What happens if someone tries to access expired content?",
      answer: "They'll receive a message indicating that the content has expired or doesn't exist."
    }
  ];

  return (
    <>
      <Helmet>
        <title>ShareClip FAQ - Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about using ShareClip for secure content sharing." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <PageHeader 
          title="Frequently Asked Questions"
          description="Find answers to common questions about ShareClip"
        />

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;