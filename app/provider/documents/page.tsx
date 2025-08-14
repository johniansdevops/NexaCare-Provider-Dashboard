'use client';

import React from 'react';
import { DocumentTextIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Documents() {
  return (
    <div className="p-6 space-y-6">
      <div className="content-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-8 h-8 icon-gradient-blue" />
            <div>
              <h1 className="white-heading-large">Medical Documents</h1>
              <p className="white-body-text">Manage patient records, forms, and clinical documents</p>
            </div>
          </div>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2 text-white" />
            Add Document
          </button>
        </div>

        <div className="white-card p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 icon-gradient-blue" />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 input w-full"
              />
            </div>
          </div>

          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 icon-gradient-blue mx-auto mb-4" />
            <h3 className="white-heading-small mb-2">Document Management System</h3>
            <p className="white-body-text">
              Secure document storage, patient records management, 
              and clinical form processing coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 