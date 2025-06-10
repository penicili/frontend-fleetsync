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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Management</h1>

      {/* Create/Update Driver Form */}
      <form onSubmit={selectedDriverId ? (e) => { e.preventDefault(); handleUpdateDriver(selectedDriverId); } : handleCreateDriver} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium">Driver Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">License Number</label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="available">Available</option>
            <option value="on_duty">On Duty</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
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
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Assign Driver Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Assign Driver to Vehicle</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Vehicle ID</label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          onClick={() => handleAssignDriver(selectedDriverId)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!selectedDriverId || !vehicleId}
        >
          Assign Driver
        </button>
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Drivers List */}
      <h2 className="text-xl font-semibold mb-2">Drivers List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">License Number</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Assigned Vehicle</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="border p-2">{driver.name}</td>
              <td className="border p-2">{driver.license_number}</td>
              <td className="border p-2">{driver.email}</td>
              <td className="border p-2">{driver.status}</td>
              <td className="border p-2">{driver.assigned_vehicle || 'None'}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditDriver(driver.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDriver(driver.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedDriverId(driver.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Select for Assignment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}