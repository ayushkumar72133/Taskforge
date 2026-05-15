import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

import api from '../services/api';
import { DashboardStats } from '../types';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS: Record<string, string> = {
  'To Do': '#64748b',
  'In Progress': '#6366f1',
  Done: '#14b8a6',
};

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          {label}
        </p>

        <div className="w-2 h-2 rounded-full bg-slate-300" />
      </div>

      <p className={`text-3xl font-bold mt-3 ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => setStats(res.data))
      .catch(() =>
        setError('Failed to load dashboard')
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#f3f6fc]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  const statusChartData = stats
    ? Object.entries(stats.tasksByStatus).map(
        ([name, value]) => ({
          name,
          value,
        })
      )
    : [];

  const userChartData =
    stats?.tasksByUser.slice(0, 8) ?? [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f3f6fc] min-h-screen">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-indigo-600 font-medium mb-1">
            Workspace Overview
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Track tasks, monitor progress, and manage
            your workspace activity from one place.
          </p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-white hover:bg-slate-800 transition-all duration-200 shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
            />
          </svg>

          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <StatCard
          label="Total Tasks"
          value={stats?.totalTasks ?? 0}
          color="text-slate-800"
        />

        <StatCard
          label="Projects"
          value={stats?.totalProjects ?? 0}
          color="text-indigo-600"
        />

        <StatCard
          label="In Progress"
          value={
            stats?.tasksByStatus['In Progress'] ??
            0
          }
          color="text-indigo-600"
        />

        <StatCard
          label="Overdue"
          value={stats?.overdueTasks ?? 0}
          color="text-rose-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6 sm:mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Task Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Current distribution of tasks
              </p>
            </div>
          </div>

          {statusChartData.every(
            (d) => d.value === 0
          ) ? (
            <div className="h-56 flex items-center justify-center text-slate-400 text-sm">
              No task data available
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={240}
            >
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={40}
                >
                  {statusChartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        STATUS_COLORS[
                          entry.name
                        ] ?? '#64748b'
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  iconSize={10}
                  wrapperStyle={{
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Team Productivity
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Tasks assigned per member
              </p>
            </div>
          </div>

          {userChartData.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-slate-400 text-sm">
              No assigned tasks available
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={240}
            >
              <BarChart
                data={userChartData}
                margin={{
                  top: 0,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Status Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Quick summary of current workflow
            </p>
          </div>

          <Link
            to="/projects"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Open projects →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {statusChartData.map((item) => (
            <div
              key={item.name}
              className="text-center p-5 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all duration-200"
            >
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  color:
                    STATUS_COLORS[item.name],
                }}
              >
                {item.value}
              </div>

              <div className="text-sm text-slate-500 mt-2">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}