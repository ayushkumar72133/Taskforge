import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
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

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
  "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Side */}
        <div className="hidden lg:block text-white">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-bold">TaskForge</h2>
          </div>

          <p className="uppercase tracking-[0.25em] text-sm font-semibold text-blue-200 mb-5">
            TEAM WORKSPACE
          </p>

          <h1 className="text-6xl font-extrabold leading-tight max-w-xl">
            Organize tasks.
            <br />
            Track progress.
            <br />
            Deliver faster.
          </h1>

          <p className="mt-6 text-slate-200 text-lg leading-8 max-w-lg">
            Manage projects, assign responsibilities, and keep your team aligned
            with a clean and focused workflow system.
          </p>

          {/* Bottom Cards */}
          <div className="flex gap-6 mt-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 w-64">
              <h3 className="text-2xl font-bold">Projects</h3>
              <p className="text-slate-300 mt-2">
                Organize workspaces efficiently
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 w-64">
              <h3 className="text-2xl font-bold">Teams</h3>
              <p className="text-slate-300 mt-2">
                Collaborate with clarity
              </p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            {/* Tabs */}
            <div className="grid grid-cols-2 bg-slate-100 rounded-2xl p-1 mb-8">
              <Link
                to="/login"
                className="text-center py-3 rounded-xl text-slate-600 font-medium hover:bg-white transition"
              >
                Login
              </Link>

              <button className="bg-white shadow-sm rounded-xl py-3 font-semibold text-slate-900">
                Signup
              </button>
            </div>

            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Create account
            </h2>

            <p className="text-slate-500 mb-8">
              Start managing your projects and team workflow.
            </p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="alex@workspace.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-lg shadow-lg shadow-blue-600/20"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}