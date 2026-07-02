import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import MapGrid from '../components/MapGrid';
import PlotDetailsPanel from '../components/PlotDetailsPanel';
import { api } from '../lib/api';

export interface PlotData {
  id: string;
  x: number;
  y: number;
  status: 'available' | 'owned';
  owner?: string;
  price?: number;
}

export default function Explore() {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [plots, setPlots] = useState<PlotData[]>([]);

  const fetchPlots = useCallback(() => {
    // Generate base 20x20 grid of available plots
    const baseGrid: PlotData[] = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        baseGrid.push({ id: `temp-${x}-${y}`, x, y, status: 'available', price: 10 });
      }
    }

    // Fetch live properties and merge
    api.getProperties()
      .then((liveProperties: any[]) => {
        const mergedGrid = [...baseGrid];
        liveProperties.forEach(lp => {
          const index = mergedGrid.findIndex(p => p.x === lp.x_coord && p.y === lp.y_coord);
          if (index !== -1) {
            mergedGrid[index] = {
              id: lp.property_id,
              x: lp.x_coord,
              y: lp.y_coord,
              status: lp.status.toLowerCase() === 'owned' ? 'owned' : 'available',
              owner: lp.users?.wallet_address
            };
          }
        });
        setPlots(mergedGrid);
        
        // If a plot is currently selected, update its state in the panel too
        if (selectedPlot) {
           const updatedSelected = mergedGrid.find(p => p.x === selectedPlot.x && p.y === selectedPlot.y);
           if (updatedSelected) setSelectedPlot(updatedSelected);
        }
      })
      .catch(err => {
        console.error('Failed to fetch live properties, falling back to empty grid.', err);
        setPlots(baseGrid);
      });
  }, [selectedPlot]);

  useEffect(() => {
    fetchPlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-darkbg h-screen w-screen overflow-hidden font-sans selection:bg-primary/20 flex flex-col relative">
      <Navbar />
      
      {/* Map Area */}
      <main className="flex-grow w-full h-full relative z-0">
        <MapGrid plots={plots} onSelectPlot={setSelectedPlot} selectedPlotId={selectedPlot?.id} />
      </main>

      {/* Slide-over UI Panel */}
      <PlotDetailsPanel 
        plot={selectedPlot} 
        onClose={() => setSelectedPlot(null)} 
        onPlotUpdated={fetchPlots}
      />
    </div>
  );
}
