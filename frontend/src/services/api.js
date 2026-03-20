const API_BASE_URL = 'http://localhost:8080';

/**
 * Central fetch wrapper that automatically applies the Authorization header
 * and base URL for all requests to the API Gateway.
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) return null;

  return response.json();
};

// ================================
// User Service
// ================================
export const registerUser = (userData) =>
  apiFetch('/api/user/Register', { method: 'POST', body: JSON.stringify(userData) });

export const getUserProfile = (userId) =>
  apiFetch(`/api/user/${userId}`);

export const validateUser = (userId) =>
  apiFetch(`/api/user/${userId}/validate`);

// ================================
// Activity Service
// ================================
export const getAllActivities = () =>
  apiFetch('/api/v1/activities');

export const getActivityById = (activityId) =>
  apiFetch(`/api/v1/activities/${activityId}`);

export const trackActivity = (activityData) =>
  apiFetch('/api/v1/activities', { method: 'POST', body: JSON.stringify(activityData) });

// ================================
// AI / Recommendation Service
// ================================
export const getUserRecommendations = (userId) =>
  apiFetch(`/api/recommendation/user/${userId}`);

export const getActivityRecommendations = (activityId) =>
  apiFetch(`/api/recommendation/activity/${activityId}`);
