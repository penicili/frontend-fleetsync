import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import vehicleServiceGateway from "@/services/gateway";
import { getToken } from "@/utils/sessionStorage";

const useVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  // Use session for access to user data if needed
  const getAllVehicles = useCallback(async () => {
    setLoading(true);
    try {
      // The gateway service will use session storage token
      const data = await vehicleServiceGateway.getAllVehicles();
      setVehicles(data);
      setError(null);
      return data;    } catch (err) {
      setError(err.message || 'Failed to fetch vehicles');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load vehicles automatically when component mounts
  useEffect(() => {
    // Use token from session storage when component mounts
    const token = getToken();
    if (token) {
      getAllVehicles();
    }
  }, [getAllVehicles]);
  const getVehicleById = useCallback(async (id) => {
    try {
      return await vehicleServiceGateway.getVehicleById(id);
    } catch (err) {
      setError(err.message || `Failed to fetch vehicle with ID: ${id}`);
      return null;
    }
  }, []);
  
  const createVehicle = useCallback(async (vehicleData) => {
    setLoading(true);
    try {
      const result = await vehicleServiceGateway.createVehicle(vehicleData);
      await getAllVehicles(); // Refresh the list after creation
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to create vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getAllVehicles]);
  
  const updateVehicle = useCallback(async (id, vehicleData) => {
    setLoading(true);
    try {
      const result = await vehicleServiceGateway.updateVehicleById(id, vehicleData);
      await getAllVehicles(); // Refresh the list after update
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || `Failed to update vehicle with ID: ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getAllVehicles]);
  
  const deleteVehicle = useCallback(async (id) => {
    setLoading(true);
    try {
      const result = await vehicleServiceGateway.deleteVehicleById(id);
      await getAllVehicles(); // Refresh the list after deletion
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || `Failed to delete vehicle with ID: ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getAllVehicles]);

  // Status color mapping function
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'InUse':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  // Status translation function
  const getStatusInIndonesian = useCallback((status) => {
    switch (status) {
      case 'Available':
        return 'Tersedia';
      case 'InUse':
        return 'Sedang Digunakan';
      case 'Maintenance':
        return 'Dalam Perbaikan';
      default:
        return status;
    }
  }, []);
  return {
    vehicles,
    loading,
    error,
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getStatusColor,
    getStatusInIndonesian,
    session
  };
};

export default useVehicle;