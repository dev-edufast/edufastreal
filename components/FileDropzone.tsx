import React from "react";

interface FileDropzoneProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function FileDropzone({ 
  onFilesSelected,
  accept = "*",
  maxFiles = 5,
  maxSize,
  disabled = false,
  className = "" 
}: FileDropzoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected?.(files.slice(0, maxFiles));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onFilesSelected?.(files.slice(0, maxFiles));
    }
  };

  return (
    <div 
      className={`file-dropzone ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input 
        type="file" 
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleFileInput}
        disabled={disabled}
        className="file-input"
      />
      <p>Drag and drop files here, or click to select</p>
    </div>
  );
}

export default FileDropzone;
