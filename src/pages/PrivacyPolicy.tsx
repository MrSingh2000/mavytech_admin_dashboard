import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          <strong>Effective Date:: 01/01/2025</strong>
        </p>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            At <strong>MavyTech solutions</strong>, we value your
            privacy and are committed to protecting the personal and sensitive
            data of our users. This Privacy Policy applies to our app{' '}
            <strong>MavyTech</strong>, as listed on the Google Play Store, and
            outlines how we collect, use, share, and safeguard your information.
          </p>
          <p className="text-gray-700">
            By using our app, you agree to the terms outlined in this Privacy
            Policy.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Information We Collect
          </h2>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            1. Personal and Sensitive User Data
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Name, email address, and phone number (if applicable).</li>
            <li>
              Location data: Used to provide location-based services, such as
              connecting you to nearby people and services.
            </li>
            <li>
              Media files: Accessed with your permission to allow uploading and
              sharing of photos or documents within the app.
            </li>
            <li>Other sensitive data explicitly provided by the user.</li>
          </ul>
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-2">
            2. Non-Personal Data
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Device information: Includes device type, operating system, and
              app usage analytics.
            </li>
            <li>Network and performance metrics.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            How We Use Your Data
          </h2>
          <p className="text-gray-700 mb-4">
            The information we collect is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To provide app functionality and core features.</li>
            <li>To personalize the user experience.</li>
            <li>To enable location-based services and content.</li>
            <li>To improve app performance and fix bugs.</li>
            <li>To communicate important updates or promotional offers.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Data Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell or rent your personal data. We may share user data
            with third parties under the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Service Providers:</strong> For features like analytics,
              payment gateways, or location services.
            </li>
            <li>
              <strong>Legal Obligations:</strong> To comply with legal
              requirements or respond to lawful requests.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Data Security
          </h2>
          <p className="text-gray-700">
            We implement appropriate security measures to safeguard your data
            from unauthorized access or disclosure. However, no method of
            transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Data Retention and Deletion Policy
          </h2>
          <p className="text-gray-700">
            We retain user data only for as long as necessary to fulfill the
            purposes outlined in this policy or to comply with legal
            obligations. You can request deletion of your data by contacting us.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be
            communicated through app updates or notifications.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Privacy Policy Contact
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns about this Privacy Policy, you
            can contact us at:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> mavytechsolutions@gmail.com
          </p>
          <p className="text-gray-700">
            <strong>Entity Name:</strong> Mavytech solutions
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
