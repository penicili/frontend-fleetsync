import React from 'react';
import Image from 'next/image';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Hero Image Section */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative">
        <Image
          src="/images/retrocar.jpg"
          alt="Auth Hero"
          fill
          className="object-cover"
        />
      </div>
      {/* Auth Box Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
