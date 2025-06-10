import { useState, useEffect } from 'react';

export const useRouteLogic = () => {
  const [routes, setRoutes] = useState([]);
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch active routes
  const fetchActiveRoutes = async () => {
    try {
      const response = await fetch('/api/routes/active');
      if (!response.ok) throw new Error('Failed to fetch active routes');
      const data = await response.json();
      setRoutes(data.data || []);
      setSuccess('Active routes loaded successfully');
    } catch (err) {
      setError('Failed to fetch active routes');
    }
  };

  // Create a new route
  const handleCreateRoute = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver_id: parseInt(driverId),
          vehicle_id: parseInt(vehicleId),
          start_location: startLocation,
          end_location: endLocation,
          start_time: startTime,
          notes,
        }),
      });
      if (response.ok) {
        setSuccess('Route created successfully');
        setDriverId('');
        setVehicleId('');
        setStartLocation('');
        setEndLocation('');
        setStartTime('');
        setNotes('');
        fetchActiveRoutes();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create route');
      }
    } catch (err) {
      setError('Error creating route');
    }
  };

  // Update route status
  const handleUpdateStatus = async (routeId) => {
    try {
      const response = await fetch(`/api/routes/${routeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setSuccess('Route status updated successfully');
        setSelectedRouteId(null);
        fetchActiveRoutes();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update route status');
      }
    } catch (err) {
      setError('Error updating route status');
    }
  };

  // View route details
  const handleViewRoute = async (routeId) => {
    try {
      const response = await fetch(`/api/routes/${routeId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch route details');
      }
      const data = await response.json();
      setDriverId(data.data.driver_id || '');
      setVehicleId(data.data.vehicle_id || '');
      setStartLocation(data.data.start_location);
      setEndLocation(data.data.end_location);
      setStartTime(data.data.start_time);
      setNotes(data.data.notes || '');
      setStatus(data.data.status);
      setSelectedRouteId(routeId);
      setSuccess('Route details loaded successfully');
    } catch (err) {
      setError(err.message || 'Failed to fetch route details');
    }
  };

  useEffect(() => {
    fetchActiveRoutes();
  }, []);

  return {
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
  };
};