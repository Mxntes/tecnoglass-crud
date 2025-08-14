
import { useState, useEffect, useMemo, useCallback } from "react";
import { AuthContext } from "./auth-context";
import { loginReqres } from "../api/login-clean";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { token } = await loginReqres(email, password);
      setToken(token);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message: err?.response?.data?.error || "Credenciales inválidas",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => setToken(null), []);

  const value = useMemo(
    () => ({ token, isAuth: !!token, login, logout, loading }),
    [token, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}