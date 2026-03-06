import React from "react";

interface CoursePreviewModalProps {
  courseId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function CoursePreviewModal({ courseId, isOpen, onClose }: CoursePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Course Preview</h2>
        <p>Preview for course ID: {courseId}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CoursePreviewModal;
