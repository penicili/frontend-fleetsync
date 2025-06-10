import { useState, useEffect } from 'react';

export const useDriverLogic = () => {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('available');
  const [vehicleId, setVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all drivers
  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/drivers');
      if (!response.ok) throw new Error('Failed to fetch drivers');
      const data = await response.json();
      setDrivers(data.data || []);
    } catch (err) {
      setError('Failed to fetch drivers');
    }
  };

  // Create a new driver
  const handleCreateDriver = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, license_number: licenseNumber, email, status }),
      });
      if (response.ok) {
        setSuccess('Driver created successfully');
        setName('');
        setLicenseNumber('');
        setEmail('');
        setStatus('available');
        fetchDrivers();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create driver');
      }
    } catch (err) {
      setError('Error creating driver');
    }
  };

  // Assign driver to vehicle
  const handleAssignDriver = async (driverId) => {
    try {
      const response = await fetch('/api/drivers/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver_id: driverId, vehicle_id: vehicleId }),
      });
      if (response.ok) {
        setSuccess('Driver assigned successfully');
        setVehicleId('');
        fetchDrivers();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to assign driver');
      }
    } catch (err) {
      setError('Error assigning driver');
    }
  };

  // Update driver
  const handleUpdateDriver = async (driverId) => {
    try {
      const response = await fetch(`/api/drivers/${driverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, license_number: licenseNumber, email, status }),
      });
      if (response.ok) {
        setSuccess('Driver updated successfully');
        setName('');
        setLicenseNumber('');
        setEmail('');
        setStatus('available');
        setSelectedDriverId(null);
        fetchDrivers();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update driver');
      }
    } catch (err) {
      setError('Error updating driver');
    }
  };

  // Delete driver
  const handleDeleteDriver = async (driverId) => {
    try {
      const response = await fetch(`/api/drivers/${driverId}`, {
        method: 'DELETE',
      });
      if (response.ok || response.status === 204) {
        setSuccess('Driver deleted successfully');
        fetchDrivers();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete driver');
      }
    } catch (err) {
      setError('Error deleting driver');
    }
  };

  // Fetch driver details for editing
  const handleEditDriver = async (driverId) => {
    try {
      const response = await fetch(`/api/drivers/${driverId}`);
      if (!response.ok) throw new Error('Failed to fetch driver details');
      const data = await response.json();
      setName(data.data.name);
      setLicenseNumber(data.data.license_number);
      setEmail(data.data.email);
      setStatus(data.data.status);
      setSelectedDriverId(driverId);
    } catch (err) {
      setError('Failed to fetch driver details');
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return {
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
  };
};