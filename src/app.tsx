import React, { useState } from 'react';
import { BookOpen, BarChart3, FileSearch, GraduationCap } from 'lucide-react';
import  LiteratureAgent  from './views/LiteratureAgent';
import { StatisticsAgent } from './views/StatisticsAgent';
import { ReviewerAgent } from './views/ReviewerAgent';

type Tab = 'literature' | 'statistics' | 'reviewer';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('literature');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-academic-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Academic Research Agent</h1>
              <p className="text-xs text-slate-500">University Project v1.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-slate-500">
            <span>Status: <span className="text-green-600 font-medium">Online</span></span>
            <span>Version: <span className="text-slate-900 font-medium">1.0.4 (Beta)</span></span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('literature')}
            className={`flex items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
              activeTab === 'literature'
                ? 'bg-white border-academic-500 shadow-md shadow-academic-500/10 ring-1 ring-academic-500'
                : 'bg-white border-slate-200 text-slate-600 hover:border-academic-300 hover:bg-slate-50'
            }`}
          >
            <BookOpen className={`w-5 h-5 mr-3 ${activeTab === 'literature' ? 'text-academic-600' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className={`font-semibold ${activeTab === 'literature' ? 'text-academic-900' : 'text-slate-700'}`}>Literature</div>
              <div className="text-xs text-slate-500">LaTeX Extraction</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
              activeTab === 'statistics'
                ? 'bg-white border-academic-500 shadow-md shadow-academic-500/10 ring-1 ring-academic-500'
                : 'bg-white border-slate-200 text-slate-600 hover:border-academic-300 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className={`w-5 h-5 mr-3 ${activeTab === 'statistics' ? 'text-academic-600' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className={`font-semibold ${activeTab === 'statistics' ? 'text-academic-900' : 'text-slate-700'}`}>Statistics</div>
              <div className="text-xs text-slate-500">Data & p-values</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('reviewer')}
            className={`flex items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
              activeTab === 'reviewer'
                ? 'bg-white border-academic-500 shadow-md shadow-academic-500/10 ring-1 ring-academic-500'
                : 'bg-white border-slate-200 text-slate-600 hover:border-academic-300 hover:bg-slate-50'
            }`}
          >
            <FileSearch className={`w-5 h-5 mr-3 ${activeTab === 'reviewer' ? 'text-academic-600' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className={`font-semibold ${activeTab === 'reviewer' ? 'text-academic-900' : 'text-slate-700'}`}>Reviewer</div>
              <div className="text-xs text-slate-500">Abstract Pre-check</div>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="transition-opacity duration-300 ease-in-out">
          {activeTab === 'literature' && <LiteratureAgent />}
          {activeTab === 'statistics' && <StatisticsAgent />}
          {activeTab === 'reviewer' && <ReviewerAgent />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2024 Academic Research Systems. All rights reserved.</p>
          <p className="mt-1 text-xs text-slate-400">System generated via React/TypeScript Simulation.</p>
        </div>
      </footer>
    </div>
  );
}