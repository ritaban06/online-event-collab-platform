import axios from 'axios';

// Base URL for CodeX API (replace with actual API endpoint)
const API_BASE_URL = 'https://codex-api.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const runCode = async ({ code, language, input }) => {
  try {
    const response = await axiosInstance.post('/compile', {
      code,
      language,
      input,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Something went wrong!';
    return { error: errorMessage };
  }
};