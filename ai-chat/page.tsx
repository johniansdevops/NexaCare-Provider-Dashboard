'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  BeakerIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ArrowUpIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CpuChipIcon,
  EyeIcon,
  ScissorsIcon,
  BoltIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  chatMode: string;
  confidence?: number;
  sources?: Array<{
    title: string;
    journal: string;
    year: number;
    doi?: string;
    relevance: number;
  }>;
  differential?: Array<{
    condition: string;
    probability: number;
    reasoning: string;
  }>;
  drugInteractions?: Array<{
    drug1: string;
    drug2: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
  }>;
  guidelines?: Array<{
    organization: string;
    recommendation: string;
    evidenceLevel: string;
  }>;
  patientContext?: {
    patientId?: string;
    patientName?: string;
    relevantHistory?: string[];
  };
}

interface ChatMode {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  prompts: string[];
}

export default function ProviderAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedMode, setSelectedMode] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatModes: ChatMode[] = [
    {
      id: 'general',
      name: 'General Clinical Query',
      description: 'General medical questions and clinical guidance',
      icon: SparklesIcon,
      color: 'text-blue-400',
      prompts: [
        'What are the latest treatment guidelines for hypertension?',
        'Explain the pathophysiology of atrial fibrillation',
        'What are the contraindications for ACE inhibitors?',
      ],
    },
    {
      id: 'differential',
      name: 'Differential Diagnosis',
      description: 'Symptom analysis and diagnostic reasoning',
      icon: MagnifyingGlassIcon,
      color: 'text-green-400',
      prompts: [
        'Patient presents with chest pain and shortness of breath',
        'Young adult with sudden onset severe headache',
        'Elderly patient with confusion and altered mental status',
      ],
    },
    {
      id: 'pharmacology',
      name: 'Drug Interactions & Pharmacology',
      description: 'Medication interactions and dosing guidance',
      icon: BeakerIcon,
      color: 'text-purple-400',
      prompts: [
        'Check interactions between warfarin and amiodarone',
        'What is the renal dosing for metformin?',
        'Side effects of combining SSRIs with NSAIDs',
      ],
    },
    {
      id: 'guidelines',
      name: 'Treatment Guidelines',
      description: 'Evidence-based treatment recommendations',
      icon: BookOpenIcon,
      color: 'text-orange-400',
      prompts: [
        'AHA guidelines for acute myocardial infarction',
        'WHO recommendations for COVID-19 treatment',
        'NICE guidelines for diabetes management',
      ],
    },
    {
      id: 'research',
      name: 'Literature Review',
      description: 'Recent research and clinical studies',
      icon: AcademicCapIcon,
      color: 'text-pink-400',
      prompts: [
        'Recent studies on immunotherapy for lung cancer',
        'Meta-analysis of statin efficacy in primary prevention',
        'New research on Alzheimer\'s treatment options',
      ],
    },
  ];

  // Mock patient data for context
  const mockPatients = [
    { id: '1', name: 'Sarah Johnson', age: 45, condition: 'Hypertension, Diabetes' },
    { id: '2', name: 'Michael Chen', age: 67, condition: 'Atrial Fibrillation' },
    { id: '3', name: 'Emma Rodriguez', age: 32, condition: 'Asthma' },
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      type: 'ai',
      content: 'Hello Dr. Smith! I\'m your AI clinical decision support assistant. I\'m here to help you with medical literature queries, differential diagnosis, drug interactions, treatment guidelines, and patient-specific questions. How can I assist you today?',
      timestamp: '2024-01-15T09:00:00Z',
      chatMode: 'general',
      confidence: 100,
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString(),
      chatMode: selectedMode,
      patientContext: selectedPatient ? {
        patientId: selectedPatient,
        patientName: mockPatients.find(p => p.id === selectedPatient)?.name,
      } : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response based on chat mode
    setTimeout(() => {
      let aiResponse: ChatMessage;
      
      switch (selectedMode) {
        case 'differential':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Based on the symptoms you\'ve described, here are the most likely differential diagnoses ranked by probability:',
            timestamp: new Date().toISOString(),
            chatMode: selectedMode,
            confidence: 92,
            differential: [
              {
                condition: 'Acute Coronary Syndrome',
                probability: 35,
                reasoning: 'Classic presentation of chest pain with associated shortness of breath, especially in patients with cardiovascular risk factors.',
              },
              {
                condition: 'Pulmonary Embolism',
                probability: 25,
                reasoning: 'Sudden onset dyspnea and chest pain, particularly concerning in patients with recent immobility or coagulation disorders.',
              },
              {
                condition: 'Pneumonia',
                probability: 20,
                reasoning: 'Respiratory symptoms with potential systemic involvement, consider infectious etiology.',
              },
              {
                condition: 'Anxiety/Panic Attack',
                probability: 15,
                reasoning: 'Symptoms can mimic cardiac events, especially in younger patients without risk factors.',
              },
            ],
            sources: [
              {
                title: 'Chest Pain Evaluation in Emergency Medicine',
                journal: 'Emergency Medicine Clinics',
                year: 2023,
                relevance: 95,
              },
            ],
          };
          break;
          
        case 'pharmacology':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'I\'ve analyzed the potential drug interactions and found significant concerns:',
            timestamp: new Date().toISOString(),
            chatMode: selectedMode,
            confidence: 96,
            drugInteractions: [
              {
                drug1: 'Warfarin',
                drug2: 'Amiodarone',
                severity: 'severe',
                description: 'Amiodarone significantly increases warfarin levels, requiring dose reduction and frequent INR monitoring.',
              },
            ],
            guidelines: [
              {
                organization: 'American Heart Association',
                recommendation: 'Reduce warfarin dose by 30-50% when initiating amiodarone therapy',
                evidenceLevel: 'Class I, Level A',
              },
            ],
          };
          break;
          
        case 'guidelines':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Here are the current evidence-based treatment guidelines:',
            timestamp: new Date().toISOString(),
            chatMode: selectedMode,
            confidence: 98,
            guidelines: [
              {
                organization: 'American Heart Association',
                recommendation: 'Primary PCI within 90 minutes of first medical contact for STEMI patients',
                evidenceLevel: 'Class I, Level A',
              },
              {
                organization: 'European Society of Cardiology',
                recommendation: 'Dual antiplatelet therapy for 12 months post-ACS unless contraindicated',
                evidenceLevel: 'Class I, Level A',
              },
            ],
            sources: [
              {
                title: '2023 AHA/ACC Clinical Practice Guidelines',
                journal: 'Circulation',
                year: 2023,
                relevance: 100,
              },
            ],
          };
          break;
          
        default:
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'I understand your clinical question. Let me provide you with evidence-based information and current best practices to help inform your clinical decision-making.',
            timestamp: new Date().toISOString(),
            chatMode: selectedMode,
            confidence: 88,
            sources: [
              {
                title: 'Current Clinical Practice Guidelines',
                journal: 'New England Journal of Medicine',
                year: 2024,
                relevance: 90,
              },
            ],
          };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const handlePromptClick = (prompt: string) => {
    setCurrentMessage(prompt);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-mesh min-h-screen animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 dark-elevated rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 h-96 dark-elevated rounded-xl"></div>
            <div className="h-96 dark-elevated rounded-xl"></div>
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
          <h1 className="heading-large text-white mb-2">AI Clinical Assistant</h1>
          <p className="body-large">Evidence-based clinical decision support and medical research</p>
          <div className="mt-2 mono-text text-gray-500 text-sm">
            Claude 3.7 • Medical Knowledge Base • Updated January 2024
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 mono-text">AI Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Chat Interface */}
        <div className="lg:col-span-3 card p-6 animate-slide-up">
          {/* Chat Mode Selector */}
          <div className="flex flex-wrap gap-2 mb-6 p-4 glass rounded-xl">
            {chatModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedMode === mode.id
                      ? 'mediva-gradient text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${selectedMode === mode.id ? 'text-white' : mode.color}`} />
                  <span>{mode.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Mode Info */}
          <div className="mb-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              {React.createElement(chatModes.find(m => m.id === selectedMode)?.icon || SparklesIcon, {
                className: `w-5 h-5 ${chatModes.find(m => m.id === selectedMode)?.color}`
              })}
              <h3 className="font-semibold text-white">
                {chatModes.find(m => m.id === selectedMode)?.name}
              </h3>
            </div>
            <p className="text-sm text-blue-300 mb-3">
              {chatModes.find(m => m.id === selectedMode)?.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {chatModes.find(m => m.id === selectedMode)?.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full hover:bg-blue-500/30 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 mb-6 pr-2">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'mediva-gradient text-white'
                      : 'glass border border-gray-600/30 text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.type === 'ai' && (
                      <div className="w-6 h-6 mediva-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">✦</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="leading-relaxed">{message.content}</p>
                      
                      {/* Patient Context */}
                      {message.patientContext && (
                        <div className="mt-3 pt-3 border-t border-gray-600/30">
                          <p className="text-xs text-blue-300 mb-1">Patient Context:</p>
                          <p className="text-sm text-gray-300">{message.patientContext.patientName}</p>
                        </div>
                      )}
                      
                      {/* Differential Diagnosis */}
                      {message.differential && message.differential.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-600/30">
                          <p className="text-xs text-gray-400 mb-3">Differential Diagnosis:</p>
                          <div className="space-y-3">
                            {message.differential.map((dx, index) => (
                              <div key={index} className="p-3 bg-black/20 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{dx.condition}</h4>
                                  <span className={`text-sm font-medium ${
                                    dx.probability > 30 ? 'text-red-400' :
                                    dx.probability > 20 ? 'text-yellow-400' :
                                    'text-green-400'
                                  }`}>
                                    {dx.probability}%
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{dx.reasoning}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Drug Interactions */}
                      {message.drugInteractions && message.drugInteractions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-600/30">
                          <p className="text-xs text-gray-400 mb-3">Drug Interactions:</p>
                          <div className="space-y-2">
                            {message.drugInteractions.map((interaction, index) => (
                              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                                interaction.severity === 'severe' ? 'border-red-500 bg-red-500/10' :
                                interaction.severity === 'moderate' ? 'border-yellow-500 bg-yellow-500/10' :
                                'border-green-500 bg-green-500/10'
                              }`}>
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-white">
                                    {interaction.drug1} + {interaction.drug2}
                                  </p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    interaction.severity === 'severe' ? 'bg-red-500/20 text-red-300' :
                                    interaction.severity === 'moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-green-500/20 text-green-300'
                                  }`}>
                                    {interaction.severity.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{interaction.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Treatment Guidelines */}
                      {message.guidelines && message.guidelines.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-600/30">
                          <p className="text-xs text-gray-400 mb-3">Treatment Guidelines:</p>
                          <div className="space-y-2">
                            {message.guidelines.map((guideline, index) => (
                              <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="flex items-start justify-between mb-1">
                                  <p className="font-semibold text-green-300">{guideline.organization}</p>
                                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                                    {guideline.evidenceLevel}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{guideline.recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-600/30">
                          <p className="text-xs text-gray-400 mb-2">Sources:</p>
                          {message.sources.map((source, index) => (
                            <div key={index} className="text-xs p-2 bg-black/20 rounded-lg mb-1">
                              <div className="flex items-center justify-between">
                                <span className="text-blue-300 font-medium">{source.title}</span>
                                <span className="text-green-400">{source.relevance}% relevant</span>
                              </div>
                              <p className="text-gray-400 mt-1">{source.journal} ({source.year})</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Confidence Score */}
                      {message.confidence && (
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-600/30">
                          <div className="text-xs text-gray-500 mono-text">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Confidence:</span>
                            <span className={`text-xs font-medium ${
                              message.confidence >= 95 ? 'text-green-400' :
                              message.confidence >= 85 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {message.confidence}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass border border-gray-600/30 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 mediva-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✦</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">Analyzing clinical data...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask about ${chatModes.find(m => m.id === selectedMode)?.name.toLowerCase()}...`}
              className="flex-1 input"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="btn-primary px-4 py-3"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 animate-slide-up">
          {/* Patient Context */}
          <div className="card p-6">
            <h3 className="heading-small text-white mb-4">Patient Context</h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedPatient(null)}
                className={`w-full p-3 rounded-xl text-left transition-colors ${
                  !selectedPatient ? 'mediva-gradient text-white' : 'glass hover:bg-white/5'
                }`}
              >
                <p className="font-medium text-white">General Clinical Query</p>
                <p className="text-sm text-gray-400">No specific patient context</p>
              </button>
              
              {mockPatients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`w-full p-3 rounded-xl text-left transition-colors ${
                    selectedPatient === patient.id ? 'mediva-gradient text-white' : 'glass hover:bg-white/5'
                  }`}
                >
                  <p className="font-medium text-white">{patient.name}</p>
                  <p className="text-sm text-gray-400">Age {patient.age} • {patient.condition}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Clinical Tools */}
          <div className="card p-6">
            <h3 className="heading-small text-white mb-4">Clinical Tools</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary text-sm p-3">
                <BeakerIcon className="w-4 h-4 mr-2" />
                Drug Calculator
              </button>
              <button className="w-full btn-secondary text-sm p-3">
                <HeartIcon className="w-4 h-4 mr-2" />
                Risk Calculators
              </button>
              <button className="w-full btn-secondary text-sm p-3">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Clinical Protocols
              </button>
              <button className="w-full btn-secondary text-sm p-3">
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                Medical Literature
              </button>
            </div>
          </div>

          {/* Recent Queries */}
          <div className="card p-6">
            <h3 className="heading-small text-white mb-4">Recent Queries</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left p-2 glass rounded hover:bg-white/5 transition-colors">
                <p className="text-white truncate">ACE inhibitor dosing in CKD</p>
                <p className="text-gray-400 text-xs">2 hours ago</p>
              </button>
              <button className="w-full text-left p-2 glass rounded hover:bg-white/5 transition-colors">
                <p className="text-white truncate">Warfarin bridging protocols</p>
                <p className="text-gray-400 text-xs">Yesterday</p>
              </button>
              <button className="w-full text-left p-2 glass rounded hover:bg-white/5 transition-colors">
                <p className="text-white truncate">Sepsis management guidelines</p>
                <p className="text-gray-400 text-xs">2 days ago</p>
              </button>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="card p-4 border border-yellow-500/30 bg-yellow-500/10">
            <div className="flex items-start space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-yellow-300 font-semibold text-sm mb-1">Clinical AI Assistant</h4>
                <p className="text-yellow-200 text-xs leading-relaxed">
                  This AI provides clinical decision support based on current medical literature. 
                  Always verify information and use clinical judgment. Not a substitute for professional medical consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 