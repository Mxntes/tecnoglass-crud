import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const USERNAME = "eve.holt@reqres.in";
  const PASSWORD = "cityslicka";

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password)
      return setErr("Email y contraseña son obligatorios");

    if (form.email === USERNAME && form.password === PASSWORD) {
      const { ok, message } = await login(form.email, form.password);
      if (ok) nav("/tasks", { replace: true });
      else setErr(message || "Error de autenticación");
    } else {
      setErr("Credenciales incorrectas");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 mb-3">Iniciar sesión</h1>
              {err && <div className="alert alert-danger py-2">{err}</div>}
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="eve.holt@reqres.in"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="cityslicka"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100"
                >
                  {loading ? "Ingresando…" : "Entrar"}
                </button>
                <div className="form-text mt-2">
                  Usa <b>eve.holt@reqres.in</b> / <b>cityslicka</b>.
                </div>
              </form>
            </div>
          </div>
          <p className="text-center text-muted small mt-3">
            Login: <code>POST https://reqres.in/api/login</code>
          </p>
        </div>
      </div>
    </div>
  );
}