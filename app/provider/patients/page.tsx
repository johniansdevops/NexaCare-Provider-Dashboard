'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  BeakerIcon,
  XMarkIcon,
  DocumentArrowUpIcon,
  PencilIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'needs_followup' | 'critical' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  phone: string;
  email: string;
  insurance: string;
  primaryCare: boolean;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    lastUpdated: string;
  };
  alerts: Array<{
    type: 'medication' | 'vitals' | 'appointment' | 'lab';
    message: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }>;
  labResults: Array<{
    id: string;
    type: string;
    date: string;
    status: 'normal' | 'abnormal' | 'critical';
    fileName: string;
  }>;
  clinicalNotes: Array<{
    id: string;
    date: string;
    provider: string;
    type: 'visit' | 'follow_up' | 'procedure' | 'general';
    content: string;
  }>;
}

export default function ProviderPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', label: 'All Patients', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'needs_followup', label: 'Needs Follow-up', count: 0 },
    { id: 'critical', label: 'Critical', count: 0 },
    { id: 'high_risk', label: 'High Risk', count: 0 },
  ];

  // Mock patient data
  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-25',
      status: 'stable',
      riskLevel: 'medium',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com',
      insurance: 'Blue Cross Blue Shield',
      primaryCare: true,
      vitals: {
        bloodPressure: '130/85',
        heartRate: 72,
        temperature: 98.6,
        weight: 165,
        lastUpdated: '2024-01-10'
      },
      alerts: [
        {
          type: 'medication',
          message: 'Due for medication refill in 3 days',
          urgency: 'medium'
        }
      ],
      labResults: [
        { id: '1', type: 'Blood Panel', date: '2024-01-10', status: 'normal', fileName: 'blood_panel_2024_01_10.pdf' },
        { id: '2', type: 'A1C Test', date: '2024-01-05', status: 'abnormal', fileName: 'a1c_test_2024_01_05.pdf' }
      ],
      clinicalNotes: [
        { id: '1', date: '2024-01-10', provider: 'Dr. Smith', type: 'visit', content: 'Patient reports feeling well. BP management ongoing. A1C levels need monitoring.' },
        { id: '2', date: '2024-01-05', provider: 'Dr. Smith', type: 'follow_up', content: 'Diabetes management reviewed. Medication compliance good.' }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 67,
      gender: 'Male',
      conditions: ['Atrial Fibrillation', 'Heart Disease'],
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-22',
      status: 'needs_followup',
      riskLevel: 'high',
      phone: '(555) 234-5678',
      email: 'michael.chen@email.com',
      insurance: 'Medicare',
      primaryCare: true,
      vitals: {
        bloodPressure: '145/92',
        heartRate: 85,
        temperature: 98.4,
        weight: 180,
        lastUpdated: '2024-01-08'
      },
      alerts: [
        {
          type: 'vitals',
          message: 'Blood pressure elevated - monitor closely',
          urgency: 'high'
        },
        {
          type: 'lab',
          message: 'INR results pending review',
          urgency: 'medium'
        }
      ]
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      age: 32,
      gender: 'Female',
      conditions: ['Asthma', 'Allergies'],
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-15',
      status: 'active',
      riskLevel: 'low',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@email.com',
      insurance: 'Aetna',
      primaryCare: false,
      vitals: {
        bloodPressure: '118/75',
        heartRate: 68,
        temperature: 98.7,
        weight: 135,
        lastUpdated: '2024-01-05'
      },
      alerts: []
    },
    {
      id: '4',
      name: 'Robert Wilson',
      age: 58,
      gender: 'Male',
      conditions: ['Chronic Pain', 'Depression'],
      lastVisit: '2024-01-12',
      status: 'critical',
      riskLevel: 'high',
      phone: '(555) 456-7890',
      email: 'robert.wilson@email.com',
      insurance: 'Cigna',
      primaryCare: true,
      vitals: {
        bloodPressure: '165/95',
        heartRate: 92,
        temperature: 99.1,
        weight: 195,
        lastUpdated: '2024-01-12'
      },
      alerts: [
        {
          type: 'vitals',
          message: 'Elevated blood pressure requires immediate attention',
          urgency: 'critical'
        },
        {
          type: 'appointment',
          message: 'Missed last two appointments',
          urgency: 'high'
        }
      ]
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      age: 41,
      gender: 'Female',
      conditions: ['Migraine', 'Anxiety'],
      lastVisit: '2024-01-09',
      nextAppointment: '2024-01-30',
      status: 'active',
      riskLevel: 'low',
      phone: '(555) 567-8901',
      email: 'lisa.thompson@email.com',
      insurance: 'UnitedHealth',
      primaryCare: false,
      vitals: {
        bloodPressure: '115/72',
        heartRate: 65,
        temperature: 98.5,
        weight: 142,
        lastUpdated: '2024-01-09'
      },
      alerts: [
        {
          type: 'medication',
          message: 'New prescription ready for pickup',
          urgency: 'low'
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPatients(mockPatients);
      setFilteredPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = patients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.conditions.some(condition => 
          condition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'high_risk') {
        filtered = filtered.filter(patient => patient.riskLevel === 'high');
      } else {
        filtered = filtered.filter(patient => patient.status === selectedFilter);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'risk':
          const riskOrder = { high: 3, medium: 2, low: 1 };
          return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
        default:
          return 0;
      }
    });

    setFilteredPatients(filtered);
  }, [patients, searchTerm, selectedFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'needs_followup':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'stable':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAlertColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-800/30 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="content-container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="white-heading-large mb-2">Patient Management</h1>
            <p className="white-body-text">
              Manage your patient roster and track care coordination
            </p>
          </div>
        
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="btn-outline">
              <FunnelIcon className="w-4 h-4 mr-2 icon-gradient-blue" />
              Export
            </button>
            <button className="btn-primary">
              <PlusIcon className="w-4 h-4 mr-2 text-white" />
              Add Patient
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="white-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 icon-gradient-blue" />
            <input
              type="text"
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input w-full"
            />
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="input w-full lg:w-auto"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="needs_followup">Needs Follow-up</option>
            <option value="critical">Critical</option>
            <option value="high_risk">High Risk</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-full lg:w-auto"
          >
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
            <option value="lastVisit">Sort by Last Visit</option>
            <option value="risk">Sort by Risk Level</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <UserGroupIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Patients</span>
            </div>
            <p className="text-2xl font-bold text-white">{patients.length}</p>
          </div>
          
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              <span className="text-sm text-gray-400">Critical</span>
            </div>
            <p className="text-2xl font-bold text-red-400">
              {patients.filter(p => p.status === 'critical').length}
            </p>
          </div>
          
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <ClockIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Need Follow-up</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">
              {patients.filter(p => p.status === 'needs_followup').length}
            </p>
          </div>
          
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <HeartIcon className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Active</span>
            </div>
            <p className="text-2xl font-bold text-green-400">
              {patients.filter(p => p.status === 'active').length}
            </p>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="white-card p-6 white-card-hover transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} years old • {patient.gender}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(patient.status)}`}>
                      {patient.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Patient Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Conditions</h4>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                      {patient.nextAppointment && (
                        <p>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  {/* Vitals */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Vitals</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">BP:</span>
                        <span className="text-gray-900 ml-1 font-medium">{patient.vitals.bloodPressure}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">HR:</span>
                        <span className="text-gray-900 ml-1 font-medium">{patient.vitals.heartRate} bpm</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Temp:</span>
                        <span className="text-gray-900 ml-1 font-medium">{patient.vitals.temperature}°F</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <span className="text-gray-900 ml-1 font-medium">{patient.vitals.weight} lbs</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Updated: {new Date(patient.vitals.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Alerts */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Alerts</h4>
                    {patient.alerts.length > 0 ? (
                      <div className="space-y-1">
                        {patient.alerts.slice(0, 2).map((alert, index) => (
                          <div key={index} className="text-xs">
                            <span className={`font-medium ${getAlertColor(alert.urgency)}`}>
                              {alert.urgency.toUpperCase()}:
                            </span>
                            <span className="text-gray-700 ml-1">{alert.message}</span>
                          </div>
                        ))}
                        {patient.alerts.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{patient.alerts.length - 2} more alerts
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">No active alerts</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PhoneIcon className="w-5 h-5 icon-gradient-green" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <VideoCameraIcon className="w-5 h-5 icon-gradient-blue" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 icon-gradient-purple" />
                </button>
                <Link
                  href={`/provider/patients/${patient.id}`}
                  className="btn-primary text-sm px-3 py-2"
                >
                  View Details
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 hover:text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="white-card p-12 text-center">
          <UserGroupIcon className="w-16 h-16 icon-gradient-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'No patients match the selected filters'}
          </p>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add New Patient
          </button>
        </div>
      )}
    </div>
  );
} 