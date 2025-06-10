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
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Route Management Dashboard</h1>

      {/* Create Route Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Route</h2>
        <form onSubmit={handleCreateRoute}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Driver ID</label>
              <input
                type="number"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Vehicle ID</label>
              <input
                type="number"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Start Location</label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">End Location</label>
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Start Time (YYYY-MM-DD HH:MM:SS)</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                placeholder="2025-06-08 08:00:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows="4"
              />
            </div>
          </div>
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
            Create Route
          </button>
        </form>
      </div>

      {/* Update Route Status Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Route Status</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={() => handleUpdateStatus(selectedRouteId)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition flex items-center"
          disabled={!selectedRouteId}
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
          Update Status
        </button>
      </div>

      {/* Active Routes Button */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <button
          onClick={fetchActiveRoutes}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition flex items-center w-full justify-center"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Show Active Routes
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

      {/* Routes List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Routes List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Start Location</th>
                <th className="p-3 text-left">End Location</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Notes</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr
                  key={route.id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
                >
                  <td className="p-3">{route.driver ? route.driver.name : 'N/A'}</td>
                  <td className="p-3">{route.vehicle ? route.vehicle.plate_number : 'N/A'}</td>
                  <td className="p-3">{route.start_location}</td>
                  <td className="p-3">{route.end_location}</td>
                  <td className="p-3">{new Date(route.start_time).toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        route.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : route.status === 'InProgress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : route.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {route.status}
                    </span>
                  </td>
                  <td className="p-3">{route.notes || 'None'}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleViewRoute(route.id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setSelectedRouteId(route.id)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition"
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