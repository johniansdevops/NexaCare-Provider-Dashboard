'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BeakerIcon,
  HeartIcon,
  CpuChipIcon,
  EyeIcon,
  DocumentTextIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ScissorsIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface ClinicalAlert {
  id: string;
  type: 'drug_interaction' | 'diagnosis_suggestion' | 'risk_warning' | 'protocol_reminder' | 'lab_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  aiConfidence: number;
  actionRequired: boolean;
  relatedConditions?: string[];
  suggestedActions?: string[];
  evidenceLinks?: Array<{
    title: string;
    source: string;
    relevance: number;
  }>;
}

interface DiagnosticSuggestion {
  id: string;
  patientId: string;
  patientName: string;
  symptoms: string[];
  suggestedDiagnoses: Array<{
    condition: string;
    probability: number;
    reasoning: string;
    severity: 'mild' | 'moderate' | 'severe' | 'critical';
    recommendedTests: string[];
  }>;
  riskFactors: string[];
  urgencyLevel: 'routine' | 'urgent' | 'stat';
  timestamp: string;
  aiConfidence: number;
}

interface RiskAssessment {
  id: string;
  patientId: string;
  patientName: string;
  riskType: 'sepsis' | 'cardiac_event' | 'stroke' | 'falls' | 'readmission' | 'mortality';
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  contributingFactors: string[];
  preventiveActions: string[];
  monitoringRecommendations: string[];
  nextReviewDate: string;
  trend: 'improving' | 'stable' | 'deteriorating';
  confidence: number;
}

interface ClinicalProtocol {
  id: string;
  title: string;
  category: 'diagnosis' | 'treatment' | 'prevention' | 'emergency';
  description: string;
  steps: Array<{
    step: number;
    action: string;
    timeframe: string;
    critical: boolean;
  }>;
  applicableConditions: string[];
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  lastUpdated: string;
}

