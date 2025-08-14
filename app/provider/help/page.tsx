'use client';

import React from 'react';
import { QuestionMarkCircleIcon, BookOpenIcon, ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Help() {
  return (
    <div className="p-6 space-y-6">
      <div className="content-container">
        <div className="flex items-center space-x-3 mb-6">
          <QuestionMarkCircleIcon className="w-8 h-8 icon-gradient-blue" />
          <div>
            <h1 className="white-heading-large">Help & Support</h1>
            <p className="white-body-text">Get assistance and learn how to use the platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpenIcon className="w-6 h-6 icon-gradient-green" />
              <h3 className="white-heading-small">Documentation</h3>
            </div>
            <p className="white-body-text">Browse comprehensive guides and tutorials</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ChatBubbleLeftRightIcon className="w-6 h-6 icon-gradient-purple" />
              <h3 className="white-heading-small">Live Chat Support</h3>
            </div>
            <p className="white-body-text">Get real-time assistance from our support team</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <PhoneIcon className="w-6 h-6 icon-gradient-orange" />
              <h3 className="white-heading-small">Phone Support</h3>
            </div>
            <p className="white-body-text">Call us for immediate assistance: 1-800-MEDIVA</p>
          </div>

          <div className="white-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <QuestionMarkCircleIcon className="w-6 h-6 icon-gradient-blue" />
              <h3 className="white-heading-small">FAQ</h3>
            </div>
            <p className="white-body-text">Find answers to frequently asked questions</p>
          </div>
        </div>
      </div>
    </div>
  );
} 