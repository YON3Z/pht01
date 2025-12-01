import React from 'react';
import { X, FileText, Activity, Zap, Radio, Scale, Brain } from 'lucide-react';

interface ManualProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Manual: React.FC<ManualProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Operative Field Manual</h2>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">CoherenceProtocol Lab v2.5</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-slate-900/50">
          
          {/* Section 1: Overview */}
          <section>
            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Protocol Overview
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
              <p className="mb-4">
                The <strong>CoherenceProtocol Lab</strong> is a physics-based simulation suite designed to test the leading theories of Quantum Biology. Unlike standard visualizers, this tool runs <strong>deterministic physics kernels</strong> derived from real-world equations (Kurian 2025, Penrose 1996, McCraty 2025).
              </p>
              <p>
                Each experiment isolates a specific variable—Propofol binding, Gravitational Self-Energy, Schumann Resonance, or Psilocybin affinity—to demonstrate how biological systems might maintain quantum coherence (the "Conscious State") in warm, wet, and noisy environments.
              </p>
            </div>
          </section>

          {/* Section 2: Experiment Guides */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* Exp A */}
            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-cyan-300 font-bold">
                <Zap className="w-4 h-4" /> Exp A: Superradiance
              </div>
              <p className="text-xs text-slate-400 mb-3">
                <strong>Goal:</strong> Maintain g² > 1.0 (Coherent State).
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>Propofol (Slider):</strong> Anesthetic that disrupts hydrophobic pockets in microtubules. Increasing this destroys coherence (g² drops to 1.0).</li>
                <li><strong>Temperature:</strong> Thermal noise competes with cooperative effects. Higher temps degrade the signal.</li>
                <li><strong>The Drop:</strong> Watch for the sharp phase transition around ~50μM. This mimics the "lights out" moment in surgery.</li>
              </ul>
            </div>

            {/* Exp B */}
            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-orange-300 font-bold">
                <Scale className="w-4 h-4" /> Exp B: Gravity
              </div>
              <p className="text-xs text-slate-400 mb-3">
                <strong>Goal:</strong> Reduce Decoherence Time (τ) to ~25ms.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>Gravity (G):</strong> Controls the Gravitational Self-Energy (E_G). Lower gravity (Space) theoretically prevents collapse (Hyper-computation state).</li>
                <li><strong>Isolation:</strong> Removes seismic noise that mimics gravity. 100dB isolation is needed for pure quantum states.</li>
                <li><strong>Orch-OR:</strong> We are looking for the sweet spot where biology <i>uses</i> gravity to collapse the wavefunction deliberately.</li>
              </ul>
            </div>

            {/* Exp C */}
            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-pink-300 font-bold">
                <Radio className="w-4 h-4" /> Exp C: Entrainment
              </div>
              <p className="text-xs text-slate-400 mb-3">
                <strong>Goal:</strong> Lock internal frequency to 7.83 Hz.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>Drive Freq:</strong> The external field frequency. Align this to Earth's Schumann Resonance (7.83Hz) for max effect.</li>
                <li><strong>Noise Floor:</strong> Counter-intuitively, a little noise <i>helps</i> alignment via Stochastic Resonance.</li>
                <li><strong>CISS Effect:</strong> Chiral Induced Spin Selectivity boosts the signal efficiency in the alpha band (1-12Hz).</li>
              </ul>
            </div>

             {/* Exp D */}
             <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-indigo-300 font-bold">
                <Brain className="w-4 h-4" /> Exp D: Microdosing
              </div>
              <p className="text-xs text-slate-400 mb-3">
                <strong>Goal:</strong> Optimize Plasticity Index (> 1.5).
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>Dose:</strong> Follows an inverted-U curve. Too little does nothing; too much creates chaos (entropy). The sweet spot is ~0.1-0.3g.</li>
                <li><strong>Frequency:</strong> Receptors downregulate quickly. Spacing doses (every 3 days) maintains sensitivity. Daily dosing kills the effect.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Interpreting Data */}
          <section>
             <h3 className="text-lg font-bold text-slate-200 mb-4">Interpreting the Data Stream</h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="text-xs font-mono text-cyan-500 mb-2">g(2) Function</div>
                    <p className="text-xs text-slate-400">
                        Measures photon statistics. <br/>
                        <strong>2.0</strong> = Superradiant (Quantum/Bunched). <br/>
                        <strong>1.0</strong> = Poissonian (Classical/Random). <br/>
                        Consciousness requires > 1.0.
                    </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="text-xs font-mono text-orange-500 mb-2">Decoherence Time (τ)</div>
                    <p className="text-xs text-slate-400">
                        How long a quantum state lasts. <br/>
                        <strong>Longer</strong> = More computation time. <br/>
                        <strong>Shorter</strong> = Faster updates. <br/>
                        Human moment of thought ≈ 25ms - 500ms.
                    </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="text-xs font-mono text-pink-500 mb-2">HRV & Resonance</div>
                    <p className="text-xs text-slate-400">
                        Coherence score (0-100). <br/>
                        High scores indicate the biological oscillator is phase-locked with the environmental driver (Earth).
                    </p>
                </div>
             </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-600">
            Simulations are phenomenological approximations based on current 2024-2025 preprints. 
            Do not use for medical advice. 
            <span className="block mt-1 text-slate-700">Built for the Global Consciousness Project II.</span>
          </p>
        </div>
      </div>
    </div>
  );
};