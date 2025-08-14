'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  BellIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data for demo purposes
  const user = {
    full_name: 'Dr. Smith',
    role: 'provider'
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-40 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <div className="flex items-center space-x-3">
            {/* Search bar */}
            <div className="hidden sm:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <MagnifyingGlassIcon className="w-4 h-4 icon-gradient-blue" />
              </div>
              <input
                type="text"
                placeholder="Search patients, appointments..."
                className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-from/50 focus:border-primary-from w-80 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Actions */}
            <Link 
              href="/provider/calendar"
              className="hidden sm:flex items-center px-3 py-2 text-xs bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
            >
              <CalendarIcon className="w-3 h-3 mr-1 text-white" />
              Calendar
            </Link>
            <Link 
              href="/provider/patients"
              className="hidden sm:flex items-center px-3 py-2 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <UserGroupIcon className="w-3 h-3 mr-1 text-white" />
              Patients
            </Link>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-700">
              <BellIcon className="w-5 h-5 icon-gradient-blue" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></span>
            </button>

            {/* Emergency Alert Button */}
            <button className="p-2 rounded-lg hover:bg-red-900/20">
              <svg className="w-5 h-5 icon-gradient-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">Dr. {user.full_name}</p>
                <p className="text-xs text-gray-400">Provider Portal</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user.full_name?.charAt(0) || 'D'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 main-content">
        {children}
      </main>
    </div>
  );
} 