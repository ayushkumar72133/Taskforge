import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
  "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/70" />

      {/* Gradient Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center px-20 text-white">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                />
              </svg>
            </div>

            <span className="text-xl font-semibold tracking-wide">
              TaskForge
            </span>
          </div>

          <p className="uppercase tracking-[0.25em] text-sm text-blue-200 font-medium mb-5">
            Team Workspace
          </p>

          <h1 className="text-6xl xl:text-7xl font-bold leading-[1.02] max-w-2xl">
            Organize tasks.
            <br />
            Track progress.
            <br />
            Deliver faster.
          </h1>

          <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl">
            Manage projects, assign responsibilities, and keep your team aligned
            with a clean and focused workflow system.
          </p>

          {/* Features */}
          <div className="flex gap-6 mt-10">
            <div className="bg-white/10 border border-white/10 backdrop-blur px-5 py-4 rounded-2xl">
              <p className="text-2xl font-bold">Projects</p>
              <p className="text-sm text-slate-300 mt-1">
                Organize workspaces efficiently
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur px-5 py-4 rounded-2xl">
              <p className="text-2xl font-bold">Teams</p>
              <p className="text-sm text-slate-300 mt-1">
                Collaborate with clarity
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg mb-4">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-white">TaskForge</h2>
            </div>

            {/* CARD */}
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              {/* Top */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Welcome back
                </h2>

                <p className="text-slate-500 mt-2">
                  Sign in to continue managing your workspace.
                </p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="alex@workspace.com"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3.5 shadow-lg shadow-blue-600/20"
                >
                  {loading ? 'Please wait...' : 'Login'}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500 mt-7">
                New here?{' '}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}