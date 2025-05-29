import React, { useState } from 'react';

const Register = () => {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const newErrors = [];

    // Email validation (simple regex)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push('Invalid email address');
    }
    // Password length validation
    if (password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }
    // Password match validation
    if (password !== confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    setErrors(newErrors);
    if (newErrors.length === 0) {
      console.log({ name, email, password, confirmPassword });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-black">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-md font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-md font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
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
        <div>
          <label className="block text-md font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
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
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </>
  );
};

export default Register;
