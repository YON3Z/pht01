import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { ExperimentMode, SimulationData } from '../types';

interface VisualizerProps {
  data: SimulationData[];
  mode: ExperimentMode;
  isRunning: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ data, mode, isRunning }) => {
  return (
    <div className="flex-1 w-full bg-slate-950/50 rounded-xl border border-slate-800 relative overflow-hidden h-full">
      <ResponsiveContainer width="100%" height="100%">
        {mode === 'A' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(val) => `${val.toFixed(1)}s`}
              stroke="#475569" 
              minTickGap={20}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis domain={[0.8, 2.2]} stroke="#475569" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }} 
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: number) => [value.toFixed(3), 'Value']}
              labelFormatter={(label) => `${Number(label).toFixed(2)}s`}
            />
            <ReferenceLine y={1.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Poissonian (Random)", fill: "#ef4444", fontSize: 12 }} />
            <ReferenceLine y={2.0} stroke="#22c55e" strokeDasharray="3 3" label={{ value: "Superradiant (Coherent)", fill: "#22c55e", fontSize: 12 }} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#22d3ee" 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false} 
            />
          </LineChart>
        ) : mode === 'B' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTau" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(val) => `${val.toFixed(1)}s`}
              stroke="#475569" 
              minTickGap={20}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis stroke="#475569" label={{ value: 'Coherence Time (ms)', angle: -90, position: 'insideLeft', fill: '#475569' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: number) => [value.toFixed(1) + 'ms', 'Collapse Time']}
              labelFormatter={(label) => `${Number(label).toFixed(2)}s`}
            />
            <ReferenceLine y={500} stroke="#22c55e" label={{ value: "Libet Window (0.5s)", fill: "#22c55e", fontSize: 12 }} strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#f97316" 
              fill="url(#colorTau)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        ) : mode === 'C' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(val) => `${val.toFixed(1)}s`}
              stroke="#475569" 
              minTickGap={20}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis domain={[0, 100]} stroke="#475569" label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft', fill: '#475569' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: number) => [value.toFixed(1), 'HRV Score']}
              labelFormatter={(label) => `${Number(label).toFixed(2)}s`}
            />
             <ReferenceLine y={80} stroke="#22c55e" label={{ value: "Coherence Threshold", fill: "#22c55e", fontSize: 12 }} strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ec4899" 
              fill="url(#colorHrv)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPlast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(val) => `${val.toFixed(1)}s`}
              stroke="#475569" 
              minTickGap={20}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis domain={[0, 3]} stroke="#475569" label={{ value: 'Plasticity Index', angle: -90, position: 'insideLeft', fill: '#475569' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: number) => [value.toFixed(2), 'Plasticity']}
              labelFormatter={(label) => `${Number(label).toFixed(2)}s`}
            />
             <ReferenceLine y={1.0} stroke="#94a3b8" label={{ value: "Baseline", fill: "#94a3b8", fontSize: 12 }} strokeDasharray="3 3" />
             <ReferenceLine y={1.5} stroke="#22c55e" label={{ value: "Enhanced", fill: "#22c55e", fontSize: 12 }} strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#6366f1" 
              fill="url(#colorPlast)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};