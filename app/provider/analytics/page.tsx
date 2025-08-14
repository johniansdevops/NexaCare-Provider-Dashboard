'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BrainIcon,
  EyeIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  InformationCircleIcon,
  BoltIcon,
  BeakerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  color: string;
  icon: any;
}

interface PatientOutcome {
  id: string;
  condition: string;
  totalPatients: number;
  successRate: number;
  averageTreatmentDuration: number;
  readmissionRate: number;
  patientSatisfaction: number;
  trend: 'improving' | 'declining' | 'stable';
}

interface RevenueData {
  period: string;
  totalRevenue: number;
  insuranceRevenue: number;
  selfPayRevenue: number;
  pendingClaims: number;
  collectionsRate: number;
}

interface CommonCondition {
  id: string;
  name: string;
  patientCount: number;
  percentage: number;
  averageVisits: number;
  totalRevenue: number;
  outcomes: {
    resolved: number;
    improved: number;
    stable: number;
    declined: number;
  };
}

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  impact: string;
  timeframe: string;
}

export default function ProviderAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [outcomes, setOutcomes] = useState<PatientOutcome[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [commonConditions, setCommonConditions] = useState<CommonCondition[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  // Mock analytics data
  const mockMetrics: AnalyticsMetric[] = [
    {
      id: 'total_patients',
      label: 'Total Patients',
      value: 1247,
      previousValue: 1189,
      unit: '',
      trend: 'up',
      changePercentage: 4.9,
      color: 'text-blue-400',
      icon: UserGroupIcon,
    },
    {
      id: 'appointments',
      label: 'Appointments',
      value: 156,
      previousValue: 142,
      unit: '',
      trend: 'up',
      changePercentage: 9.9,
      color: 'text-green-400',
      icon: CalendarIcon,
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: 87450,
      previousValue: 82300,
      unit: '$',
      trend: 'up',
      changePercentage: 6.3,
      color: 'text-green-400',
      icon: CurrencyDollarIcon,
    },
    {
      id: 'satisfaction',
      label: 'Satisfaction Score',
      value: 4.8,
      previousValue: 4.6,
      unit: '/5',
      trend: 'up',
      changePercentage: 4.3,
      color: 'text-yellow-400',
      icon: HeartIcon,
    },
    {
      id: 'readmission',
      label: 'Readmission Rate',
      value: 2.1,
      previousValue: 2.8,
      unit: '%',
      trend: 'down',
      changePercentage: -25.0,
      color: 'text-green-400',
      icon: ExclamationTriangleIcon,
    },
    {
      id: 'no_shows',
      label: 'No-Show Rate',
      value: 8.5,
      previousValue: 11.2,
      unit: '%',
      trend: 'down',
      changePercentage: -24.1,
      color: 'text-green-400',
      icon: ClockIcon,
    },
  ];

  const mockOutcomes: PatientOutcome[] = [
    {
      id: '1',
      condition: 'Hypertension',
      totalPatients: 245,
      successRate: 87.5,
      averageTreatmentDuration: 6,
      readmissionRate: 3.2,
      patientSatisfaction: 4.7,
      trend: 'improving',
    },
    {
      id: '2',
      condition: 'Type 2 Diabetes',
      totalPatients: 189,
      successRate: 82.1,
      averageTreatmentDuration: 12,
      readmissionRate: 4.1,
      patientSatisfaction: 4.5,
      trend: 'stable',
    },
    {
      id: '3',
      condition: 'Anxiety Disorders',
      totalPatients: 156,
      successRate: 78.8,
      averageTreatmentDuration: 8,
      readmissionRate: 2.1,
      patientSatisfaction: 4.8,
      trend: 'improving',
    },
    {
      id: '4',
      condition: 'Chronic Pain',
      totalPatients: 134,
      successRate: 72.3,
      averageTreatmentDuration: 10,
      readmissionRate: 5.2,
      patientSatisfaction: 4.2,
      trend: 'declining',
    },
  ];

  const mockRevenueData: RevenueData[] = [
    {
      period: 'Jan 2024',
      totalRevenue: 87450,
      insuranceRevenue: 72150,
      selfPayRevenue: 15300,
      pendingClaims: 12500,
      collectionsRate: 94.2,
    },
    {
      period: 'Dec 2023',
      totalRevenue: 82300,
      insuranceRevenue: 68900,
      selfPayRevenue: 13400,
      pendingClaims: 15200,
      collectionsRate: 91.8,
    },
    {
      period: 'Nov 2023',
      totalRevenue: 79800,
      insuranceRevenue: 66200,
      selfPayRevenue: 13600,
      pendingClaims: 18400,
      collectionsRate: 89.5,
    },
  ];

  const mockCommonConditions: CommonCondition[] = [
    {
      id: '1',
      name: 'Hypertension',
      patientCount: 245,
      percentage: 19.6,
      averageVisits: 3.2,
      totalRevenue: 24500,
      outcomes: { resolved: 35, improved: 180, stable: 25, declined: 5 },
    },
    {
      id: '2',
      name: 'Type 2 Diabetes',
      patientCount: 189,
      percentage: 15.2,
      averageVisits: 4.1,
      totalRevenue: 31200,
      outcomes: { resolved: 15, improved: 140, stable: 28, declined: 6 },
    },
    {
      id: '3',
      name: 'Anxiety Disorders',
      patientCount: 156,
      percentage: 12.5,
      averageVisits: 2.8,
      totalRevenue: 18700,
      outcomes: { resolved: 45, improved: 95, stable: 12, declined: 4 },
    },
    {
      id: '4',
      name: 'Chronic Pain',
      patientCount: 134,
      percentage: 10.7,
      averageVisits: 3.8,
      totalRevenue: 22400,
      outcomes: { resolved: 20, improved: 80, stable: 25, declined: 9 },
    },
    {
      id: '5',
      name: 'Depression',
      patientCount: 112,
      percentage: 9.0,
      averageVisits: 3.5,
      totalRevenue: 16800,
      outcomes: { resolved: 25, improved: 70, stable: 15, declined: 2 },
    },
  ];

  const mockAIInsights: AIInsight[] = [
    {
      id: '1',
      type: 'prediction',
      title: 'Increased No-Show Risk Predicted',
      description: 'AI models predict a 15% increase in appointment no-shows for next month based on historical patterns and current patient behavior.',
      confidence: 87,
      priority: 'high',
      actionable: true,
      impact: 'Potential revenue loss of $12,000',
      timeframe: 'Next 30 days',
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Chronic Care Management Opportunity',
      description: 'Analysis shows 45 patients with diabetes could benefit from enhanced care coordination, potentially improving outcomes by 25%.',
      confidence: 92,
      priority: 'medium',
      actionable: true,
      impact: 'Improved patient outcomes, additional revenue',
      timeframe: 'Next 90 days',
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Telehealth Expansion Recommended',
      description: 'Patient preference data suggests 35% of follow-up appointments could be conducted via telehealth, improving efficiency.',
      confidence: 78,
      priority: 'medium',
      actionable: true,
      impact: 'Increased capacity, reduced overhead',
      timeframe: 'Next 60 days',
    },
    {
      id: '4',
      type: 'alert',
      title: 'Medication Adherence Concern',
      description: 'Treatment outcomes indicate declining medication adherence in 28 hypertension patients, requiring intervention.',
      confidence: 94,
      priority: 'high',
      actionable: true,
      impact: 'Prevent complications, improve outcomes',
      timeframe: 'Immediate',
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMetrics(mockMetrics);
      setOutcomes(mockOutcomes);
      setRevenueData(mockRevenueData);
      setCommonConditions(mockCommonConditions);
      setAiInsights(mockAIInsights);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowTrendingUpIcon;
      case 'down': return ArrowTrendingDownIcon;
      default: return ClockIcon;
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean = true) => {
    if (trend === 'stable') return 'text-gray-400';
    if (trend === 'up') return isPositive ? 'text-green-400' : 'text-red-400';
    if (trend === 'down') return isPositive ? 'text-red-400' : 'text-green-400';
    return 'text-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10 text-red-300';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300';
      case 'low': return 'border-green-500/30 bg-green-500/10 text-green-300';
      default: return 'border-gray-500/30 bg-gray-500/10 text-gray-300';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return BrainIcon;
      case 'recommendation': return BoltIcon;
      case 'alert': return ExclamationTriangleIcon;
      case 'opportunity': return ArrowTrendingUpIcon;
      default: return InformationCircleIcon;
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-mesh min-h-screen animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 dark-elevated rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 dark-elevated rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-mesh min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="heading-large text-white mb-2">Practice Analytics</h1>
          <p className="body-large">Track performance, outcomes, and AI-powered insights</p>
          <div className="mt-2 mono-text text-gray-500 text-sm">
            Data updated in real-time • AI predictions with 90%+ accuracy
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input px-4 py-2"
          >
            {periods.map(period => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
          <Link href="/provider/ai-chat" className="btn-outline">
            <SparklesIcon className="w-5 h-5 mr-2" />
            Ask AI
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {metrics.map(metric => {
          const TrendIcon = getTrendIcon(metric.trend);
          const isPositiveMetric = !['readmission', 'no_shows'].includes(metric.id);
          return (
            <div key={metric.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  metric.color === 'text-blue-400' ? 'bg-blue-500/20 border border-blue-500/30' :
                  metric.color === 'text-green-400' ? 'bg-green-500/20 border border-green-500/30' :
                  metric.color === 'text-yellow-400' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                  'bg-gray-500/20 border border-gray-500/30'
                }`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend, isPositiveMetric)}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {metric.changePercentage > 0 ? '+' : ''}{metric.changePercentage}%
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-3xl font-bold text-white mb-1">
                  {metric.unit === '$' ? '$' : ''}{metric.value.toLocaleString()}{metric.unit !== '$' ? metric.unit : ''}
                </p>
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-xs text-gray-500 mt-1 mono-text">
                  vs {metric.previousValue.toLocaleString()} last period
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 mediva-gradient rounded-2xl flex items-center justify-center ai-glow">
              <span className="text-white font-bold">✦</span>
            </div>
            <h3 className="heading-small text-white">AI Predictive Insights</h3>
          </div>
          <span className="text-sm text-gray-400 mono-text">Powered by machine learning</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiInsights.map(insight => {
            const InsightIcon = getInsightIcon(insight.type);
            return (
              <div
                key={insight.id}
                className={`p-4 rounded-xl border-2 ${getPriorityColor(insight.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <InsightIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <span className="text-xs px-2 py-1 bg-black/20 rounded-full">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm opacity-90 mb-3">{insight.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400">Impact:</span>
                        <p>{insight.impact}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeframe:</span>
                        <p>{insight.timeframe}</p>
                      </div>
                    </div>
                    
                    {insight.actionable && (
                      <button className="mt-3 text-xs btn-primary px-3 py-1">
                        Take Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Treatment Outcomes */}
        <div className="card p-6 animate-slide-up">
          <h3 className="heading-small text-white mb-6">Treatment Outcomes</h3>
          
          <div className="space-y-4">
            {outcomes.map(outcome => (
              <div key={outcome.id} className="p-4 glass rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{outcome.condition}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      outcome.trend === 'improving' ? 'bg-green-500/20 text-green-300' :
                      outcome.trend === 'declining' ? 'bg-red-500/20 text-red-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {outcome.trend}
                    </span>
                    <span className="text-sm text-gray-400 mono-text">
                      {outcome.totalPatients} patients
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Success Rate:</span>
                    <p className="text-green-400 font-medium">{outcome.successRate}%</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Satisfaction:</span>
                    <p className="text-yellow-400 font-medium">{outcome.patientSatisfaction}/5</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Treatment:</span>
                    <p className="text-blue-400 font-medium">{outcome.averageTreatmentDuration} months</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Readmission:</span>
                    <p className="text-orange-400 font-medium">{outcome.readmissionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Conditions */}
        <div className="card p-6 animate-slide-up">
          <h3 className="heading-small text-white mb-6">Most Common Conditions</h3>
          
          <div className="space-y-4">
            {commonConditions.map(condition => (
              <div key={condition.id} className="p-4 glass rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{condition.name}</h4>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-400">{condition.percentage}%</p>
                    <p className="text-xs text-gray-400 mono-text">{condition.patientCount} patients</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Patient Outcomes</span>
                    <span>{condition.patientCount} total</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="h-full flex">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(condition.outcomes.resolved / condition.patientCount) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${(condition.outcomes.improved / condition.patientCount) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(condition.outcomes.stable / condition.patientCount) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${(condition.outcomes.declined / condition.patientCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-green-400">Resolved: {condition.outcomes.resolved}</span>
                    <span className="text-blue-400">Improved: {condition.outcomes.improved}</span>
                    <span className="text-yellow-400">Stable: {condition.outcomes.stable}</span>
                    <span className="text-red-400">Declined: {condition.outcomes.declined}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Avg Visits:</span>
                    <p className="text-white font-medium">{condition.averageVisits}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Revenue:</span>
                    <p className="text-green-400 font-medium">${condition.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="card p-6 animate-slide-up">
        <h3 className="heading-small text-white mb-6">Revenue Summary</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400 text-sm font-medium">Period</th>
                <th className="text-right py-3 text-gray-400 text-sm font-medium">Total Revenue</th>
                <th className="text-right py-3 text-gray-400 text-sm font-medium">Insurance</th>
                <th className="text-right py-3 text-gray-400 text-sm font-medium">Self Pay</th>
                <th className="text-right py-3 text-gray-400 text-sm font-medium">Pending Claims</th>
                <th className="text-right py-3 text-gray-400 text-sm font-medium">Collections Rate</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((data, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-4 text-white font-medium">{data.period}</td>
                  <td className="py-4 text-right text-green-400 font-bold">
                    ${data.totalRevenue.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-white">
                    ${data.insuranceRevenue.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-white">
                    ${data.selfPayRevenue.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-yellow-400">
                    ${data.pendingClaims.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-blue-400 font-medium">
                    {data.collectionsRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6 animate-slide-up">
        <h3 className="heading-small text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="card-interactive p-4 text-center">
            <DocumentTextIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Generate Report</p>
          </button>
          
          <button className="card-interactive p-4 text-center">
            <BoltIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">AI Recommendations</p>
          </button>
          
          <button className="card-interactive p-4 text-center">
            <ChartBarIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Detailed Analytics</p>
          </button>
          
          <button className="card-interactive p-4 text-center">
            <CurrencyDollarIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Revenue Forecast</p>
          </button>
        </div>
      </div>
    </div>
  );
} 