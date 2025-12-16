import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { checkWordCount } from '../lib/utils';
import { FileSearch, CheckCircle, XCircle } from 'lucide-react';

export const ReviewerAgent: React.FC = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<{ count: number; valid: boolean; message: string } | null>(null);

  const handleCheck = () => {
    const result = checkWordCount(text);
    setStatus(result);
  };
  
  // Real-time update for word count, but validation on click (as per typical workflow)
  const currentCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="space-y-6">
      <Card 
        title="Reviewer Pre-check Agent" 
        description="Validates abstract length compliance (150-250 words) before submission."
      >
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">Abstract Text</label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setStatus(null); // Reset status on edit
              }}
              className="w-full h-56 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-academic-500 focus:border-transparent text-sm leading-relaxed resize-y"
              placeholder="Paste your abstract here for verification..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium bg-white/80 px-2 py-1 rounded">
              {text ? currentCount : 0} words
            </div>
          </div>
          
          <div className="flex justify-between items-center">
             <div className="text-sm text-slate-500">
               Target range: <span className="font-semibold text-slate-700">150 - 250 words</span>
             </div>
            <Button onClick={handleCheck} disabled={!text.trim()}>
              <FileSearch className="w-4 h-4 mr-2" />
              Check Compliance
            </Button>
          </div>
        </div>
      </Card>

      {status && (
        <Card className={`animate-fade-in border-l-4 ${status.valid ? 'border-l-green-500' : 'border-l-red-500'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${status.valid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {status.valid ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>
            <div>
              <h3 className={`text-lg font-bold ${status.valid ? 'text-green-700' : 'text-red-700'}`}>
                {status.valid ? "Compliance Passed" : "Compliance Failed"}
              </h3>
              <p className="text-slate-700 font-medium">
                {status.message}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};