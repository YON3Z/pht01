import React, { useState, useEffect, useRef } from 'react';
import { Sigma, BookOpen, Play, Pause, Download, RotateCcw, FileText } from 'lucide-react';
import { ExperimentMode, PhysicsParams, SimulationData } from './types';
import { PhysicsKernel } from './services/physicsEngine';
import { Sidebar } from './components/Sidebar';
import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';
import { Manual } from './components/Manual';

export default function App() {
  const [activeMode, setActiveMode] = useState<ExperimentMode>('A');
  const [isRunning, setIsRunning] = useState(false);
  const [showTheory, setShowTheory] = useState(true);
  const [showManual, setShowManual] = useState(false);
  
  const [data, setData] = useState<SimulationData[]>([]);
  const startTimeRef = useRef(Date.now());
  
  const [params, setParams] = useState<PhysicsParams>({
    // Exp A
    propofol: 0,
    temperature: 310,
    // Exp B
    gravity: 1.0,
    isolation: 50,
    // Exp C
    frequency: 1.0,
    noiseFloor: 0.2,
    // Exp D
    microDose: 0,
    doseFreq: 0.33
  });

  // Ref to hold current params for the animation loop
  // This avoids re-creating the loop on every slider change
  const paramsRef = useRef(params);
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  // Handle switching modes
  const handleModeChange = (mode: ExperimentMode) => {
    setActiveMode(mode);
    setData([]); // Clear data on mode switch
    setIsRunning(false); // Stop simulation
    startTimeRef.current = Date.now(); // Reset time base
  };

  const handleReset = () => {
    setData([]);
    setIsRunning(false);
    startTimeRef.current = Date.now();
  };

  // Export Data to CSV
  const handleExportData = () => {
    if (data.length === 0) return;

    const headers = ['Timestamp (s)', 'Value', 'Noise', 'Threshold'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => `${row.time.toFixed(3)},${row.value},${row.noise},${row.threshold}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `coherence_lab_${activeMode}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulation Loop
  useEffect(() => {
    let frameId: number;
    
    const simulate = () => {
      if (!isRunning) return;
      
      // Calculate relative time in seconds
      const timestamp = (Date.now() - startTimeRef.current) / 1000;
      const newPoint = PhysicsKernel.tick(timestamp, activeMode, paramsRef.current);
      
      setData(prev => {
        const newData = [...prev, newPoint];
        // Keep last 100 points for a smooth scrolling window
        return newData.slice(-100); 
      });

      frameId = requestAnimationFrame(simulate);
    };

    if (isRunning) {
      frameId = requestAnimationFrame(simulate);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isRunning, activeMode]);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-slate-900 font-bold">
              <Sigma className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">Coherence<span className="text-cyan-400">Protocol</span> Lab</span>
            <span className="font-bold text-lg tracking-tight sm:hidden">C<span className="text-cyan-400">P</span> Lab</span>
          </div>
          
          <div className="hidden lg:flex items-center bg-slate-800 rounded-lg p-1 overflow-x-auto">
            {(['A', 'B', 'C', 'D'] as ExperimentMode[]).map((mode) => (
              <button 
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  activeMode === mode 
                    ? mode === 'A' ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25' 
                      : mode === 'B' ? 'bg-orange-500 text-slate-900 shadow-lg shadow-orange-500/25'
                      : mode === 'C' ? 'bg-pink-500 text-slate-900 shadow-lg shadow-pink-500/25'
                      : 'bg-indigo-500 text-slate-900 shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'A' ? 'Exp A: Superradiance' : mode === 'B' ? 'Exp B: Gravity' : mode === 'C' ? 'Exp C: Entrainment' : 'Exp D: Microdosing'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowManual(true)}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2"
              title="Open Field Manual"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold">MANUAL</span>
            </button>

            <button 
              onClick={() => setShowTheory(!showTheory)}
              className={`p-2 rounded-lg border transition-all ${showTheory ? 'bg-slate-700 border-slate-600 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
              title="Toggle Theory Log"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE/TABLET NAV */}
      <div className="lg:hidden p-4 bg-slate-900 border-b border-slate-800 flex justify-between gap-2 overflow-x-auto no-scrollbar">
         {(['A', 'B', 'C', 'D'] as ExperimentMode[]).map((mode) => (
            <button 
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-bold transition-all flex-shrink-0 ${
                activeMode === mode 
                ? 'bg-slate-700 text-white border border-slate-600' 
                : 'text-slate-500 bg-slate-800 border border-transparent'
              }`}
            >
              {mode}
            </button>
          ))}
      </div>

      {/* MAIN CONTENT */}
      <main className={`flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 pb-20 transition-all duration-300 ${showTheory ? 'lg:pr-80' : ''}`}>
        
        {/* GLOBAL CONTROLS */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold mb-2">
              {activeMode === 'A' && "Experiment A: Anesthetic Inhibition"}
              {activeMode === 'B' && "Experiment B: Gravitational Decoherence"}
              {activeMode === 'C' && "Experiment C: Bio-Magnetic Entrainment"}
              {activeMode === 'D' && "Experiment D: Neuroplasticity Modulation"}
            </h1>
            <p className="text-slate-400 max-w-2xl text-xs sm:text-base">
              {activeMode === 'A' && "Testing the hypothesis that consciousness requires collective superradiance in Tryptophan networks."}
              {activeMode === 'B' && "Isolating the Gravitational Self-Energy (E_G) term by removing thermal and seismic noise."}
              {activeMode === 'C' && "Validating the 'Cardiac Binary' entrainment via Earth-Ionosphere resonance frequencies."}
              {activeMode === 'D' && "Modeling the effects of sub-perceptual psilocybin doses on neural network plasticity and coherence."}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <button 
              onClick={handleReset}
              className="p-3 rounded-xl font-bold border bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-white transition-all"
              title="Reset Simulation"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button 
              onClick={handleExportData}
              disabled={data.length === 0}
              className={`p-3 rounded-xl font-bold border transition-all ${
                data.length > 0
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
              title="Export CSV"
            >
              <Download className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                isRunning 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20' 
                  : 'bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'PAUSE' : 'START'}
            </button>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* VISUALIZATION PANEL */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl h-[350px] sm:h-[400px] lg:h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">Real-Time Data Stream</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                <span className="text-xs text-slate-500 font-mono">{isRunning ? 'LIVE' : 'OFFLINE'}</span>
              </div>
            </div>
            
            <Visualizer 
              data={data} 
              mode={activeMode} 
              isRunning={isRunning} 
            />
          </div>

          {/* CONTROL PANEL */}
          <div className="lg:col-span-4">
             <Controls 
               mode={activeMode} 
               params={params} 
               setParams={setParams} 
               currentValue={data.length > 0 ? data[data.length - 1].value : 0} 
             />
          </div>
        </div>

        <Sidebar 
          activeMode={activeMode} 
          isOpen={showTheory} 
          onClose={() => setShowTheory(false)} 
        />
        
        <Manual 
          isOpen={showManual}
          onClose={() => setShowManual(false)}
        />
        
      </main>
    </div>
  );
}