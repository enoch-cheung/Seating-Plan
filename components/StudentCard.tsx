import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student | null;
  seatNumber: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  student, 
  seatNumber,
  onDragStart,
  onDrop,
  onDragOver
}) => {
  if (!student) {
    return (
      <div 
        className="h-full w-full min-h-[75px] bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 text-sm cursor-move transition-all hover:bg-slate-100 hover:border-slate-300"
        draggable
        onDragStart={(e) => onDragStart(e, seatNumber)}
        onDrop={(e) => onDrop(e, seatNumber)}
        onDragOver={onDragOver}
      >
        <span className="pointer-events-none font-medium">Empty</span>
      </div>
    );
  }

  // Determine colors based on gender with more refined palette
  // Boys (M): Using darker blues for text as requested
  const cardStyles = student.gender === 'M' 
    ? 'bg-sky-50 border-sky-200 hover:border-sky-400 hover:shadow-sky-100' 
    : student.gender === 'F' 
      ? 'bg-rose-50 border-rose-200 hover:border-rose-400 hover:shadow-rose-100' 
      : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-indigo-100';

  const badgeStyles = student.gender === 'M'
    ? 'bg-sky-100 text-blue-800' 
    : student.gender === 'F'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-slate-100 text-slate-700';

  // "English blue words darker" -> darkened from sky-600 to blue-700/900
  const textColor = student.gender === 'M' ? 'text-blue-900' : student.gender === 'F' ? 'text-rose-900' : 'text-slate-900';
  const subTextColor = student.gender === 'M' ? 'text-blue-700' : student.gender === 'F' ? 'text-rose-600' : 'text-slate-500';

  return (
    <div 
      className={`relative h-full w-full min-h-[75px] border rounded-lg shadow-sm p-2 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-move hover:-translate-y-1 hover:shadow-md select-none ${cardStyles}`}
      draggable
      onDragStart={(e) => onDragStart(e, seatNumber)}
      onDrop={(e) => onDrop(e, seatNumber)}
      onDragOver={onDragOver}
    >
      <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center absolute top-1 left-1 ${badgeStyles}`}>
        {student.classNo}
      </div>
      
      <div className="mt-3 w-full px-1">
        {/* Increased font sizes: text-xl for Chi, text-lg for Eng (was text-sm) */}
        <div className={`text-xl font-bold leading-tight ${textColor} pointer-events-none truncate w-full`}>
          {student.nameChi}
        </div>
        <div className={`text-lg font-bold ${subTextColor} pointer-events-none mt-0.5 truncate w-full`}>
          {student.nameEng}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;