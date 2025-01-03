import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-4">
          If you need assistance, feel free to contact us at the email below.
          We're here to help with the following:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-4">
          <li>Unblocking your account</li>
          <li>Requesting permanent account deletion</li>
          <li>Reporting any issues or concerns</li>
        </ul>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">Email</h2>
          <p className="text-blue-600 underline">
            <a href="mailto:mavytechsolutions@gmail.com">
              mavytechsolutions@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
