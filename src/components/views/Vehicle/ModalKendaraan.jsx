import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import useVehicle from './useVehicle';

const ModalKendaraan = ({ isOpen, onClose, kendaraan, onSuccess }) => {
  const { createVehicle, updateVehicle } = useVehicle();
  const [formData, setFormData] = useState({
    type: '',
    plate_number: '',
    status: 'Available'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (kendaraan) {
      setFormData({
        type: kendaraan.type,
        plate_number: kendaraan.plate_number,
        status: kendaraan.status
      });
    } else {
      setFormData({
        type: '',
        plate_number: '',
        status: 'Available'
      });
    }
  }, [kendaraan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
      try {
      if (kendaraan) {
        // Update existing vehicle
        await updateVehicle(kendaraan.id, formData);
        
        // Show success message
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data kendaraan berhasil diperbarui',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        // Create new vehicle
        await createVehicle(formData);
        
        // Show success message
        Swal.fire({
          title: 'Berhasil!',
          text: 'Kendaraan baru berhasil ditambahkan',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error menyimpan kendaraan:', error);
      
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Terjadi kesalahan saat menyimpan kendaraan',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };  if (!isOpen) return null;  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {kendaraan ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Tipe Kendaraan
            </label>
            <input
              type="text"
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="Contoh: Mobil, Motor, Truk"
            />
          </div>

          <div>
            <label htmlFor="plate_number" className="block text-sm font-medium text-gray-700">
              Nomor Plat
            </label>
            <input
              type="text"
              id="plate_number"
              value={formData.plate_number}
              onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="Contoh: B 1234 ABC"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="Available">Tersedia</option>
              <option value="InUse">Sedang Digunakan</option>
              <option value="Maintenance">Dalam Perbaikan</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Batal
            </button>            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {kendaraan ? 'Menyimpan...' : 'Menyimpan...'}
                </span>
              ) : (
                kendaraan ? 'Perbarui' : 'Simpan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalKendaraan; 