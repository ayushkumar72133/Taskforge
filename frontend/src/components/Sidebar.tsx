import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    to: '/dashboard',
    label: 'Overview',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3 12l2-2 7-7 7 7 2 2M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"
        />
      </svg>
    ),
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        />
      </svg>
    ),
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { user } = useAuth();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[250px]
        bg-gradient-to-b from-[#0b1220] to-[#111c34]
        border-r border-slate-800/80
        flex flex-col
        transform transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg
              className="w-5 h-5 text-white"
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

          <div>
            <h2 className="text-white font-semibold text-[15px] tracking-wide">
              TaskForge
            </h2>

            <p className="text-[11px] text-slate-400 mt-0.5 uppercase tracking-[0.18em]">
              Team Workspace
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden text-slate-500 hover:text-white transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 px-3 mb-3">
          Main Menu
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 text-white backdrop-blur-sm border border-white/10 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </div>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.name}
              </p>

              <p className="text-slate-400 text-xs truncate mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />

            <span className="text-[11px] text-slate-400">
              Active workspace session
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}