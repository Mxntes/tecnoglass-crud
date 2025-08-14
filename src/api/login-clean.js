import axios from "axios";

export const loginApi = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API_BASE || "https://reqres.in",
  timeout: 10000,
});

export async function loginReqres(email, password) {
  const { data } = await loginApi.post(
    "/api/login",
    { email, password },
    {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    }
  );
  return data;
}