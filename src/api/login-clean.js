import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API_BASE || "https://reqres.in",
  timeout: 10000,
});

export async function loginReqres(email, password) {
  const { data } = await api.post("/api/login", { email, password });
  return data;
}
