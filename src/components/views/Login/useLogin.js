import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function useLogin() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

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
      setIsLoading(true);
      
      try {
        const result = await signIn('credentials', {
          userIdentifier,
          password,
          redirect: false,
          callbackUrl: '/'
        });
        
        if (result?.error) {
          setErrors([result.error]);
        } else if (result?.ok) {
          if (typeof onSuccess === 'function') {
            onSuccess();
          }
          router.push('/');
        } else {
          setErrors(['Login failed. Please check your credentials.']);
        }
      } catch (err) {
        console.error('Login error:', err);
        setErrors([err?.message || 'Login failed for an unknown reason.']);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return { errors, isLoading, processLogin, session, status };
}

export default useLogin;
