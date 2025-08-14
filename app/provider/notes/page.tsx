'use client';

import React from 'react';
import { ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ClinicalNotes() {
  return (
    <div className="p-6 space-y-6">
      <div className="content-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ClipboardDocumentListIcon className="w-8 h-8 icon-gradient-purple" />
            <div>
              <h1 className="white-heading-large">Clinical Notes</h1>
              <p className="white-body-text">Patient visit notes, assessments, and clinical documentation</p>
            </div>
          </div>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2 text-white" />
            New Note
          </button>
        </div>

        <div className="white-card p-6">
          <div className="text-center py-12">
            <ClipboardDocumentListIcon className="w-16 h-16 icon-gradient-purple mx-auto mb-4" />
            <h3 className="white-heading-small mb-2">Clinical Documentation</h3>
            <p className="white-body-text">
              Comprehensive clinical note-taking system with templates, 
              voice-to-text, and AI-assisted documentation coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 