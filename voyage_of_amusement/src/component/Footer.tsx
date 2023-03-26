import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center w-full h-16 border-t fixed bottom-0 bg-slate-50">
      <div className="flex flex-col items-center">
        <small className="text-gray-500 mb-2">
          Made with <span role="img" aria-label="heart">❤️</span> with
          <Link  className="ml-1 text-blue-500 underline hover:text-blue-600" href="https://nextjs.org/" passHref>
            Next.js
          </Link>
        </small>
        <small className="text-gray-500 flex items-center">
          By students at NYU Tandon School of Engineering <span role="img" aria-label="NYU logo">🎓</span>, NYC
        </small>
      </div>
    </footer>
  );
};

export default Footer;
