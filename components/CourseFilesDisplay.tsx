import React from "react";

interface CourseFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedAt: string;
}

interface CourseFilesDisplayProps {
  files?: CourseFile[];
  isLoading?: boolean;
  className?: string;
  courseId?: string | number;
  courseTitle?: string;
}

export function CourseFilesDisplay({ 
  files, 
  isLoading, 
  className = "",
  courseId,
  courseTitle
}: CourseFilesDisplayProps) {
  if (isLoading) {
    return <div className={`course-files-loading ${className}`}>Loading files...</div>;
  }

  if (!files || files.length === 0) {
    return <div className={`course-files-empty ${className}`}>No files available</div>;
  }

  return (
    <div className={`course-files-display ${className}`}>
      <h3>Course Materials</h3>
      <ul className="files-list">
        {files.map((file) => (
          <li key={file.id} className="file-item">
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-link">
              <span className="file-icon">📄</span>
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-meta">{file.type} • {file.size}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseFilesDisplay;
