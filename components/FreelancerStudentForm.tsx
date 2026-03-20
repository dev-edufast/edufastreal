import React from "react";

interface FreelancerStudentFormProps {
  studentId?: string | number;
  mode?: "create" | "edit";
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function FreelancerStudentForm({ 
  studentId,
  mode = "create",
  onSuccess,
  className = "" 
}: FreelancerStudentFormProps) {
  return (
    <div className={`freelancer-student-form ${className}`}>
      <h3>{mode === "create" ? "Add New Student" : "Edit Student"}</h3>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Student name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Student email" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="Student phone" />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onSuccess}>
            {mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FreelancerStudentForm;
