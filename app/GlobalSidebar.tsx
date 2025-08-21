'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CalendarIcon,
  HeartIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
  SquaresPlusIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | string;
  isAI?: boolean;
}

const providerNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/provider', icon: SquaresPlusIcon },
  { name: 'AI Clinical Assistant', href: '/provider/ai-chat', icon: '✦', isAI: true },
  { name: 'Patients', href: '/provider/patients', icon: UserGroupIcon },
  { name: 'Schedule', href: '/provider/calendar', icon: CalendarIcon },
  { name: 'Monitoring', href: '/provider/real-time-monitoring', icon: HeartIcon },
  { name: 'Clinical Support', href: '/provider/clinical-decision-support', icon: BeakerIcon },
  { name: 'Analytics', href: '/provider/analytics', icon: ChartBarIcon },
  { name: 'Documents', href: '/provider/documents', icon: DocumentTextIcon },
  { name: 'Clinical Notes', href: '/provider/notes', icon: ClipboardDocumentListIcon },
];

interface GlobalSidebarProps {
  className?: string;
}

export default function GlobalSidebar({ className }: GlobalSidebarProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use provider navigation
  const navigation = providerNavigation;

  // Mock user data - in real app this would come from auth context
  const user = {
    full_name: 'Dr. Sarah Smith',
    role: 'provider'
  };

  const signOut = () => {
    console.log('Sign out clicked');
    // Add actual sign out logic here
  };

  return (
    <>
      {/* Mobile sidebar backdrop and sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✦</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                NexaCare
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = typeof item.icon === 'string' ? null : item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-pink-50 to-purple-50 text-gray-900 border border-pink-200 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.isAI ? (
                    <span className={cn(
                      "text-lg font-bold transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent filter drop-shadow-sm" 
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent opacity-70 hover:opacity-100"
                    )}>
                      ✦
                    </span>
                  ) : Icon ? (
                    <Icon className={cn(
                      "w-6 h-6 transition-all duration-200",
                      isActive
                        ? "text-purple-600 filter drop-shadow-sm"
                        : "text-gray-500 group-hover:text-purple-600"
                    )} />
                  ) : null}
                  <span className={item.isAI && !isActive ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent" : ""}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={cn("hidden lg:fixed lg:inset-y-0 lg:flex lg:w-20 lg:flex-col", className)}>
        <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
          {/* Top Icon - Logo/AI */}
          <div className="flex items-center justify-center h-16 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex-1 flex flex-col items-center py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = typeof item.icon === 'string' ? null : item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center transition-all duration-200 group relative rounded-xl",
                    isActive
                      ? "bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 shadow-sm"
                      : "hover:bg-gray-50 hover:border hover:border-gray-200"
                  )}
                  title={item.name}
                >
                  {item.isAI ? (
                    <span className={cn(
                      "text-xl font-bold transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent filter drop-shadow-lg animate-pulse"
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent opacity-70 hover:opacity-100 hover:filter hover:drop-shadow-md"
                    )}>
                      ✦
                    </span>
                  ) : Icon ? (
                    <Icon className={cn(
                      "w-6 h-6 transition-all duration-200",
                      isActive 
                        ? "text-purple-600 filter drop-shadow-sm"
                        : "text-gray-500 group-hover:text-purple-600 group-hover:filter group-hover:drop-shadow-sm"
                    )} />
                  ) : null}
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-200 shadow-lg">
                    {item.name}
                    <div className="absolute top-1/2 left-0 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-y-1/2 -translate-x-full"></div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Icons */}
          <div className="flex flex-col items-center py-4 space-y-2 border-t border-gray-100">
            {/* Settings */}
            <Link
              href="/provider/settings"
              className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-gray-50 transition-all duration-200 group relative"
              title="Settings"
            >
              <Cog6ToothIcon className="w-6 h-6 group-hover:filter group-hover:drop-shadow-sm" />
              <div className="absolute left-full ml-3 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-200 shadow-lg">
                Settings
                <div className="absolute top-1/2 left-0 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-y-1/2 -translate-x-full"></div>
              </div>
            </Link>

            {/* Help */}
            <Link
              href="/provider/help"
              className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-gray-50 transition-all duration-200 group relative"
              title="Help"
            >
              <QuestionMarkCircleIcon className="w-6 h-6 group-hover:filter group-hover:drop-shadow-sm" />
              <div className="absolute left-full ml-3 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-200 shadow-lg">
                Help & Support
                <div className="absolute top-1/2 left-0 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-y-1/2 -translate-x-full"></div>
              </div>
            </Link>

            {/* User Profile */}
            <button
              onClick={signOut}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center group relative shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              title={`${user.full_name} - Sign out`}
            >
              <span className="text-sm font-medium text-white">
                {user.full_name?.charAt(0) || 'D'}
              </span>
              <div className="absolute left-full ml-3 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-200 shadow-lg">
                Sign out
                <div className="absolute top-1/2 left-0 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-y-1/2 -translate-x-full"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-12 h-12 rounded-xl bg-white text-gray-600 border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:text-purple-600 transition-all duration-200"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
    </>
  );
} 