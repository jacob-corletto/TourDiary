import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPostcards = async () => {
  const response = await api.get("/postcards");
  return response.data;
};

export const addPostcard = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/postcards", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
    },
  });
  return response.data;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
