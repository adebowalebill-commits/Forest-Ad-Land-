import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { PlotData } from '../pages/Explore';

interface MapGridProps {
  plots: PlotData[];
  onSelectPlot: (plot: PlotData) => void;
  selectedPlotId?: string;
}

export default function MapGrid({ plots, onSelectPlot, selectedPlotId }: MapGridProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0a] cursor-grab active:cursor-grabbing relative">
      <TransformWrapper
        initialScale={1}
        minScale={0.3}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
          <div 
            className="grid gap-1 p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm"
            style={{ 
              gridTemplateColumns: 'repeat(20, 60px)', 
              gridTemplateRows: 'repeat(20, 60px)' 
            }}
          >
            {plots.map((plot) => {
              const isSelected = selectedPlotId === plot.id;
              let bgClass = "glow-green hover:bg-green-500/20"; 
              
              if (plot.status === 'owned') {
                bgClass = "glow-amber hover:bg-amber-500/20"; 
              }

              // Randomize animation delay so the map breathes instead of blinking uniformly
              const animDelay = (plot.x * 0.1 + plot.y * 0.1 + Math.random() * 2).toFixed(2);

              return (
                <div
                  key={plot.id}
                  onClick={() => onSelectPlot(plot)}
                  style={{ animationDelay: `${animDelay}s` }}
                  className={`
                    w-[60px] h-[60px] rounded-lg border transition-all duration-300 cursor-pointer overflow-hidden relative
                    ${bgClass}
                    ${isSelected ? 'ring-2 ring-white scale-110 z-10 shadow-2xl brightness-150' : 'hover:scale-105 z-0 hover:z-10 hover:brightness-125'}
                  `}
                >
                  {plot.status === 'available' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                      <span className="text-[10px] font-extrabold text-green-400">BUY</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
