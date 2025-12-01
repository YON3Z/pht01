import React from 'react';
import { BookOpen, X, ExternalLink } from 'lucide-react';
import { ExperimentMode } from '../types';
import { THEORY_DATA } from '../constants';

interface SidebarProps {
  activeMode: ExperimentMode;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMode, isOpen, onClose }) => {
  const info = THEORY_DATA[activeMode];

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-80 bg-slate-900 border-l border-slate-700 p-6 transform transition-transform duration-300 z-20 overflow-y-auto shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" /> Theory Log
        </h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Hypothesis Section */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-cyan-400 font-mono mb-2 tracking-wider">HYPOTHESIS</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {info.hypothesis}
          </p>
        </div>

        {/* Equation Section */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-orange-400 font-mono mb-2 tracking-wider">GOVERNING EQUATION</div>
          <code className="text-sm font-mono text-white block bg-slate-900 p-3 rounded overflow-x-auto border border-slate-800">
            {info.equation}
          </code>
        </div>

        {/* Mechanism Section */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-purple-400 font-mono mb-2 tracking-wider">MECHANISM</div>
          <p className="text-sm text-slate-300">
            {info.mechanism}
          </p>
        </div>

        {/* References Section */}
        <div className="space-y-3">
          <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">Key References</div>
          <div className="space-y-2">
            {info.references.map((ref, idx) => (
              <a 
                key={idx}
                href={ref.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-slate-800/50 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs text-slate-400 italic group-hover:text-slate-200 transition-colors">
                    {ref.text}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 shrink-0 mt-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};