import React from "react";

interface FreelancerStudent {
  id: string | number;
  fullName: string;
  email: string;
  mobileNumber?: string;
  status?: string;
  admissionStage?: string;
}

interface FreelancerStudentsListProps {
  students?: FreelancerStudent[];
  onSelectStudent?: (studentId: string | number) => void;
  onAddNew?: () => void;
  className?: string;
}

export function FreelancerStudentsList({
  students = [],
  onSelectStudent,
  onAddNew,
  className = ""
}: FreelancerStudentsListProps) {
  return (
    <div className={`freelancer-students-list ${className}`}>
      <div className="list-header">
        <h3>Students</h3>
        {onAddNew && (
          <button onClick={onAddNew} className="add-new-btn">
            Add New
          </button>
        )}
      </div>
      
      {students.length === 0 ? (
        <p className="no-students">No students found.</p>
      ) : (
        <ul className="students-list">
          {students.map((student) => (
            <li 
              key={student.id} 
              className="student-item"
              onClick={() => onSelectStudent?.(student.id)}
            >
              <div className="student-info">
                <span className="student-name">{student.fullName}</span>
                <span className="student-email">{student.email}</span>
              </div>
              <span className={`student-status status-${student.status || 'pending'}`}>
                {student.admissionStage || student.status || 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FreelancerStudentsList;
