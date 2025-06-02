import React from 'react';
import useLogin from './useLogin';
import Swal from 'sweetalert2';

const Login = () => {
  const { errors, processLogin } = useLogin();

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
      <form className="space-y-4" onSubmit={e => {
        e.preventDefault();
        const form = e.target;
        const userIdentifier = form.userIdentifier.value;
        const password = form.password.value;
        processLogin({ userIdentifier, password }, () => {
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }}>
        <div>
          <label className="block text-md font-medium mb-1" htmlFor="userIdentifier">Username or Email</label>
          <input
            id="userIdentifier"
            name="userIdentifier"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username or Email"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
        </div>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
            <ul className="list-disc pl-5">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
      </p>
    </>
  );
};

export default Login;