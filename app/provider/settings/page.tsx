'use client';

import React from 'react';
import { Cog6ToothIcon, UserIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div className="content-container">
        <div className="flex items-center space-x-3 mb-6">
          <Cog6ToothIcon className="w-8 h-8 icon-gradient-blue" />
          <div>
            <h1 className="white-heading-large">Settings</h1>
            <p className="white-body-text">Manage your account, preferences, and system settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserIcon className="w-6 h-6 icon-gradient-blue" />
              <h3 className="white-heading-small">Profile Settings</h3>
            </div>
            <p className="white-body-text">Update your personal information and preferences</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BellIcon className="w-6 h-6 icon-gradient-orange" />
              <h3 className="white-heading-small">Notifications</h3>
            </div>
            <p className="white-body-text">Configure alerts and notification preferences</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 icon-gradient-green" />
              <h3 className="white-heading-small">Security</h3>
            </div>
            <p className="white-body-text">Manage password and security settings</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Cog6ToothIcon className="w-6 h-6 icon-gradient-purple" />
              <h3 className="white-heading-small">System Preferences</h3>
            </div>
            <p className="white-body-text">Configure system-wide settings and preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
} 