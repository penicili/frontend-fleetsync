'use client';

import { useDriverLogic } from './driverLogic';

export default function DriverManagement() {
  const {
    drivers,
    name,
    setName,
    licenseNumber,
    setLicenseNumber,
    email,
    setEmail,
    status,
    setStatus,
    vehicleId,
    setVehicleId,
    selectedDriverId,
    setSelectedDriverId,
    error,
    success,
    handleCreateDriver,
    handleAssignDriver,
    handleUpdateDriver,
    handleDeleteDriver,
    handleEditDriver,
  } = useDriverLogic();

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Driver Management Dashboard</h1>

      {/* Create/Update Driver Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {selectedDriverId ? 'Update Driver' : 'Add New Driver'}
        </h2>
        <form onSubmit={selectedDriverId ? (e) => { e.preventDefault(); handleUpdateDriver(selectedDriverId); } : handleCreateDriver}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Driver Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">License Number</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="available">Available</option>
                <option value="on_duty">On Duty</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {selectedDriverId ? 'Update Driver' : 'Create Driver'}
            </button>
            {selectedDriverId && (
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setLicenseNumber('');
                  setEmail('');
                  setStatus('available');
                  setSelectedDriverId(null);
                }}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Assign Driver Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Assign Driver to Vehicle</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Vehicle ID</label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
        <button
          onClick={() => handleAssignDriver(selectedDriverId)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition flex items-center"
          disabled={!selectedDriverId || !vehicleId}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Assign Driver
        </button>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded-lg">
          {success}
        </div>
      )}

      {/* Drivers List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Drivers List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">License Number</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Assigned Vehicle</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr
                  key={driver.id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
                >
                  <td className="p-3">{driver.name}</td>
                  <td className="p-3">{driver.license_number}</td>
                  <td className="p-3">{driver.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : driver.status === 'on_duty'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-3">{driver.assigned_vehicle || 'None'}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEditDriver(driver.id)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedDriverId(driver.id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}