import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Redirection: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const deepLinkUrl = searchParams.get('url');
    if (deepLinkUrl) {
      // Redirect to the deep link URL
      window.location.href = deepLinkUrl;
    } else {
      console.error('No URL parameter found for redirection');
    }
  }, [searchParams]);

  return (
    <div className="bg-blue-100 w-screen h-screen flex items-center flex-col justify-center gap-3">
      <p className="text-center text-3xl font-bold">Redirecting...</p>
      <p className="text-center text-xl font-semibold">If not redirected automatically, <a className="text-blue-500 underline" href={searchParams.get('url') || '#'}>click here</a>.</p>
    </div>
  );
};

export default Redirection;
