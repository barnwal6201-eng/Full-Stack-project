import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to={from} replace />

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !password.trim()) {
    setErrors('Please enter both email and password.');
    return;
  }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setErrors(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-gray-700 bg-gray-900/70 p-6"
      >
        <h1 className="text-xl font-semibold text-white text-center">
          <span className="font-serif">Login For Admin Panel</span>
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(''); }}
          placeholder="Email"
          autoComplete="username"
          className="w-full min-h-11 rounded-xl border border-gray-700 bg-gray-950/70 px-3.5 text-sm text-gray-100 outline-none focus:border-red-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors(''); }}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full min-h-11 rounded-xl border border-gray-700 bg-gray-950/70 pl-3.5 pr-11 text-sm text-gray-100 outline-none focus:border-red-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors && <p className="text-xs text-red-500">{errors}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full min-h-11 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default LoginPage

