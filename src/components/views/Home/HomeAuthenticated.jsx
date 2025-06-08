import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const HomeAuthenticated = ({ session }) => {
  const router = useRouter();
  const [showAuthDetails, setShowAuthDetails] = useState(false);
  const handleSignOut = () => signOut({ redirect: true, callbackUrl: '/' });
  
  const handleManageFleet = () => {
    router.push('/vehicle');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">FleetHub Dashboard</h1>
        <button 
          onClick={handleSignOut}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Welcome, {session.user?.name || 'User'}!
          </h2>
          <p className="text-lg text-blue-700 mb-6">
            You've successfully authenticated with your account.
          </p>
          
          {/* Dashboard sections */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={handleManageFleet}
              className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-md hover:bg-blue-100 transition-colors text-left w-full"
            >
              <h3 className="font-bold text-blue-800">Manage Fleet</h3>
              <p className="text-blue-600 text-sm">View and manage your vehicle fleet</p>
            </button>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-md">
              <h3 className="font-bold text-blue-800">Driver Management</h3>
              <p className="text-blue-600 text-sm">Manage your drivers and assignments</p>
            </div>
          </div>            {/* Token display */}
          {session.accessToken && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">              <div 
                className="flex justify-between items-center mb-2 cursor-pointer"
                onClick={() => setShowAuthDetails(!showAuthDetails)}
              >
                <h3 className="font-semibold text-gray-700">Authentication Details</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-all duration-300 ease-in-out">
                  <span>{showAuthDetails ? 'Hide Details' : 'Show Details'}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`ml-1 transition-transform duration-300 ${showAuthDetails ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
                {session.user.tokenData && (
                <div 
                  className={`mt-2 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                    showAuthDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="my-1"><span className="font-medium">Username:</span> {session.user.tokenData.username}</p>
                  <p className="my-1"><span className="font-medium">Email:</span> {session.user.tokenData.email}</p>
                  <p className="my-1"><span className="font-medium">Role:</span> {session.user.tokenData.role}</p>
                  {session.user.tokenData.exp && (
                    <p className="my-1"><span className="font-medium">Expires:</span> {new Date(session.user.tokenData.exp * 1000).toLocaleString()}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeAuthenticated;