export default function ClinicalDecisionSupport() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alerts, setAlerts] = useState<ClinicalAlert[]>([]);
  const [diagnosticSuggestions, setDiagnosticSuggestions] = useState<DiagnosticSuggestion[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [protocols, setProtocols] = useState<ClinicalProtocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with real AI predictions
    setAlerts([
      {
        id: '1',
        type: 'drug_interaction',
        severity: 'high',
        title: 'Severe Drug Interaction Detected',
        description: 'Warfarin and Amoxicillin combination may increase bleeding risk. Consider dose adjustment or alternative antibiotic.',
        patientId: 'PT002',
        patientName: 'Michael Chen',
        timestamp: '2 minutes ago',
        aiConfidence: 94,
        actionRequired: true,
        suggestedActions: [
          'Review current medications',
          'Consider alternative antibiotic',
          'Monitor INR levels closely',
          'Consult pharmacist'
        ],
        evidenceLinks: [
          { title: 'Warfarin-Antibiotic Interactions', source: 'PubMed', relevance: 95 },
          { title: 'Bleeding Risk Assessment', source: 'Cochrane', relevance: 88 }
        ]
      },
      {
        id: '2',
        type: 'diagnosis_suggestion',
        severity: 'medium',
        title: 'Possible Sepsis Development',
        description: 'Patient shows early signs of sepsis based on vital trends and lab values. Consider immediate evaluation.',
        patientId: 'PT003',
        patientName: 'Emily Rodriguez',
        timestamp: '5 minutes ago',
        aiConfidence: 87,
        actionRequired: true,
        relatedConditions: ['Infection', 'SIRS', 'Sepsis'],
        suggestedActions: [
          'Order blood cultures',
          'Start empirical antibiotics',
          'Monitor lactate levels',
          'Consider ICU consultation'
        ]
      },
      {
        id: '3',
        type: 'risk_warning',
        severity: 'critical',
        title: 'High Fall Risk Identified',
        description: 'Patient Robert Wilson has multiple fall risk factors. Immediate intervention recommended.',
        patientId: 'PT006',
        patientName: 'Robert Wilson',
        timestamp: '8 minutes ago',
        aiConfidence: 92,
        actionRequired: true,
        suggestedActions: [
          'Implement fall precautions',
          'Place bed alarm',
          'Assess mobility status',
          'Review medications causing dizziness'
        ]
      },
      {
        id: '4',
        type: 'lab_alert',
        severity: 'high',
        title: 'Critical Lab Value Alert',
        description: 'Potassium level of 6.2 mEq/L detected. Immediate intervention required to prevent cardiac complications.',
        patientId: 'PT007',
        patientName: 'Maria Garcia',
        timestamp: '12 minutes ago',
        aiConfidence: 98,
        actionRequired: true,
        suggestedActions: [
          'Order immediate EKG',
          'Administer calcium gluconate',
          'Consider insulin/glucose therapy',
          'Monitor cardiac rhythm'
        ]
      }
    ]);

    setDiagnosticSuggestions([
      {
        id: '1',
        patientId: 'PT008',
        patientName: 'James Anderson',
        symptoms: ['Chest pain', 'Shortness of breath', 'Diaphoresis', 'Nausea'],
        suggestedDiagnoses: [
          {
            condition: 'Acute Myocardial Infarction',
            probability: 85,
            reasoning: 'Classic presentation with chest pain, diaphoresis, and associated symptoms in high-risk patient.',
            severity: 'critical',
            recommendedTests: ['EKG', 'Troponin I', 'CXR', 'CBC', 'BMP']
          },
          {
            condition: 'Unstable Angina',
            probability: 65,
            reasoning: 'Chest pain pattern consistent with unstable angina, but lacks typical EKG changes.',
            severity: 'severe',
            recommendedTests: ['Serial EKGs', 'Troponin series', 'Stress test']
          },
          {
            condition: 'Pulmonary Embolism',
            probability: 45,
            reasoning: 'Shortness of breath and chest pain could indicate PE, especially with risk factors.',
            severity: 'severe',
            recommendedTests: ['D-dimer', 'CT-PA', 'ABG', 'Lower extremity Doppler']
          }
        ],
        riskFactors: ['Age 65+', 'Diabetes', 'Hypertension', 'Family history of CAD'],
        urgencyLevel: 'stat',
        timestamp: '3 minutes ago',
        aiConfidence: 91
      }
    ]);

    setRiskAssessments([
      {
        id: '1',
        patientId: 'PT009',
        patientName: 'Jennifer Lee',
        riskType: 'sepsis',
        riskScore: 78,
        riskLevel: 'high',
        contributingFactors: [
          'Elevated white blood cell count',
          'Fever >101°F',
          'Tachycardia',
          'Recent surgery',
          'Immunocompromised state'
        ],
        preventiveActions: [
          'Initiate sepsis protocol',
          'Broad-spectrum antibiotics',
          'Fluid resuscitation',
          'Serial lactate monitoring'
        ],
        monitoringRecommendations: [
          'Vital signs q15min',
          'Urine output monitoring',
          'Mental status checks',
          'Laboratory trends'
        ],
        nextReviewDate: '2024-01-16T10:00:00',
        trend: 'deteriorating',
        confidence: 89
      },
      {
        id: '2',
        patientId: 'PT010',
        patientName: 'David Thompson',
        riskType: 'cardiac_event',
        riskScore: 65,
        riskLevel: 'moderate',
        contributingFactors: [
          'Elevated troponin',
          'History of CAD',
          'Diabetes mellitus',
          'Smoking history'
        ],
        preventiveActions: [
          'Cardiology consultation',
          'Dual antiplatelet therapy',
          'Beta-blocker initiation',
          'Statin therapy'
        ],
        monitoringRecommendations: [
          'Continuous cardiac monitoring',
          'Serial EKGs',
          'Troponin trend',
          'Blood pressure monitoring'
        ],
        nextReviewDate: '2024-01-16T14:00:00',
        trend: 'stable',
        confidence: 82
      }
    ]);

    setProtocols([
      {
        id: '1',
        title: 'Sepsis Recognition and Management',
        category: 'emergency',
        description: 'Evidence-based protocol for early recognition and management of sepsis in adult patients.',
        steps: [
          { step: 1, action: 'Identify SIRS criteria (2 or more)', timeframe: 'Immediate', critical: true },
          { step: 2, action: 'Obtain blood cultures before antibiotics', timeframe: 'Within 1 hour', critical: true },
          { step: 3, action: 'Administer broad-spectrum antibiotics', timeframe: 'Within 1 hour', critical: true },
          { step: 4, action: 'Initiate fluid resuscitation', timeframe: 'Within 3 hours', critical: true },
          { step: 5, action: 'Monitor lactate levels', timeframe: 'Every 2-4 hours', critical: false }
        ],
        applicableConditions: ['Sepsis', 'SIRS', 'Severe Infection'],
        evidenceLevel: 'A',
        lastUpdated: '2024-01-10'
      },
      {
        id: '2',
        title: 'Acute Chest Pain Evaluation',
        category: 'diagnosis',
        description: 'Systematic approach to evaluation of acute chest pain in the emergency department.',
        steps: [
          { step: 1, action: 'Obtain 12-lead EKG', timeframe: 'Within 10 minutes', critical: true },
          { step: 2, action: 'Assessment of vital signs', timeframe: 'Immediate', critical: true },
          { step: 3, action: 'Order troponin I', timeframe: 'Within 30 minutes', critical: true },
          { step: 4, action: 'Chest X-ray if indicated', timeframe: 'Within 1 hour', critical: false },
          { step: 5, action: 'Risk stratification using HEART score', timeframe: 'Within 1 hour', critical: false }
        ],
        applicableConditions: ['Chest Pain', 'ACS', 'Myocardial Infarction'],
        evidenceLevel: 'A',
        lastUpdated: '2024-01-08'
      }
    ]);

    setLoading(false);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-400';
      case 'high':
        return 'text-orange-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drug_interaction':
        return BeakerIcon;
      case 'diagnosis_suggestion':
        return CpuChipIcon;
      case 'risk_warning':
        return ExclamationTriangleIcon;
      case 'protocol_reminder':
        return DocumentTextIcon;
      case 'lab_alert':
        return HeartIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800/30 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-large text-white mb-2">
            <span className="ai-text">✦</span> Clinical Decision Support
          </h1>
          <p className="text-gray-400 body-text">
            AI-powered clinical insights and recommendations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <AcademicCapIcon className="w-4 h-4 mr-2" />
            Guidelines
          </button>
          <button className="btn-primary">
            <SparklesIcon className="w-4 h-4 mr-2" />
            AI Insights
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-400">
                {alerts.filter(a => a.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <CpuChipIcon className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">AI Suggestions</p>
              <p className="text-2xl font-bold text-orange-400">{diagnosticSuggestions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Risk Assessments</p>
              <p className="text-2xl font-bold text-yellow-400">{riskAssessments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Protocols Active</p>
              <p className="text-2xl font-bold text-green-400">{protocols.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts, patients, or conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input w-full"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex space-x-8">
          {[
            { id: 'alerts', label: 'Active Alerts', count: alerts.length },
            { id: 'diagnostics', label: 'AI Diagnostics', count: diagnosticSuggestions.length },
            { id: 'risk', label: 'Risk Assessments', count: riskAssessments.length },
            { id: 'protocols', label: 'Clinical Protocols', count: protocols.length }
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
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {filteredAlerts.map(alert => {
            const Icon = getTypeIcon(alert.type);
            return (
              <div key={alert.id} className={`card p-6 border-l-4 ${getSeverityColor(alert.severity)} border`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Patient: {alert.patientName}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                        <span>•</span>
                        <span>AI Confidence: {alert.aiConfidence}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {alert.actionRequired && (
                    <div className="flex items-center space-x-2">
                      <button className="btn-primary text-sm">
                        Take Action
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50">
                        <ClockIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {alert.suggestedActions && (
                  <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">Suggested Actions:</h4>
                    <ul className="space-y-1">
                      {alert.suggestedActions.map((action, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {alert.evidenceLinks && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-medium text-white mb-2">Supporting Evidence:</h4>
                    <div className="space-y-2">
                      {alert.evidenceLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-blue-400 hover:text-blue-300 cursor-pointer">{link.title}</span>
                          <span className="text-gray-500">{link.source} • {link.relevance}% relevance</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'diagnostics' && (
        <div className="space-y-6">
          {diagnosticSuggestions.map(suggestion => (
            <div key={suggestion.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    AI Diagnostic Suggestions - {suggestion.patientName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span>Patient ID: {suggestion.patientId}</span>
                    <span>•</span>
                    <span>{suggestion.timestamp}</span>
                    <span>•</span>
                    <span>Confidence: {suggestion.aiConfidence}%</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      suggestion.urgencyLevel === 'stat' ? 'text-red-400' :
                      suggestion.urgencyLevel === 'urgent' ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {suggestion.urgencyLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Presenting Symptoms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.symptoms.map((symptom, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Differential Diagnoses:</h4>
                {suggestion.suggestedDiagnoses.map((diagnosis, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{diagnosis.condition}</h5>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${
                          diagnosis.probability > 70 ? 'text-red-400' :
                          diagnosis.probability > 50 ? 'text-orange-400' :
                          diagnosis.probability > 30 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {diagnosis.probability}% probability
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(diagnosis.severity)}`}>
                          {diagnosis.severity}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{diagnosis.reasoning}</p>
                    <div>
                      <h6 className="text-sm font-medium text-gray-300 mb-2">Recommended Tests:</h6>
                      <div className="flex flex-wrap gap-2">
                        {diagnosis.recommendedTests.map((test, testIndex) => (
                          <span key={testIndex} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="space-y-4">
          {riskAssessments.map(assessment => (
            <div key={assessment.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    {assessment.riskType.replace('_', ' ').toUpperCase()} Risk Assessment
                  </h3>
                  <p className="text-gray-400 mb-2">Patient: {assessment.patientName}</p>
                </div>
                
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRiskColor(assessment.riskLevel)} mb-1`}>
                    {assessment.riskScore}%
                  </div>
                  <div className={`text-sm font-medium ${getRiskColor(assessment.riskLevel)}`}>
                    {assessment.riskLevel.toUpperCase()} RISK
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {assessment.trend === 'improving' ? (
                      <ArrowTrendingDownIcon className="w-4 h-4 text-green-400" />
                    ) : assessment.trend === 'deteriorating' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4 text-red-400" />
                    ) : null}
                    <span className={`text-xs ${
                      assessment.trend === 'improving' ? 'text-green-400' :
                      assessment.trend === 'deteriorating' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {assessment.trend}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Contributing Factors:</h4>
                  <ul className="space-y-1">
                    {assessment.contributingFactors.map((factor, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center space-x-2">
                        <XCircleIcon className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Preventive Actions:</h4>
                  <ul className="space-y-1">
                    {assessment.preventiveActions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center space-x-2">
                        <CheckCircleIcon className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Monitoring:</h4>
                  <ul className="space-y-1">
                    {assessment.monitoringRecommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center space-x-2">
                        <ClockIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Next Review: {new Date(assessment.nextReviewDate).toLocaleString()}
                </span>
                <span className="text-sm text-gray-400">
                  AI Confidence: {assessment.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'protocols' && (
        <div className="space-y-4">
          {protocols.map(protocol => (
            <div key={protocol.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">{protocol.title}</h3>
                  <p className="text-gray-400 mb-2">{protocol.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="capitalize">{protocol.category}</span>
                    <span>•</span>
                    <span>Evidence Level: {protocol.evidenceLevel}</span>
                    <span>•</span>
                    <span>Updated: {new Date(protocol.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Applicable Conditions:</h4>
                <div className="flex flex-wrap gap-2">
                  {protocol.applicableConditions.map((condition, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Protocol Steps:</h4>
                <div className="space-y-3">
                  {protocol.steps.map((step, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                      step.critical ? 'bg-red-500/10 border border-red-500/30' : 'bg-gray-800/50'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.critical ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{step.action}</p>
                        <p className="text-sm text-gray-400">Timeframe: {step.timeframe}</p>
                      </div>
                      {step.critical && (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 