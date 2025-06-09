// Utility functions for working with browser's sessionStorage
const TOKEN_KEY = 'fleethub_auth_token';
const USER_KEY = 'fleethub_user';

// Check if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

export const setToken = (token) => {
  if (isBrowser && token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  if (isBrowser) {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token;
  }
  return null;
};

export const removeToken = () => {
  if (isBrowser) {
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

export const setUser = (user) => {
  if (isBrowser && user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = () => {
  if (isBrowser) {
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const clearSession = () => {
  if (isBrowser) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
};