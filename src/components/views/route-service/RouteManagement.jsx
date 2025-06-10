'use client';

import { useRouteLogic } from './routeLogic';

export default function RouteManagement() {
  const {
    routes,
    driverId,
    setDriverId,
    vehicleId,
    setVehicleId,
    startLocation,
    setStartLocation,
    endLocation,
    setEndLocation,
    startTime,
    setStartTime,
    notes,
    setNotes,
    status,
    setStatus,
    selectedRouteId,
    setSelectedRouteId,
    error,
    success,
    handleCreateRoute,
    handleUpdateStatus,
    handleViewRoute,
    fetchActiveRoutes,
  } = useRouteLogic();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Route Management</h1>

      {/* Create Route Form */}
      <form onSubmit={handleCreateRoute} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium">Driver ID</label>
          <input
            type="number"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Vehicle ID</label>
          <input
            type="number"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Start Location</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">End Location</label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Start Time (YYYY-MM-DD HH:MM:SS)</label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
            placeholder="2025-06-08 08:00:00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Route
        </button>
      </form>

      {/* Update Route Status Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Route Status</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={() => handleUpdateStatus(selectedRouteId)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!selectedRouteId}
        >
          Update Status
        </button>
      </div>

      {/* Active Routes Button */}
      <div className="mb-6">
        <button
          onClick={fetchActiveRoutes}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Show Active Routes
        </button>
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Routes List */}
      <h2 className="text-xl font-semibold mb-2">Routes List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Driver</th>
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Start Location</th>
            <th className="border p-2">End Location</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td className="border p-2">{route.driver ? route.driver.name : 'N/A'}</td>
              <td className="border p-2">{route.vehicle ? route.vehicle.plate_number : 'N/A'}</td>
              <td className="border p-2">{route.start_location}</td>
              <td className="border p-2">{route.end_location}</td>
              <td className="border p-2">{new Date(route.start_time).toLocaleString()}</td>
              <td className="border p-2">{route.status}</td>
              <td className="border p-2">{route.notes || 'None'}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleViewRoute(route.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => setSelectedRouteId(route.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Select for Status Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}