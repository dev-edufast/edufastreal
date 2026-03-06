import React from "react";

interface Program {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  [key: string]: any;
}

interface ProgramListItemProps {
  program: Program;
  onBrochureClick?: (program: Program) => void;
  className?: string;
}

export function ProgramListItem({ program, onBrochureClick, className = "" }: ProgramListItemProps) {
  return (
    <div className={`program-list-item ${className}`}>
      <h3>{program.title}</h3>
      <p>{program.description}</p>
      {onBrochureClick && (
        <button onClick={() => onBrochureClick(program)}>
          Download Brochure
        </button>
      )}
    </div>
  );
}

export default ProgramListItem;
