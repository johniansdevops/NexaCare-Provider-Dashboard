'use client';

import React from 'react';
import { HeartIcon, SignalIcon, BellIcon } from '@heroicons/react/24/outline';

export default function RealTimeMonitoring() {
  return (
    <div className="p-6 space-y-6">
      <div className="content-container">
        <div className="flex items-center space-x-3 mb-6">
          <HeartIcon className="w-8 h-8 icon-gradient-red" />
          <div>
            <h1 className="white-heading-large">Real-Time Patient Monitoring</h1>
            <p className="white-body-text">Live vital signs and IoMT device monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <SignalIcon className="w-6 h-6 icon-gradient-blue" />
              <h3 className="white-heading-small">Connected Devices</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-2">24</p>
            <p className="white-body-text">Active monitoring devices</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BellIcon className="w-6 h-6 icon-gradient-red" />
              <h3 className="white-heading-small">Active Alerts</h3>
            </div>
            <p className="text-4xl font-bold text-red-600 mb-2">3</p>
            <p className="white-body-text">Requiring immediate attention</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HeartIcon className="w-6 h-6 icon-gradient-green" />
              <h3 className="white-heading-small">Monitored Patients</h3>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-2">127</p>
            <p className="white-body-text">Currently under monitoring</p>
          </div>
        </div>

        <div className="white-card p-6 mt-6">
          <h3 className="white-heading-small mb-4">Coming Soon</h3>
          <p className="white-body-text">
            Real-time patient monitoring dashboard with live vital signs, 
            IoMT device integration, and automated alerting system.
          </p>
        </div>
      </div>
    </div>
  );
} 