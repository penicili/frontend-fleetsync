import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import ModalKendaraan from './ModalKendaraan';
import useVehicle from './useVehicle';
import { getToken } from '@/utils/sessionStorage';

const ManajemenKendaraan = () => {  // Get the session directly from useSession as a fallback
  const { data: sessionDirect } = useSession();
  const router = useRouter();
  
  // Check if we have a token in session storage
  const storedToken = getToken();
  
  const handleBackToHome = () => {
    router.push('/');
  };
    const { 
    vehicles, 
    loading, 
    error, 
    getAllVehicles, 
    getStatusColor, 
    getStatusInIndonesian,
    deleteVehicle
  } = useVehicle();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
    // Refresh vehicles when needed
  useEffect(() => {
    // If token isn't in session storage but is in NextAuth session, refresh vehicles
    if (!storedToken && sessionDirect?.accessToken) {
      getAllVehicles();
    }
  }, [getAllVehicles, sessionDirect, storedToken]);

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };  const handleDeleteVehicle = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus kendaraan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });
    
    if (result.isConfirmed) {
      try {
        await deleteVehicle(id);
        
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kendaraan berhasil dihapus',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        // Vehicle list will be automatically refreshed thanks to the useVehicle hook
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `Gagal menghapus kendaraan: ${err.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="mr-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors"
        >
          <HomeIcon className="h-5 w-5 mr-2" />
          Kembali ke Beranda
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Kendaraan</h1>
        <button
          onClick={handleAddVehicle}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Kendaraan
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-800">
          Error: {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomor Plat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.plate_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                        {getStatusInIndonesian(vehicle.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditVehicle(vehicle)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data kendaraan tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ModalKendaraan
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kendaraan={selectedVehicle}
        onSuccess={getAllVehicles}
      />
    </div>
  );
};

export default ManajemenKendaraan;