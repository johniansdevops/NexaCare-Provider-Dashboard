'use client';

import React from 'react';
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
} from '@heroicons/react/24/outline';

interface SidebarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  gradient?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: HomeIcon,
    href: '/provider',
    label: 'Dashboard',
    gradient: 'icon-gradient-blue'
  },
  {
    id: 'calendar',
    icon: CalendarIcon,
    href: '/provider/calendar',
    label: 'Calendar',
  },
  {
    id: 'monitoring',
    icon: HeartIcon,
    href: '/provider/real-time-monitoring',
    label: 'Real-Time Monitoring',
    gradient: 'icon-gradient-red'
  },
  {
    id: 'patients',
    icon: UserGroupIcon,
    href: '/provider/patients',
    label: 'Patients',
  },
  {
    id: 'ai-chat',
    icon: ChatBubbleLeftRightIcon,
    href: '/provider/ai-chat',
    label: 'AI Assistant',
    gradient: 'icon-gradient-ai'
  },
  {
    id: 'analytics',
    icon: ChartBarIcon,
    href: '/provider/analytics',
    label: 'Analytics',
    gradient: 'icon-gradient-green'
  },
  {
    id: 'clinical',
    icon: BeakerIcon,
    href: '/provider/clinical-decision-support',
    label: 'Clinical Support',
  },
  {
    id: 'documents',
    icon: DocumentTextIcon,
    href: '/provider/documents',
    label: 'Documents',
  },
  {
    id: 'notes',
    icon: ClipboardDocumentListIcon,
    href: '/provider/notes',
    label: 'Clinical Notes',
  },
];

const bottomItems: SidebarItem[] = [
  {
    id: 'settings',
    icon: Cog6ToothIcon,
    href: '/provider/settings',
    label: 'Settings',
  },
  {
    id: 'help',
    icon: QuestionMarkCircleIcon,
    href: '/provider/help',
    label: 'Help',
  },
];

export default function GlobalSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/provider') {
      return pathname === '/provider';
    }
    return pathname?.startsWith(href);
  };

  const getIconClass = (item: SidebarItem, active: boolean) => {
    if (active) {
      return 'w-6 h-6 text-white';
    }
    if (item.gradient) {
      return `w-6 h-6 ${item.gradient}`;
    }
    return 'w-6 h-6 text-gray-400 group-hover:text-white transition-colors';
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 z-50">
      {/* Top Section */}
      <div className="flex flex-col space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative"
              title={item.label}
            >
              <div
                className={`
                  p-2 rounded-xl transition-all duration-200 relative
                  ${active 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' 
                    : 'hover:bg-gray-800'
                  }
                `}
              >
                <Icon className={getIconClass(item, active)} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative"
              title={item.label}
            >
              <div
                className={`
                  p-2 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' 
                    : 'hover:bg-gray-800'
                  }
                `}
              >
                <Icon className={getIconClass(item, active)} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* AI Indicator at bottom */}
      <div className="mt-4">
        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-white text-lg font-bold">✦</span>
          </div>
        </div>
      </div>
    </div>
  );
} 