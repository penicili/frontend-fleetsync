import axios from 'axios';
import environment from '@/config/environment';
import { getToken } from '@/utils/sessionStorage';

// Create a function to get the axios instance with current token
const createAxiosInstance = (tokenOverride = null) => {
  // Use the provided token override or get from session storage
  const token = tokenOverride || getToken();
  
  return axios.create({
    baseURL: environment.API_GATEWAY_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
  });
};

const vehicleServiceGateway = {  
    getAllVehicles: async (tokenOverride = null) => {
    try {
      const token = tokenOverride || getToken();
      
      if (!token) {
        throw new Error('No authentication token available. Please login again.');
      }
      
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get('/vehicle');
      
      return response.data.data;    } catch (error) {
      throw error;
    }
  },
  
  getVehicleById: async (id, tokenOverride = null) => {
    try {
      const token = tokenOverride || getToken();
      
      if (!token) {
        throw new Error('No authentication token available. Please login again.');
      }
      
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get(`/vehicle/?id=${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching vehicle by ID ${id}:`, error.message);
      throw error; 
    }
  },
  createVehicle: async (vehicleData, tokenOverride = null) => {
    try {
      const token = tokenOverride || getToken();
      
      if (!token) {
        throw new Error('No authentication token available. Please login again.');
      }
      
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.post('/vehicle/create', vehicleData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating vehicle:', error.message);
      throw error;
    }
  },
  updateVehicleById: async (id, vehicleData, tokenOverride = null) => {
    try {
      const token = tokenOverride || getToken();
      if (!token) {
        throw new Error('No authentication token available. Please login again.');
      }
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.put(`/vehicle/update?id=${id}`, vehicleData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating vehicle by ID ${id}:`, error.message);
      throw error;
    }
  },
  deleteVehicleById: async (id, tokenOverride = null) => {
    try {
      const token = tokenOverride || getToken();
      if (!token) {
        throw new Error('No authentication token available. Please login again.');
      }
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.delete(`/vehicle/delete?id=${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting vehicle by ID ${id}:`, error.message);
      throw error;
    }
  },
}

export default vehicleServiceGateway;