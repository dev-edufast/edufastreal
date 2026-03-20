import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Skeleton } from './Skeleton';
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  User,
  Clock
} from 'lucide-react';

interface VerificationDocument {
  id: string;
  type: 'identity' | 'education' | 'address' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

interface StudentVerification {
  id: string;
  studentName: string;
  studentId: string;
  program: string;
  documents: VerificationDocument[];
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

interface VerifierStudentsListProps {
  students?: StudentVerification[];
  isLoading?: boolean;
  onVerify?: (studentId: string, notes?: string) => void;
  onReject?: (studentId: string, reason: string) => void;
  onRequestDocuments?: (studentId: string, documentTypes: string[]) => void;
}

const defaultStudents: StudentVerification[] = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: 'STU001',
    program: 'Bachelor of Computer Science',
    documents: [
      {
        id: 'doc1',
        type: 'identity',
        name: 'Passport.pdf',
        url: '/documents/passport.pdf',
        uploadedAt: '2024-01-15T10:30:00Z',
        status: 'pending',
      },
    ],
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: 'STU002',
    program: 'Data Science Fundamentals',
    documents: [
      {
        id: 'doc2',
        type: 'identity',
        name: 'ID Card.pdf',
        url: '/documents/id.pdf',
        uploadedAt: '2024-01-14T14:20:00Z',
        status: 'approved',
      },
    ],
    status: 'verified',
    submittedAt: '2024-01-14T14:20:00Z',
    verifiedAt: '2024-01-14T16:45:00Z',
    verifiedBy: 'Verifier Admin',
  },
];

export function VerifierStudentsList({
  students = defaultStudents,
  isLoading = false,
  onVerify,
  onReject,
  onRequestDocuments,
}: VerifierStudentsListProps) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="verifier-students-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="student-item skeleton">
            <div className="student-header">
              <Skeleton style={{ width: '200px', height: '1.5rem' }} />
              <Skeleton style={{ width: '100px', height: '1rem' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="verifier-students-list empty">
        <p>No students found for verification.</p>
      </div>
    );
  }

  const toggleExpand = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const handleVerify = (studentId: string) => {
    onVerify?.(studentId);
  };

  const handleReject = (studentId: string) => {
    if (rejectionReason.trim()) {
      onReject?.(studentId, rejectionReason);
      setShowRejectModal(null);
      setRejectionReason('');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default"><CheckCircle size={12} /> Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle size={12} /> Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock size={12} /> Pending</Badge>;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'identity': return 'Identity Proof';
      case 'education': return 'Education Certificate';
      case 'address': return 'Address Proof';
      default: return 'Other Document';
    }
  };

  return (
    <div className="verifier-students-list">
      {students.map((student) => (
        <div 
          key={student.id} 
          className={`student-item ${student.status}`}
        >
          <div 
            className="student-header"
            onClick={() => toggleExpand(student.id)}
          >
            <div className="student-info">
              <div className="student-avatar">
                <User size={24} />
              </div>
              <div className="student-details">
                <h4 className="student-name">{student.studentName}</h4>
                <p className="student-meta">
                  {student.studentId} • {student.program}
                </p>
              </div>
            </div>
            <div className="student-status">
              {getStatusBadge(student.status)}
              <span className="expand-icon">
                {expandedStudent === student.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </div>
          </div>

          {expandedStudent === student.id && (
            <div className="student-expanded">
              <div className="documents-section">
                <h5>Submitted Documents</h5>
                <div className="documents-list">
                  {student.documents.map((doc) => (
                    <div key={doc.id} className={`document-item ${doc.status}`}>
                      <div className="document-icon">
                        <FileText size={20} />
                      </div>
                      <div className="document-info">
                        <p className="document-name">{doc.name}</p>
                        <p className="document-type">{getDocumentTypeLabel(doc.type)}</p>
                        <p className="document-date">
                          Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="document-status">
                        {doc.status === 'approved' && <Badge variant="default">Approved</Badge>}
                        {doc.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                        {doc.status === 'pending' && <Badge variant="secondary">Pending</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="verification-actions">
                {student.status === 'pending' && (
                  <>
                    <Button 
                      variant="primary" 
                      onClick={() => handleVerify(student.id)}
                    >
                      <CheckCircle size={16} /> Verify Student
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => setShowRejectModal(student.id)}
                    >
                      <XCircle size={16} /> Reject
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onRequestDocuments?.(student.id, ['identity', 'education'])}
                    >
                      <FileText size={16} /> Request Documents
                    </Button>
                  </>
                )}
                
                {student.status === 'verified' && student.verifiedAt && (
                  <div className="verification-info">
                    <p>Verified on {new Date(student.verifiedAt).toLocaleDateString()}</p>
                    {student.verifiedBy && <p>By: {student.verifiedBy}</p>}
                  </div>
                )}
              </div>

              {showRejectModal === student.id && (
                <div className="reject-modal">
                  <h5>Rejection Reason</h5>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    rows={3}
                  />
                  <div className="reject-actions">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleReject(student.id)}
                      disabled={!rejectionReason.trim()}
                    >
                      Confirm Rejection
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowRejectModal(null);
                        setRejectionReason('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default VerifierStudentsList;
