'use client';

import { useAuth } from '@/app/providers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PhoneIcon,
  VideoCameraIcon,
  MapPinIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { formatTime, formatDateTime } from '@/lib/utils';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  type: 'in_person' | 'telehealth' | 'phone';
  reason: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'normal' | 'urgent';
  duration: number;
}

interface PatientAlert {
  id: string;
  patientName: string;
  patientId: string;
  type: 'vitals' | 'medication' | 'followup' | 'lab_results';
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  time: string;
}

interface PracticeMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data - replace with real API calls
  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'PT001',
      time: '09:00',
      type: 'in_person',
      reason: 'Annual Physical',
      status: 'completed',
      priority: 'normal',
      duration: 30
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientId: 'PT002',
      time: '10:30',
      type: 'telehealth',
      reason: 'Follow-up Consultation',
      status: 'in_progress',
      priority: 'normal',
      duration: 20
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientId: 'PT003',
      time: '11:00',
      type: 'in_person',
      reason: 'Chest Pain Evaluation',
      status: 'scheduled',
      priority: 'urgent',
      duration: 45
    },
    {
      id: '4',
      patientName: 'David Park',
      patientId: 'PT004',
      time: '14:00',
      type: 'phone',
      reason: 'Lab Results Discussion',
      status: 'scheduled',
      priority: 'normal',
      duration: 15
    },
    {
      id: '5',
      patientName: 'Lisa Thompson',
      patientId: 'PT005',
      time: '15:30',
      type: 'telehealth',
      reason: 'Diabetes Management',
      status: 'scheduled',
      priority: 'normal',
      duration: 30
    },
  ];

  const patientAlerts: PatientAlert[] = [
    {
      id: '1',
      patientName: 'Robert Wilson',
      patientId: 'PT006',
      type: 'vitals',
      message: 'Blood pressure reading 180/95 - requires immediate attention',
      urgency: 'critical',
      time: '2 hours ago'
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      patientId: 'PT007',
      type: 'medication',
      message: 'Missed insulin doses for 3 consecutive days',
      urgency: 'high',
      time: '4 hours ago'
    },
    {
      id: '3',
      patientName: 'James Anderson',
      patientId: 'PT008',
      type: 'followup',
      message: 'Overdue for post-surgery follow-up (scheduled 2 weeks ago)',
      urgency: 'medium',
      time: '1 day ago'
    },
    {
      id: '4',
      patientName: 'Jennifer Lee',
      patientId: 'PT009',
      type: 'lab_results',
      message: 'Abnormal liver function tests - review required',
      urgency: 'high',
      time: '6 hours ago'
    },
  ];

  const practiceMetrics: PracticeMetric[] = [
    { label: 'Patients Today', value: '12', change: 2, trend: 'up', color: 'text-blue-400' },
    { label: 'Avg Wait Time', value: '8 min', change: -3, trend: 'down', color: 'text-green-400' },
    { label: 'Satisfaction', value: '4.8/5', change: 0.2, trend: 'up', color: 'text-purple-400' },
    { label: 'Revenue Today', value: '$2,840', change: 320, trend: 'up', color: 'text-green-400' },
  ];

  const aiInsights = [
    {
      id: '1',
      title: 'High-Risk Patient Alert',
      message: 'Patient Emily Rodriguez shows elevated cardiac markers. Consider ECG and troponin levels.',
      priority: 'high',
      patientId: 'PT003',
      time: '30 minutes ago'
    },
    {
      id: '2',
      title: 'Medication Interaction Warning',
      message: 'Michael Chen: Potential interaction between prescribed Warfarin and new Amoxicillin.',
      priority: 'medium',
      patientId: 'PT002',
      time: '1 hour ago'
    },
    {
      id: '3',
      title: 'Care Gap Identified',
      message: '15 patients are due for annual mammograms. Consider scheduling reminders.',
      priority: 'low',
      patientId: null,
      time: '2 hours ago'
    },
  ];

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);

    return () => clearInterval(timer);
  }, []);

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'telehealth':
        return VideoCameraIcon;
      case 'phone':
        return PhoneIcon;
      default:
        return MapPinIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'white-badge-success';
      case 'in_progress':
        return 'white-badge-info';
      case 'scheduled':
        return 'white-badge-neutral';
      case 'cancelled':
        return 'white-badge-danger';
      default:
        return 'white-badge-neutral';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'border-red-300';
      case 'high':
        return 'border-orange-300';
      case 'medium':
        return 'border-yellow-300';
      default:
        return 'border-blue-300';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800/30 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="content-container mb-8">
        <h1 className="white-heading-large mb-2">
          Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, Dr. {user?.full_name?.split(' ')[1] || 'Smith'} 👩‍⚕️
        </h1>
        <p className="white-body-text">
          Today is {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-2 text-sm white-mono-text">
          Provider Portal • Dashboard Overview
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {practiceMetrics.map((metric) => (
          <div key={metric.label} className="white-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 white-mono-text">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <div className="flex items-center text-sm">
                {metric.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                ) : metric.trend === 'down' ? (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                ) : null}
                <span className={metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'}>
                  {metric.change > 0 ? '+' : ''}{metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="xl:col-span-2 white-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Today's Schedule</h3>
            <div className="flex items-center space-x-2">
              <Link
                href="/provider/calendar"
                className="btn-outline text-sm px-3 py-1"
              >
                View Calendar
              </Link>
              <button className="btn-primary text-sm px-3 py-1">
                <PlusIcon className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => {
              const Icon = getAppointmentIcon(appointment.type);
              return (
                <div
                  key={appointment.id}
                  className={`p-4 rounded-xl border-l-4 bg-gray-50 ${
                    appointment.priority === 'urgent' ? 'border-red-500 bg-red-50' : 'border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-mono text-gray-900">
                        {appointment.time}
                      </div>
                      <div className="w-px h-12 bg-gray-300"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                          <span className="text-xs text-gray-500 white-mono-text">({appointment.patientId})</span>
                          {appointment.priority === 'urgent' && (
                            <ExclamationTriangleIcon className="w-4 h-4 icon-gradient-red" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 white-body-text">{appointment.reason}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Icon className="w-4 h-4 icon-gradient-blue" />
                          <span className="text-xs text-gray-500 capitalize white-mono-text">{appointment.type.replace('_', ' ')}</span>
                          <span className="text-xs text-gray-500 white-mono-text">• {appointment.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('_', ' ')}
                      </span>
                      <button className="text-gray-500 hover:text-gray-900">
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient Alerts */}
        <div className="white-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Patient Alerts</h3>
            <Link href="/provider/patients" className="text-pink-400 hover:text-pink-300 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {patientAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-xl border-l-4 bg-gray-50 ${getUrgencyColor(alert.urgency)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{alert.patientName}</h4>
                      <span className="text-xs text-gray-500 white-mono-text">({alert.patientId})</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 white-body-text">{alert.message}</p>
                    <p className="text-xs text-gray-500 white-mono-text">{alert.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    alert.urgency === 'critical' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                    alert.urgency === 'high' ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                    alert.urgency === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Clinical Insights */}
      <div className="white-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl ai-text font-bold">✦</span>
            <h3 className="text-xl font-semibold text-gray-900">AI Clinical Insights</h3>
          </div>
          <Link href="/provider/ai-chat" className="text-pink-400 hover:text-pink-300 text-sm">
            Open AI Assistant
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border bg-gray-50 ${
                insight.priority === 'high' ? 'border-red-300 bg-red-50' :
                insight.priority === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                'border-blue-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.priority === 'high' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                  insight.priority === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mb-3 white-body-text">{insight.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 white-mono-text">{insight.time}</p>
                    {insight.patientId && (
                      <Link
                        href={`/provider/patients/${insight.patientId}`}
                        className="text-xs text-pink-400 hover:text-pink-300"
                      >
                        View Patient →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/provider/patients" className="white-card p-4 white-card-hover">
          <UserGroupIcon className="w-8 h-8 icon-gradient-blue mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Manage Patients</h4>
          <p className="text-sm white-body-text">View and update patient records</p>
        </Link>
        
        <Link href="/provider/ai-chat" className="white-card p-4 white-card-hover">
          <div className="w-8 h-8 mb-3 flex items-center justify-center">
            <span className="text-2xl icon-gradient-ai font-bold">✦</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">AI Assistant</h4>
          <p className="text-sm white-body-text">Clinical decision support</p>
        </Link>
        
        <Link href="/provider/analytics" className="white-card p-4 white-card-hover">
          <ChartBarIcon className="w-8 h-8 icon-gradient-green mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Practice Analytics</h4>
          <p className="text-sm white-body-text">Review performance metrics</p>
        </Link>
        
        <button className="white-card p-4 white-card-hover text-left">
          <ClipboardDocumentListIcon className="w-8 h-8 icon-gradient-purple mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">Add Notes</h4>
          <p className="text-sm white-body-text">Quick patient documentation</p>
        </button>
      </div>
    </div>
  );
} 