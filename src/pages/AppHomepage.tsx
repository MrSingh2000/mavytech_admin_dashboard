import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function AppHomepage() {
  return (
    <div className="min-h-screen bg-[#C8C8F4] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <img src={Logo} width="100px" />
      <header className="text-center mb-10">
        <h1 className="text-2xl font-bold text-[#4C4DDC]">
          Welcome to Mavytech!
        </h1>
        <p className="text-sm text-[#4C4DDC] mt-2">
          Connect, Share, and Explore the biotech community.
        </p>
      </header>

      <main className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-[#4C4DDC] mb-4">
          Features of our application:
        </h2>
        <ul>
          <li className="cursor-pointer text-[#4C4DDC] mt-4 mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Find services and sales posting near you.
          </li>
          <li className="cursor-pointer text-[#4C4DDC] mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Get latest service and user manuals for various machines.
          </li>
          <li className="cursor-pointer text-[#4C4DDC] mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Get latest job postings near you.
          </li>
          <li className="cursor-pointer text-[#4C4DDC] mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Whats new happening in exhibitions.
          </li>
          <li className="cursor-pointer text-[#4C4DDC] mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Learn new skills in biotech.
          </li>
          <li className="cursor-pointer text-[#4C4DDC] mb-2 hover:bg-[#f1f5ff] p-2 rounded-md transition duration-300">
            - Refer and earn.
          </li>
        </ul>
      </main>

      {/* Links Section */}
      <main className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        {/* Privacy Policy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#4C4DDC]">
            Privacy Policy
          </h2>
          <p className="text-[#4C4DDC] mt-2">
            Read our{' '}
            <Link
              to={'/privacy-policy'}
              className="text-[#FF6FD8] underline hover:text-[#4C4DDC]"
            >
              Privacy Policy
            </Link>{' '}
            to understand how we protect your data.
          </p>
        </div>

        {/* Login for Admin */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#4C4DDC]">Admin Login</h2>
          <p className="text-[#4C4DDC] mt-2">
            If you’re an admin,{' '}
            <Link
              to="/login"
              className="text-[#FF6FD8] underline hover:text-[#4C4DDC]"
            >
              login here
            </Link>{' '}
            to manage the platform.
          </p>
        </div>

        {/* App Link */}
        <div>
          <h2 className="text-2xl font-semibold text-[#4C4DDC]">
            Download the App
          </h2>
          <p className="text-[#4C4DDC] mt-2">
            Access our app on your mobile device.{' '}
            <a
              href="https://play.google.com/store/apps/details?id=com.mavy.themavytech&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6FD8] underline hover:text-[#4C4DDC]"
            >
              Get it on Google Play
            </a>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-[#4C4DDC]">
        <p className="text-sm">© 2025 Your App Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AppHomepage;
