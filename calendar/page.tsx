'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  EllipsisVerticalIcon,
  ArrowPathIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

interface CalendarEvent {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'in_person' | 'telehealth' | 'phone';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'pending_approval';
  reason: string;
  priority: 'normal' | 'urgent';
  duration: number;
  notes?: string;
  patientPhone?: string;
  telehealth_link?: string;
}

interface BookingRequest {
  id: string;
  patientName: string;
  patientId: string;
  requestedDate: string;
  requestedTime: string;
  type: 'in_person' | 'telehealth' | 'phone';
  reason: string;
  priority: 'normal' | 'urgent';
  duration: number;
  submittedAt: string;
  patientPhone: string;
  patientEmail: string;
}

type ViewMode = 'month' | 'week' | 'day';

export default function ProviderCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showBookingRequests, setShowBookingRequests] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  // Mock data
  useEffect(() => {
    setEvents([
      {
        id: '1',
        title: 'Annual Physical',
        patientName: 'Sarah Johnson',
        patientId: 'PT001',
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '09:30',
        type: 'in_person',
        status: 'scheduled',
        reason: 'Annual Physical Examination',
        priority: 'normal',
        duration: 30,
        patientPhone: '+1-555-0123'
      },
      {
        id: '2',
        title: 'Follow-up Consultation',
        patientName: 'Michael Chen',
        patientId: 'PT002',
        date: '2024-01-15',
        startTime: '10:30',
        endTime: '10:50',
        type: 'telehealth',
        status: 'scheduled',
        reason: 'Post-surgery follow-up',
        priority: 'normal',
        duration: 20,
        patientPhone: '+1-555-0124',
        telehealth_link: 'https://meet.mediva.ai/room/pt002-followup'
      },
      {
        id: '3',
        title: 'Chest Pain Evaluation',
        patientName: 'Emily Rodriguez',
        patientId: 'PT003',
        date: '2024-01-15',
        startTime: '11:00',
        endTime: '11:45',
        type: 'in_person',
        status: 'scheduled',
        reason: 'Acute chest pain evaluation',
        priority: 'urgent',
        duration: 45,
        patientPhone: '+1-555-0125'
      },
      {
        id: '4',
        title: 'Lab Results Discussion',
        patientName: 'David Park',
        patientId: 'PT004',
        date: '2024-01-16',
        startTime: '14:00',
        endTime: '14:15',
        type: 'phone',
        status: 'scheduled',
        reason: 'Discuss recent blood work results',
        priority: 'normal',
        duration: 15,
        patientPhone: '+1-555-0126'
      },
      {
        id: '5',
        title: 'Diabetes Management',
        patientName: 'Lisa Thompson',
        patientId: 'PT005',
        date: '2024-01-17',
        startTime: '15:30',
        endTime: '16:00',
        type: 'telehealth',
        status: 'scheduled',
        reason: 'Diabetes management consultation',
        priority: 'normal',
        duration: 30,
        patientPhone: '+1-555-0127',
        telehealth_link: 'https://meet.mediva.ai/room/pt005-diabetes'
      }
    ]);

    setBookingRequests([
      {
        id: '1',
        patientName: 'Jennifer Wilson',
        patientId: 'PT010',
        requestedDate: '2024-01-18',
        requestedTime: '10:00',
        type: 'in_person',
        reason: 'Migraine consultation',
        priority: 'normal',
        duration: 30,
        submittedAt: '2 hours ago',
        patientPhone: '+1-555-0128',
        patientEmail: 'jennifer.wilson@email.com'
      },
      {
        id: '2',
        patientName: 'Robert Garcia',
        patientId: 'PT011',
        requestedDate: '2024-01-19',
        requestedTime: '14:30',
        type: 'telehealth',
        reason: 'Hypertension follow-up',
        priority: 'urgent',
        duration: 20,
        submittedAt: '4 hours ago',
        patientPhone: '+1-555-0129',
        patientEmail: 'robert.garcia@email.com'
      },
      {
        id: '3',
        patientName: 'Maria Lopez',
        patientId: 'PT012',
        requestedDate: '2024-01-20',
        requestedTime: '09:30',
        type: 'phone',
        reason: 'Prescription refill consultation',
        priority: 'normal',
        duration: 15,
        submittedAt: '1 day ago',
        patientPhone: '+1-555-0130',
        patientEmail: 'maria.lopez@email.com'
      }
    ]);
  }, []);

  const getEventIcon = (type: string) => {
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
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'scheduled':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'pending_approval':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' ? 'border-l-red-500' : 'border-l-blue-500';
  };

  const handleApproveBooking = (requestId: string) => {
    const request = bookingRequests.find(r => r.id === requestId);
    if (request) {
      const newEvent: CalendarEvent = {
        id: `approved-${requestId}`,
        title: request.reason,
        patientName: request.patientName,
        patientId: request.patientId,
        date: request.requestedDate,
        startTime: request.requestedTime,
        endTime: addMinutesToTime(request.requestedTime, request.duration),
        type: request.type,
        status: 'scheduled',
        reason: request.reason,
        priority: request.priority,
        duration: request.duration,
        patientPhone: request.patientPhone
      };
      
      setEvents(prev => [...prev, newEvent]);
      setBookingRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const handleRejectBooking = (requestId: string) => {
    setBookingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatDateRange = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handleEventDrop = (event: CalendarEvent, newDate: Date) => {
    const newDateStr = newDate.toISOString().split('T')[0];
    setEvents(prev => prev.map(e => 
      e.id === event.id ? { ...e, date: newDateStr } : e
    ));
  };

  const launchTelehealth = (event: CalendarEvent) => {
    if (event.telehealth_link) {
      window.open(event.telehealth_link, '_blank');
    }
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(currentDay);
      const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
      const isToday = currentDay.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={currentDay.toISOString()}
          className={`min-h-[120px] p-2 border border-gray-700/30 ${
            isCurrentMonth ? 'bg-gray-800/30' : 'bg-gray-900/30'
          } ${isToday ? 'ring-2 ring-blue-500/50' : ''}`}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedEvent) {
              handleEventDrop(draggedEvent, new Date(currentDay));
              setDraggedEvent(null);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className={`text-sm mb-2 ${isCurrentMonth ? 'text-white' : 'text-gray-500'} ${isToday ? 'font-bold' : ''}`}>
            {currentDay.getDate()}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => {
              const Icon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  draggable
                  onDragStart={() => setDraggedEvent(event)}
                  className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(event.priority)} ${getStatusColor(event.status)} cursor-move hover:bg-gray-600/20`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon className="w-3 h-3" />
                    <span className="truncate">{event.startTime} {event.patientName}</span>
                  </div>
                </div>
              );
            })}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-400">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
      
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-700/30 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 bg-gray-800/50 text-center text-sm font-medium text-gray-300 border-b border-gray-700/30">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-8 gap-0 border border-gray-700/30 rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-800/50 border-b border-gray-700/30"></div>
        {weekDays.map(day => (
          <div key={day.toISOString()} className="p-3 bg-gray-800/50 text-center text-sm font-medium text-gray-300 border-b border-gray-700/30">
            <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className={`text-lg ${day.toDateString() === new Date().toDateString() ? 'text-blue-400 font-bold' : ''}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
        
        {/* Time slots */}
        {Array.from({ length: 12 }, (_, i) => {
          const hour = i + 8; // 8 AM to 7 PM
          const timeStr = `${hour.toString().padStart(2, '0')}:00`;
          
          return (
            <div key={hour} className="contents">
              <div className="p-2 text-xs text-gray-400 border-b border-gray-700/30 bg-gray-900/30">
                {hour <= 12 ? `${hour === 12 ? 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}` : `${hour - 12}:00 PM`}
              </div>
              {weekDays.map(day => {
                const dayEvents = getEventsForDate(day).filter(event => 
                  event.startTime.startsWith(timeStr.slice(0, 2))
                );
                
                return (
                  <div key={`${day.toISOString()}-${hour}`} className="min-h-[60px] p-1 border-b border-gray-700/30 bg-gray-800/20">
                    {dayEvents.map(event => {
                      const Icon = getEventIcon(event.type);
                      return (
                        <div
                          key={event.id}
                          className={`text-xs p-2 rounded border-l-2 ${getPriorityColor(event.priority)} ${getStatusColor(event.status)} mb-1`}
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            <Icon className="w-3 h-3" />
                            <span className="font-medium">{event.startTime}</span>
                          </div>
                          <div className="truncate">{event.patientName}</div>
                          <div className="truncate text-gray-400">{event.reason}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate).sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
      <div className="space-y-4">
        {dayEvents.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No appointments scheduled for this day</p>
          </div>
        ) : (
          dayEvents.map(event => {
            const Icon = getEventIcon(event.type);
            return (
              <div key={event.id} className={`card p-6 border-l-4 ${getPriorityColor(event.priority)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-mono text-white">{event.startTime}</div>
                    <div className="w-px h-16 bg-gray-600/50"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.patientName}</h3>
                      <p className="text-gray-400">{event.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500 capitalize">{event.type.replace('_', ' ')}</span>
                        <span className="text-sm text-gray-500">• {event.duration} min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(event.status)}`}>
                      {event.status.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-1">
                      {event.type === 'telehealth' && (
                        <button 
                          onClick={() => launchTelehealth(event)}
                          className="p-2 text-green-400 hover:text-green-300 rounded-lg hover:bg-green-900/20"
                          title="Join Telehealth Session"
                        >
                          <VideoCameraIcon className="w-5 h-5" />
                        </button>
                      )}
                      {event.patientPhone && (
                        <button className="p-2 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-900/20" title="Call Patient">
                          <PhoneIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {event.notes && (
                  <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">{event.notes}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-large text-white mb-2">Calendar & Schedule</h1>
          <p className="text-gray-400 body-text">
            Manage your appointments and patient schedule
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => setShowBookingRequests(true)}
            className="btn-outline relative"
          >
            <BellIcon className="w-4 h-4 mr-2" />
            Requests
            {bookingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {bookingRequests.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setShowNewEventModal(true)}
            className="btn-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigateDate('prev')}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-white min-w-[250px] text-center">
            {formatDateRange()}
          </h2>
          
          <button 
            onClick={() => navigateDate('next')}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="btn-outline text-sm"
          >
            Today
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {(['month', 'week', 'day'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-sm rounded-lg capitalize ${
                viewMode === mode 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="card p-6">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>

      {/* Booking Requests Modal */}
      {showBookingRequests && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Booking Requests</h3>
              <button 
                onClick={() => setShowBookingRequests(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {bookingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <CheckIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400">No pending booking requests</p>
                </div>
              ) : (
                bookingRequests.map(request => {
                  const Icon = getEventIcon(request.type);
                  return (
                    <div key={request.id} className={`p-4 glass rounded-xl border-l-4 ${getPriorityColor(request.priority)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className="w-5 h-5 text-gray-400" />
                            <h4 className="font-semibold text-white">{request.patientName}</h4>
                            <span className="text-sm text-gray-400">({request.patientId})</span>
                            {request.priority === 'urgent' && (
                              <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <p className="text-gray-300 mb-2">{request.reason}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{new Date(request.requestedDate).toLocaleDateString()}</span>
                            <span>{request.requestedTime}</span>
                            <span>{request.duration} min</span>
                            <span className="capitalize">{request.type.replace('_', ' ')}</span>
                            <span>Submitted {request.submittedAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleApproveBooking(request.id)}
                            className="btn-primary text-sm px-3 py-1"
                          >
                            <CheckIcon className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectBooking(request.id)}
                            className="px-3 py-1 text-sm bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 border border-red-600/30"
                          >
                            <XMarkIcon className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/patients" className="card p-4 card-hover">
          <UserGroupIcon className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="font-semibold text-white mb-1">View Patients</h4>
          <p className="text-sm text-gray-400">Access patient records</p>
        </Link>
        
        <button className="card p-4 card-hover text-left">
          <ArrowPathIcon className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold text-white mb-1">Sync Calendar</h4>
          <p className="text-sm text-gray-400">Update from external calendars</p>
        </button>
        
        <Link href="/analytics" className="card p-4 card-hover">
          <ClockIcon className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="font-semibold text-white mb-1">Schedule Analytics</h4>
          <p className="text-sm text-gray-400">View scheduling insights</p>
        </Link>
      </div>
    </div>
  );
} 