import React from "react";

interface FreelancerDocument {
  id: string | number;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

interface FreelancerStudentDocumentsTabProps {
  studentId?: string | number;
  documents?: FreelancerDocument[];
  requiredDocTypes?: string[];
  onUploadClick?: (docType: string, docId?: number) => void;
  onDeleteClick?: (docId: number, docType: string) => void;
  className?: string;
}

export function FreelancerStudentDocumentsTab({ 
  studentId,
  documents = [],
  requiredDocTypes = [],
  onUploadClick,
  onDeleteClick,
  className = "" 
}: FreelancerStudentDocumentsTabProps) {
  return (
    <div className={`freelancer-student-documents-tab ${className}`}>
      <h4>Student Documents</h4>
      <div className="documents-list">
        {documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <ul>
            {documents.map((doc) => (
              <li key={doc.id} className="document-item">
                <span>{doc.name}</span>
                <span className="document-type">({doc.type})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FreelancerStudentDocumentsTab;
