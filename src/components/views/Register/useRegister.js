import { useState } from 'react';
import authService from '@/services/auth';

function useRegister() {
  const [errors, setErrors] = useState([]);

  const processRegister = async (formData, onSuccess) => {
    const { fullName, username, email, password, confirmPassword } = formData;
    const role = 'pengemudi'
    const validationErrors = [];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.push('Invalid email address');
    }
    if (password.length < 6) {
      validationErrors.push('Password must be at least 6 characters');
    }
    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match');
    }
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      try {
        const payload = { fullName, email, username, role, password, confirmPassword };
        const response = await authService.register(payload);
        console.log('Register response:', response);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      } catch (err) {
        setErrors([err?.response?.data?.message || 'Registration failed.']);
      }
    }
  };

  return { errors, processRegister };
}

export default useRegister;