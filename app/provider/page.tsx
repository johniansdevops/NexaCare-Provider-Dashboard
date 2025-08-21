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
  HeartIcon,
  BeakerIcon,
  DocumentTextIcon,
  SparklesIcon,
  BoltIcon,
  FireIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { formatDateTime, cn } from '@/lib/utils';

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
  avatar: string;
  specialty: string;
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
  unit?: string;
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: any;
  color: string;
  gradient?: boolean;
  isAI?: boolean;
}

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [practiceScore] = useState(92); // Practice efficiency score

  // Mock data - replace with real API calls
  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'PT001',
      time: '2024-01-15T09:00:00',
      type: 'in_person',
      reason: 'Annual Physical Examination',
      status: 'completed',
      priority: 'normal',
      duration: 30,
      avatar: '👩‍💼',
      specialty: 'Primary Care'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientId: 'PT002',
      time: '2024-01-15T10:30:00',
      type: 'telehealth',
      reason: 'Follow-up Consultation',
      status: 'in_progress',
      priority: 'normal',
      duration: 20,
      avatar: '👨‍💻',
      specialty: 'Cardiology'
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientId: 'PT003',
      time: '2024-01-15T11:00:00',
      type: 'in_person',
      reason: 'Chest Pain Evaluation',
      status: 'scheduled',
      priority: 'urgent',
      duration: 45,
      avatar: '👩‍🎨',
      specialty: 'Emergency'
    },
    {
      id: '4',
      patientName: 'David Park',
      patientId: 'PT004',
      time: '2024-01-15T14:00:00',
      type: 'phone',
      reason: 'Lab Results Discussion',
      status: 'scheduled',
      priority: 'normal',
      duration: 15,
      avatar: '👨‍🔬',
      specialty: 'Internal Medicine'
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
      message: 'Overdue for post-surgery follow-up',
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
    { label: 'Patients Today', value: '18', change: 3, trend: 'up', color: 'text-blue-600' },
    { label: 'Avg Wait Time', value: '12', change: -2, trend: 'down', color: 'text-green-600', unit: 'min' },
    { label: 'Satisfaction Score', value: '4.8', change: 0.2, trend: 'up', color: 'text-purple-600', unit: '/5.0' },
    { label: "Today's Revenue", value: '$3,240', change: 15, trend: 'up', color: 'text-green-600' },
  ];

  const aiInsights = [
    {
      id: '1',
      title: 'High-Risk Patient Alert',
      message: 'Emily Rodriguez shows elevated cardiac markers. Consider immediate ECG and troponin levels for comprehensive evaluation.',
      type: 'alert',
      priority: 'high',
      patientId: 'PT003',
      time: '30 minutes ago',
      confidence: 94
    },
    {
      id: '2',
      title: 'Drug Interaction Warning',
      message: 'Potential interaction detected between prescribed Warfarin and new Amoxicillin for Michael Chen.',
      type: 'reminder',
      priority: 'medium',
      patientId: 'PT002',
      time: '1 hour ago',
      confidence: 87
    },
    {
      id: '3',
      title: 'Preventive Care Opportunity',
      message: '12 patients are due for annual mammograms. Automated reminders can improve compliance rates.',
      type: 'positive',
      priority: 'low',
      patientId: null,
      time: '2 hours ago',
      confidence: 92
    },
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'AI Clinical Assistant',
      description: '24/7 clinical decision support',
      href: '/provider/ai-chat',
      icon: '✦',
      color: 'mediva-gradient',
      gradient: true,
      isAI: true
    },
    {
      title: 'Patient Management',
      description: 'View and manage patient records',
      href: '/provider/patients',
      icon: UserGroupIcon,
      color: 'bg-blue-500/20 border border-blue-500/30'
    },
    {
      title: 'Schedule Appointment',
      description: 'Add new patient appointment',
      href: '/provider/calendar',
      icon: CalendarIcon,
      color: 'bg-green-500/20 border border-green-500/30'
    },
    {
      title: 'Clinical Notes',
      description: 'Document patient encounters',
      href: '/provider/notes',
      icon: ClipboardDocumentListIcon,
      color: 'bg-purple-500/20 border border-purple-500/30'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    setTimeout(() => setLoading(false), 1200);

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
        return 'badge-success';
      case 'in_progress':
        return 'badge-info';
      case 'scheduled':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'border-red-400 bg-red-50';
      case 'high':
        return 'border-orange-400 bg-orange-50';
      case 'medium':
        return 'border-yellow-400 bg-yellow-50';
      default:
        return 'border-blue-400 bg-blue-50';
    }
  };

  const getPracticeScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-white min-h-screen animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-white min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, <span className="gradient-text">Dr. {user?.full_name?.split(' ')[1] || 'Smith'}</span>! 👩‍⚕️
            </h1>
            <p className="text-lg text-gray-600">
              Your practice overview for {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/provider/ai-chat" className="btn-primary">
              <SparklesIcon className="w-5 h-5 mr-2" />
              AI Assistant
            </Link>
          </div>
        </div>
        <div className="text-sm text-gray-500 font-mono">
          Provider Portal • Clinical Dashboard • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Practice Efficiency Score */}
      <div className="card-white p-8 border-2 border-purple-200 animate-slide-up" style={{background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05))'}}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Efficiency Score</h3>
            <p className="text-gray-600">AI-generated based on patient flow, satisfaction, and outcomes</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${getPracticeScoreColor(practiceScore)} mb-2`}>
              {practiceScore}
            </div>
            <div className="flex items-center justify-end text-green-600 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +4 this week
            </div>
          </div>
        </div>
        
        <div className="relative mb-4">
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full mediva-gradient transition-all duration-1000 ease-out"
              style={{ width: `${practiceScore}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-mono">Performance Trend</span>
          <span className="text-green-600 font-medium">Excellent 🌟</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="card-white-interactive p-6 text-center group"
          >
            {typeof action.icon === 'string' ? (
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl text-purple-500 font-bold group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center mb-4">
                <action.icon className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-200" />
              </div>
            )}
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Practice Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {practiceMetrics.map((metric) => (
          <div key={metric.label} className="card-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-mono">{metric.label}</p>
                <div className="flex items-baseline space-x-1">
                  <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                  {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              {metric.trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : metric.trend === 'down' ? (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
              ) : null}
              <span className={metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}>
                {metric.change > 0 ? '+' : ''}{metric.change} vs yesterday
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 card-white p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-900">Today's Schedule</h3>
            </div>
            <Link href="/provider/calendar" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
              View calendar →
            </Link>
          </div>
          
          <div className="space-y-4">
            {todayAppointments.map((appointment) => {
              const Icon = getAppointmentIcon(appointment.type);
              return (
                <div key={appointment.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{appointment.avatar}</div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                          <span className="text-xs text-gray-500 font-mono">({appointment.patientId})</span>
                          {appointment.priority === 'urgent' && (
                            <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{appointment.reason}</p>
                        <p className="text-xs text-gray-500">{appointment.specialty}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-2">
                          <span className="font-mono">{formatDateTime(appointment.time)}</span>
                          <div className="flex items-center space-x-1">
                            <Icon className="w-3 h-3" />
                            <span className="capitalize">{appointment.type.replace('_', ' ')}</span>
                          </div>
                          <span>{appointment.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient Alerts */}
        <div className="card-white p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-semibold text-gray-900">Patient Alerts</h3>
            </div>
            <Link href="/provider/patients" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {patientAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-l-4 transition-colors hover:bg-gray-50 ${getUrgencyColor(alert.urgency)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm">{alert.patientName}</p>
                      <span className="text-xs text-gray-500 font-mono">({alert.patientId})</span>
                      {alert.urgency === 'critical' && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">URGENT</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">{alert.message}</p>
                    <p className="text-xs text-gray-500 font-mono">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Clinical Insights */}
      <div className="card-white p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 mediva-gradient rounded-2xl flex items-center justify-center ai-glow">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">AI Clinical Insights</h3>
              <p className="text-xs text-gray-500 font-mono">Powered by advanced clinical analytics</p>
            </div>
          </div>
          <Link href="/provider/ai-chat" className="btn-primary">
            <BoltIcon className="w-4 h-4 mr-2" />
            Chat with AI
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  insight.type === 'positive' ? 'bg-green-400' : 
                  insight.type === 'reminder' ? 'bg-blue-400' : 
                  insight.type === 'assessment' ? 'bg-yellow-400' : 'bg-purple-400'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{insight.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-mono">{insight.time}</p>
                    <span className="text-xs text-green-600 font-mono">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="card-white p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <HeartIcon className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-semibold text-gray-900">Additional Actions</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/provider/real-time-monitoring" className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group">
            <HeartIcon className="w-6 h-6 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 text-sm">Patient Monitoring</h4>
            <p className="text-xs text-gray-600">Real-time vitals & alerts</p>
          </Link>
          
          <Link href="/provider/clinical-decision-support" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
            <BeakerIcon className="w-6 h-6 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 text-sm">Clinical Support</h4>
            <p className="text-xs text-gray-600">Decision tools & guidelines</p>
          </Link>
          
          <Link href="/provider/documents" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
            <DocumentTextIcon className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 text-sm">Medical Records</h4>
            <p className="text-xs text-gray-600">Patient documents & files</p>
          </Link>
          
          <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group text-left">
            <PlusIcon className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 text-sm">Add New Patient</h4>
            <p className="text-xs text-gray-600">Register & onboard</p>
          </button>
        </div>
      </div>
    </div>
  );
} 