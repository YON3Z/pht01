import React from 'react';
import { Settings, Zap, Scale, Waves, Sprout } from 'lucide-react';
import { ExperimentMode, PhysicsParams } from '../types';

interface ControlsProps {
  mode: ExperimentMode;
  params: PhysicsParams;
  setParams: React.Dispatch<React.SetStateAction<PhysicsParams>>;
  currentValue: number;
}

export const Controls: React.FC<ControlsProps> = ({ mode, params, setParams, currentValue }) => {
  const updateParam = (key: keyof PhysicsParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const getSystemState = () => {
    if (mode === 'A') return currentValue > 1.5 ? "COHERENT" : "DECOHERENT";
    if (mode === 'B') return currentValue > 250 ? "PENROSE LIMIT" : "THERMAL NOISE";
    if (mode === 'C') return Math.abs(params.frequency - 7.83) < 0.5 ? "PHASE LOCKED" : "DRIFTING";
    if (mode === 'D') return currentValue > 1.8 ? "OPTIMIZED PLASTICITY" : "BASELINE";
    return "UNKNOWN";
  };

  return (
    <div className="space-y-6">
      {/* PARAMETER CARD */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-6 flex items-center gap-2">
          <Settings className="w-4 h-4" /> System Parameters
        </h3>

        {mode === 'A' && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-cyan-200">Propofol ({params.propofol} μM)</label>
                <span className="text-xs text-slate-500">EC50 ≈ 50μM</span>
              </div>
              <input 
                type="range" min="0" max="100" value={params.propofol} 
                onChange={(e) => updateParam('propofol', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Temp ({params.temperature} K)</label>
                <span className="text-xs text-slate-500">Body = 310K</span>
              </div>
              <input 
                type="range" min="0" max="400" value={params.temperature} 
                onChange={(e) => updateParam('temperature', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>
          </div>
        )}

        {mode === 'B' && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-orange-200">Gravity ({params.gravity.toFixed(2)} G)</label>
                <span className="text-xs text-slate-500">Target: 0G</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.01" value={params.gravity} 
                onChange={(e) => updateParam('gravity', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Isolation ({params.isolation} dB)</label>
                <span className="text-xs text-slate-500">Seismic Damping</span>
              </div>
              <input 
                type="range" min="0" max="100" value={params.isolation} 
                onChange={(e) => updateParam('isolation', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>
          </div>
        )}

        {mode === 'C' && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-pink-200">Drive Freq ({params.frequency.toFixed(2)} Hz)</label>
                <span className="text-xs text-slate-500">Target: 7.83Hz</span>
              </div>
              <input 
                type="range" min="1" max="15" step="0.01" value={params.frequency} 
                onChange={(e) => updateParam('frequency', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Stochastic Noise ({params.noiseFloor.toFixed(2)})</label>
                <span className="text-xs text-slate-500">Resonance Width</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" value={params.noiseFloor} 
                onChange={(e) => updateParam('noiseFloor', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>
            <button 
              onClick={() => updateParam('frequency', 7.83)}
              className={`w-full py-2 bg-slate-800 hover:bg-slate-700 border border-pink-500/30 text-pink-300 text-xs font-mono rounded transition-colors ${params.frequency === 7.83 ? 'animate-pulse ring-2 ring-pink-500' : ''}`}
            >
              SNAP TO SCHUMANN (7.83 HZ)
            </button>
          </div>
        )}

        {mode === 'D' && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-indigo-200">Dose ({params.microDose?.toFixed(2)} g)</label>
                <span className="text-xs text-slate-500">Optimal: ~0.2g</span>
              </div>
              <input 
                type="range" min="0" max="5" step="0.1" value={params.microDose} 
                onChange={(e) => updateParam('microDose', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Frequency (Interval)</label>
                <span className="text-xs text-slate-500">Target: Every 3 Days</span>
              </div>
              <input 
                type="range" min="0.1" max="1.0" step="0.05" value={params.doseFreq} 
                onChange={(e) => updateParam('doseFreq', Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                 <span>Weekly</span>
                 <span>Daily</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STATUS CARD */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${mode === 'A' ? 'bg-cyan-500/20 text-cyan-400' : mode === 'B' ? 'bg-orange-500/20 text-orange-400' : mode === 'C' ? 'bg-pink-500/20 text-pink-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
            {mode === 'A' && <Zap className="w-6 h-6" />}
            {mode === 'B' && <Scale className="w-6 h-6" />}
            {mode === 'C' && <Waves className="w-6 h-6" />}
            {mode === 'D' && <Sprout className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">SYSTEM STATE</div>
            <div className="text-xl font-bold text-white">
              {getSystemState()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};