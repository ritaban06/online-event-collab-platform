import axios from "axios";

// Base URL for CodeX API (replace with actual API endpoint)
const API_BASE_URL = 'https://codex-api.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10 * 1000, // 10 seconds
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

export const runCode = async ({ code, language, input }) => {
  try {
    const response = await axiosInstance.post('/compile', {
      code,
      language,
      input,
    }, {
      validateStatus: (status) => status >= 200 && status < 300,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Something went wrong!';
      const statusCode = error.response?.status;
      return { error: errorMessage, statusCode };
    } else {
      return { error: 'An unknown error occurred', statusCode: 500 };
    }
  }
};