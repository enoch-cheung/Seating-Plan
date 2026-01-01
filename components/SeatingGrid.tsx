import React from 'react';
import { Student, LayoutConfig } from '../types';
import StudentCard from './StudentCard';

interface SeatingGridProps {
  gridData: (Student | null)[];
  config: LayoutConfig;
  onSwapSeats: (fromIndex: number, toIndex: number) => void;
}

const SeatingGrid: React.FC<SeatingGridProps> = ({ gridData, config, onSwapSeats }) => {
  // Calculate grid styles
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${config.columns}, minmax(90px, 1fr))`,
    gap: '0.5rem',
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndexStr = e.dataTransfer.getData('text/plain');
    if (!fromIndexStr) return;
    
    const fromIndex = parseInt(fromIndexStr, 10);
    if (isNaN(fromIndex) || fromIndex === toIndex) return;

    onSwapSeats(fromIndex, toIndex);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Grid Container */}
      <div className="w-full overflow-x-auto p-4 bg-slate-100/50 rounded-2xl border border-slate-200 mb-6 shadow-inner">
        <div style={gridStyle} className="min-w-fit mx-auto">
          {gridData.map((student, index) => {
            return (
              <div 
                key={`${student?.id || 'empty'}-${index}`} 
                className="relative group"
              >
                <StudentCard 
                  student={student} 
                  seatNumber={index}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Blackboard Area - Compact Visuals */}
      <div className="w-full max-w-2xl flex flex-col items-center perspective-[1000px]">
        <div className="relative w-4/5 h-12 bg-[#2d3a2e] rounded shadow-[0_5px_15px_-5px_rgba(0,0,0,0.4)] border-[4px] border-[#8d6e63] flex items-center justify-center overflow-hidden">
          {/* Chalk dust effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-orchid.png')] opacity-20"></div>
          
          <span className="relative text-white/90 font-serif text-lg tracking-[0.2em] font-bold drop-shadow-md z-10">
            BLACKBOARD
          </span>
        </div>
        
        <div className="mt-2 text-slate-400 text-[10px] font-semibold tracking-widest uppercase">
          Front of Classroom
        </div>
      </div>
      
    </div>
  );
};

export default SeatingGrid;