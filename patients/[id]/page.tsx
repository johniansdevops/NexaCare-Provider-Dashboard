'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  VideoCameraIcon,
  EnvelopeIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  PlusIcon,
  DocumentTextIcon,
  BeakerIcon,
  DocumentArrowUpIcon,
  PencilIcon,
  XMarkIcon,
  PaperClipIcon,
  EyeIcon,
  PrinterIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface PatientDetails {
  id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  conditions: string[];
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
    status: 'active' | 'discontinued';
  }>;
  allergies: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: string;
    bmi: number;
    lastUpdated: string;
  };
  labResults: Array<{
    id: string;
    type: string;
    date: string;
    status: 'normal' | 'abnormal' | 'critical';
    fileName: string;
    fileSize: string;
    provider: string;
    results?: {
      [key: string]: {
        value: string;
        unit: string;
        referenceRange: string;
        status: 'normal' | 'high' | 'low' | 'critical';
      };
    };
  }>;
  clinicalNotes: Array<{
    id: string;
    date: string;
    provider: string;
    type: 'visit' | 'follow_up' | 'procedure' | 'consultation' | 'general';
    title: string;
    content: string;
    attachments?: string[];
  }>;
  appointments: Array<{
    id: string;
    date: string;
    time: string;
    type: 'in_person' | 'telehealth' | 'phone';
    status: 'scheduled' | 'completed' | 'cancelled';
    reason: string;
    provider: string;
  }>;
}

