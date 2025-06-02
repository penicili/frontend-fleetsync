import { useState } from 'react';
import { signIn } from 'next-auth/react';

function useLogin() {
  const [errors, setErrors] = useState([]);

  const processLogin = async (formData, onSuccess) => {
    const { userIdentifier, password } = formData;
    const validationErrors = [];
    if (!userIdentifier || userIdentifier.length < 3) {
      validationErrors.push('Username or email is required and must be at least 3 characters.');
    }
    if (!password || password.length < 6) {
      validationErrors.push('Password is required and must be at least 6 characters.');
    }
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      const result = await signIn('credentials', {
        userIdentifier,
        password,
        redirect: false
      });
      if (result?.ok) {
        if (typeof onSuccess === 'function') onSuccess();
      } else {
        setErrors([result?.error || 'Login failed.']);
      }
    }
  };

  return { errors, processLogin };
}

export default useLogin;
