import React from "react";

interface LeadMagnetProps {
  id: string | number;
  title: string;
  description: string;
  thumbnailUrl?: string;
  fileUrl?: string;
  className?: string;
}

export function LeadMagnet({ 
  id,
  title,
  description,
  thumbnailUrl,
  fileUrl,
  className = "" 
}: LeadMagnetProps) {
  return (
    <div className={`lead-magnet ${className}`}>
      <img src={thumbnailUrl} alt={title} className="thumbnail" />
      <div className="content">
        <h4>{title}</h4>
        <p>{description}</p>
        <a href={fileUrl} download className="download-btn">
          Download
        </a>
      </div>
    </div>
  );
}

export default LeadMagnet;
