import axios from "axios";

// Replace with your actual CodeX API endpoint
const API_BASE_URL = "https://codex-api.com";

export const runCode = async ({ code, language, input }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/compile`, {
      code,
      language,
      input,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An unexpected error occurred." };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
};