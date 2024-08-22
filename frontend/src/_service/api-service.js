import axios from 'axios';

/**
 * Axios instance for making API requests.
 *
 * @type {import("axios").AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Retrieves the user main data from the server.
 * @returns {Promise<Object>} A promise that resolves to the user main data.
 */
export const getUserMainData = async (userId) => {
  console.log("Je suis dans l'API service");
  const response = await api.get(`/user/${userId}`);
  return response.data;
}

/**
 * Retrieves the user activity from the server.
 * @returns {Promise<Object>} A promise that resolves to the user activity.
 */
export const getUserActivity = async (userId) => {
  const response = await api.get(`/user/${userId}/activity`);
  return response.data;
}

/**
 * Retrieves the user average sessions from the server.
 * @returns {Promise<Object>} A promise that resolves to the user average sessions.
 */
export const getUserAverageSessions = async (userId) => {
  const response = await api.get(`/user/${userId}/average-sessions`);
  return response.data;
}

/**
 * Retrieves the user performance from the server.
 * @returns {Promise<Object>} A promise that resolves to the user performance.
 */
export const getUserPerformance = async (userId) => {
  const response = await api.get(`/user/${userId}/performance`);
  return response.data;
}

export default api;
