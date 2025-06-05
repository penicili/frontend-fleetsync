import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ModalKendaraan = ({ isOpen, onClose, kendaraan, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: '',
    plate_number: '',
    status: 'Available'
  });

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
    try {
      const url = kendaraan ? `/api/vehicles/${kendaraan.id}` : '/api/vehicles';
      const method = kendaraan ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Terjadi kesalahan');
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error menyimpan kendaraan:', error);
      alert(error.message || 'Terjadi kesalahan saat menyimpan kendaraan');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {kendaraan ? 'Perbarui' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalKendaraan; 