export default function PatientProfile() {
  const params = useParams();
  const patientId = params.id as string;
  
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddNote, setShowAddNote] = useState(false);
  const [showUploadLab, setShowUploadLab] = useState(false);
  const [newNote, setNewNote] = useState({
    type: 'general',
    title: '',
    content: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // Mock patient data - replace with real API call
    const mockPatientData: PatientDetails = {
      id: patientId,
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      dateOfBirth: '1978-03-15',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com',
      address: '123 Main St, Anytown, ST 12345',
      insurance: 'Blue Cross Blue Shield - Policy #BC123456',
      emergencyContact: {
        name: 'John Johnson',
        phone: '(555) 987-6543',
        relationship: 'Spouse'
      },
      conditions: ['Hypertension', 'Type 2 Diabetes', 'Hyperlipidemia'],
      medications: [
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          prescribedDate: '2023-06-15',
          status: 'active'
        },
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          prescribedDate: '2023-08-20',
          status: 'active'
        },
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: 'Once daily',
          prescribedDate: '2023-09-10',
          status: 'active'
        }
      ],
      allergies: ['Penicillin', 'Sulfa drugs'],
      vitals: {
        bloodPressure: '130/85',
        heartRate: 72,
        temperature: 98.6,
        weight: 165,
        height: '5\'6"',
        bmi: 26.6,
        lastUpdated: '2024-01-15'
      },
      labResults: [
        {
          id: '1',
          type: 'Comprehensive Metabolic Panel',
          date: '2024-01-10',
          status: 'normal',
          fileName: 'cmp_2024_01_10.pdf',
          fileSize: '245 KB',
          provider: 'Quest Diagnostics',
          results: {
            glucose: { value: '95', unit: 'mg/dL', referenceRange: '70-100', status: 'normal' },
            creatinine: { value: '0.9', unit: 'mg/dL', referenceRange: '0.6-1.2', status: 'normal' },
            sodium: { value: '140', unit: 'mmol/L', referenceRange: '136-145', status: 'normal' }
          }
        },
        {
          id: '2',
          type: 'Hemoglobin A1C',
          date: '2024-01-05',
          status: 'abnormal',
          fileName: 'a1c_2024_01_05.pdf',
          fileSize: '180 KB',
          provider: 'LabCorp',
          results: {
            hba1c: { value: '7.2', unit: '%', referenceRange: '<7.0', status: 'high' }
          }
        },
        {
          id: '3',
          type: 'Lipid Panel',
          date: '2023-12-20',
          status: 'abnormal',
          fileName: 'lipid_panel_2023_12_20.pdf',
          fileSize: '190 KB',
          provider: 'Quest Diagnostics',
          results: {
            totalCholesterol: { value: '220', unit: 'mg/dL', referenceRange: '<200', status: 'high' },
            ldl: { value: '145', unit: 'mg/dL', referenceRange: '<100', status: 'high' },
            hdl: { value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'normal' }
          }
        }
      ],
      clinicalNotes: [
        {
          id: '1',
          date: '2024-01-15',
          provider: 'Dr. Smith',
          type: 'visit',
          title: 'Routine Follow-up - Diabetes Management',
          content: 'Patient reports feeling well overall. Blood sugar control has improved since last visit. A1C remains slightly elevated at 7.2%, discussed lifestyle modifications and potential medication adjustment. Patient is compliant with current medications. Blood pressure stable on current dose of Lisinopril. Continue current regimen and recheck A1C in 3 months.',
          attachments: ['bp_log_january.pdf']
        },
        {
          id: '2',
          date: '2024-01-05',
          provider: 'Dr. Smith',
          type: 'follow_up',
          title: 'Lab Results Review',
          content: 'Reviewed recent lab results with patient. A1C elevated at 7.2%, up from 6.8% three months ago. Discussed importance of dietary compliance and regular exercise. Patient admits to some dietary indiscretions over holidays. Reinforced diabetes education and scheduled nutrition consultation.',
        },
        {
          id: '3',
          date: '2023-12-20',
          provider: 'Dr. Smith',
          type: 'visit',
          title: 'Annual Physical Examination',
          content: 'Comprehensive annual exam completed. Patient generally doing well. Vital signs stable. Physical exam unremarkable except for mild peripheral edema. Labs ordered including lipid panel, A1C, and comprehensive metabolic panel. Mammogram and colonoscopy up to date. Influenza vaccination administered.',
        }
      ],
      appointments: [
        {
          id: '1',
          date: '2024-01-25',
          time: '10:00 AM',
          type: 'in_person',
          status: 'scheduled',
          reason: 'Diabetes Follow-up',
          provider: 'Dr. Smith'
        },
        {
          id: '2',
          date: '2024-02-15',
          time: '2:00 PM',
          type: 'telehealth',
          status: 'scheduled',
          reason: 'Lab Results Review',
          provider: 'Dr. Smith'
        }
      ]
    };

    setPatient(mockPatientData);
    setLoading(false);
  }, [patientId]);

  const handleAddNote = () => {
    if (patient && newNote.title && newNote.content) {
      const note = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        provider: 'Dr. Smith',
        type: newNote.type as any,
        title: newNote.title,
        content: newNote.content
      };

      setPatient(prev => prev ? {
        ...prev,
        clinicalNotes: [note, ...prev.clinicalNotes]
      } : null);

      setNewNote({ type: 'general', title: '', content: '' });
      setShowAddNote(false);
    }
  };

  const handleFileUpload = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const labResult = {
        id: Date.now().toString(),
        type: 'Lab Upload',
        date: new Date().toISOString().split('T')[0],
        status: 'normal' as const,
        fileName: file.name,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        provider: 'Provider Upload'
      };

      setPatient(prev => prev ? {
        ...prev,
        labResults: [labResult, ...prev.labResults]
      } : null);

      setSelectedFiles(null);
      setShowUploadLab(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-400';
      case 'abnormal':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      case 'high':
        return 'text-red-400';
      case 'low':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'abnormal':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800/30 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl text-white mb-4">Patient not found</h1>
        <Link href="/patients" className="btn-primary">
          Back to Patients
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/patients" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="heading-large text-white">{patient.name}</h1>
            <p className="text-gray-400">{patient.age} years old • {patient.gender} • ID: {patient.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn-outline">
            <PhoneIcon className="w-4 h-4 mr-2" />
            Call
          </button>
          <button className="btn-outline">
            <VideoCameraIcon className="w-4 h-4 mr-2" />
            Video
          </button>
          <button className="btn-primary">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Schedule
          </button>
        </div>
      </div>

      {/* Patient Summary Card */}
      <div className="card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{patient.email}</span>
              </div>
              <div className="text-gray-400">
                <p>Address:</p>
                <p className="text-gray-300">{patient.address}</p>
              </div>
              <div className="text-gray-400">
                <p>Insurance:</p>
                <p className="text-gray-300">{patient.insurance}</p>
              </div>
            </div>
          </div>

          {/* Current Vitals */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Latest Vitals</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Blood Pressure:</span>
                <p className="text-white font-medium">{patient.vitals.bloodPressure}</p>
              </div>
              <div>
                <span className="text-gray-400">Heart Rate:</span>
                <p className="text-white font-medium">{patient.vitals.heartRate} bpm</p>
              </div>
              <div>
                <span className="text-gray-400">Weight:</span>
                <p className="text-white font-medium">{patient.vitals.weight} lbs</p>
              </div>
              <div>
                <span className="text-gray-400">BMI:</span>
                <p className="text-white font-medium">{patient.vitals.bmi}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Last updated: {new Date(patient.vitals.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Emergency Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-white font-medium">{patient.emergencyContact.name}</p>
              <p className="text-gray-300">{patient.emergencyContact.relationship}</p>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{patient.emergencyContact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'notes', label: 'Clinical Notes' },
            { id: 'labs', label: 'Lab Results' },
            { id: 'medications', label: 'Medications' },
            { id: 'appointments', label: 'Appointments' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conditions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Medical Conditions</h3>
            <div className="space-y-2">
              {patient.conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-300">{condition}</span>
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Allergies</h3>
            <div className="space-y-2">
              {patient.allergies.map((allergy, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                  <span className="text-red-300">{allergy}</span>
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Clinical Notes</h3>
            <button 
              onClick={() => setShowAddNote(true)}
              className="btn-primary"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Note
            </button>
          </div>

          <div className="space-y-4">
            {patient.clinicalNotes.map(note => (
              <div key={note.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{note.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{new Date(note.date).toLocaleDateString()}</span>
                      <span>{note.provider}</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full capitalize">
                        {note.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                      <PrinterIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{note.content}</p>
                {note.attachments && note.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Attachments:</p>
                    {note.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <PaperClipIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'labs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Lab Results</h3>
            <button 
              onClick={() => setShowUploadLab(true)}
              className="btn-primary"
            >
              <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
              Upload Lab
            </button>
          </div>

          <div className="space-y-4">
            {patient.labResults.map(lab => (
              <div key={lab.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <BeakerIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <h4 className="font-semibold text-white">{lab.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{new Date(lab.date).toLocaleDateString()}</span>
                        <span>{lab.provider}</span>
                        <span>{lab.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm rounded-full border ${getStatusBadge(lab.status)}`}>
                      {lab.status.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                        <ShareIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {lab.results && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(lab.results).map(([key, result]) => (
                      <div key={key} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className={`text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {result.value} {result.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ref: {result.referenceRange}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'medications' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Current Medications</h3>
          <div className="space-y-4">
            {patient.medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">{med.name}</h4>
                  <p className="text-gray-400">{med.dosage} - {med.frequency}</p>
                  <p className="text-sm text-gray-500">Prescribed: {new Date(med.prescribedDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    med.status === 'active' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {med.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Upcoming Appointments</h3>
          <div className="space-y-4">
            {patient.appointments.map(appointment => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {new Date(appointment.date).getDate()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{appointment.reason}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{appointment.time}</span>
                      <span className="capitalize">{appointment.type.replace('_', ' ')}</span>
                      <span>{appointment.provider}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  {appointment.type === 'telehealth' && (
                    <button className="btn-primary text-sm">
                      <VideoCameraIcon className="w-4 h-4 mr-1" />
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Add Clinical Note</h3>
              <button 
                onClick={() => setShowAddNote(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Note Type</label>
                <select
                  value={newNote.type}
                  onChange={(e) => setNewNote(prev => ({ ...prev, type: e.target.value }))}
                  className="input w-full"
                >
                  <option value="general">General</option>
                  <option value="visit">Visit</option>
                  <option value="follow_up">Follow-up</option>
                  <option value="procedure">Procedure</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter note title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  className="input w-full h-32 resize-none"
                  placeholder="Enter note content..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setShowAddNote(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddNote}
                  className="btn-primary"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Lab Modal */}
      {showUploadLab && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Upload Lab Results</h3>
              <button 
                onClick={() => setShowUploadLab(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <DocumentArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Drop files here or click to browse</p>
                <input
                  type="file"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="hidden"
                  id="lab-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="lab-upload" className="btn-outline cursor-pointer">
                  Choose Files
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
              </div>
              
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    Selected: {selectedFiles[0].name} ({Math.round(selectedFiles[0].size / 1024)} KB)
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setShowUploadLab(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFileUpload}
                  disabled={!selectedFiles || selectedFiles.length === 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 