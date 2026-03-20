import React from "react";

interface FreelancerStudent {
  id: string | number;
  fullName: string;
  email: string;
  mobileNumber?: string;
  status?: string;
  admissionStage?: string;
  lastQualification?: string;
}

interface FreelancerStudentDetailProps {
  student?: FreelancerStudent;
  studentId?: string | number;
  onEdit?: () => void;
  onBack?: () => void;
  className?: string;
}

export function FreelancerStudentDetail({
  student,
  studentId,
  onEdit,
  onBack,
  className = ""
}: FreelancerStudentDetailProps) {
  // Mock student data if only studentId is provided
  const displayStudent = student || (studentId ? {
    id: studentId,
    fullName: "Student " + studentId,
    email: "student" + studentId + "@example.com",
    status: "active",
    admissionStage: "Admission Confirmed"
  } : null);

  if (!displayStudent) {
    return (
      <div className={`freelancer-student-detail ${className}`}>
        <p>No student selected.</p>
      </div>
    );
  }

  // Use displayStudent for all references
  const s = displayStudent;

  return (
    <div className={`freelancer-student-detail ${className}`}>
      <div className="detail-header">
        {onBack && (
          <button onClick={onBack} className="back-btn">
            Back
          </button>
        )}
        <h3>{s.fullName}</h3>
        {onEdit && (
          <button onClick={onEdit} className="edit-btn">
            Edit
          </button>
        )}
      </div>
      
      <div className="student-details">
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{s.email}</span>
        </div>
        {s.mobileNumber && (
          <div className="detail-row">
            <span className="label">Phone:</span>
            <span className="value">{s.mobileNumber}</span>
          </div>
        )}
        {s.lastQualification && (
          <div className="detail-row">
            <span className="label">Qualification:</span>
            <span className="value">{s.lastQualification}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="label">Status:</span>
          <span className={`value status-${s.status || 'pending'}`}>
            {s.admissionStage || s.status || 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FreelancerStudentDetail;
