import React from 'react';
import { signOut } from 'next-auth/react';

const HomeAuthenticated = ({ session }) => {
  const handleSignOut = () => signOut({ redirect: true, callbackUrl: '/' });
  
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
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-md">
              <h3 className="font-bold text-blue-800">Manage Fleet</h3>
              <p className="text-blue-600 text-sm">View and manage your vehicle fleet</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-md">
              <h3 className="font-bold text-blue-800">Driver Management</h3>
              <p className="text-blue-600 text-sm">Manage your drivers and assignments</p>
            </div>
          </div>
            {/* Token display */}
          {session.accessToken && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">Authentication Details</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
              
              {session.user.tokenData && (
                <div className="mt-2 text-sm">
                  <p><span className="font-medium">Username:</span> {session.user.tokenData.username}</p>
                  <p><span className="font-medium">Email:</span> {session.user.tokenData.email}</p>
                  <p><span className="font-medium">Role:</span> {session.user.tokenData.role}</p>
                  {session.user.tokenData.exp && (
                    <p><span className="font-medium">Expires:</span> {new Date(session.user.tokenData.exp * 1000).toLocaleString()}</p>
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
