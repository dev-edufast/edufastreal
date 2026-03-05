import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  GraduationCap, 
  Edit, 
  MessageCircle 
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../components/Dialog";
import { FileDropzone } from "../components/FileDropzone";
import { Input } from "../components/Input";
import { FreelancerStudentDocumentsTab } from "../components/FreelancerStudentDocumentsTab";

import { useFreelancerStudent, useUploadDocument, useDeleteFreelancerDocument } from "../helpers/useFreelancerDashboard";
import styles from "./freelancer-dashboard.students.$studentId.module.css";

const StudentDetailPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const parsedStudentId = parseInt(studentId || "", 10);

  const { data, isLoading, error } = useFreelancerStudent(parsedStudentId);
  const uploadDocumentMutation = useUploadDocument();
  const deleteDocumentMutation = useDeleteFreelancerDocument();

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<number | undefined>(undefined);
  const [customDocName, setCustomDocName] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<{ id: number; type: string } | null>(null);

  // Determine required documents based on qualification
  const requiredDocs = useMemo(() => {
    if (!data?.student) return [];

    const baseDocs = ["ID Proof", "Photo"];
    const qualification = data.student.lastQualification;

    let academicDocs: string[] = [];

    if (qualification === "10th Standard") {
      academicDocs = ["10th Certificate"];
    } else if (qualification === "12th Standard") {
      academicDocs = ["10th Certificate", "12th Certificate"];
    } else if (qualification === "Under-Graduate") {
      academicDocs = ["10th Certificate", "12th Certificate", "Post-Graduate Certificate"];
    } else {
      // Default fallback if qualification doesn't match specific cases
      academicDocs = ["10th Certificate", "12th Certificate"];
    }

    return [...baseDocs, ...academicDocs];
  }, [data?.student]);

  const handleFileUpload = (files: File[]) => {
    if ((!selectedDocType && !customDocName) || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64String = reader.result as string;
      // Extract the base64 data part
      const base64Data = base64String.split(',')[1];
      
      const docTypeToUpload = selectedDocType === "Other" ? customDocName : selectedDocType!;

      if (!docTypeToUpload) {
        toast.error("Please specify a document type");
        return;
      }
      
      uploadDocumentMutation.mutate(
        {
          studentId: parsedStudentId,
          documentId: selectedDocId,
          documentType: docTypeToUpload,
          fileName: file.name,
          mimeType: file.type,
          fileData: base64Data,
        },
        {
          onSuccess: () => {
            toast.success("Document uploaded successfully");
            setUploadDialogOpen(false);
            setSelectedDocType(null);
            setSelectedDocId(undefined);
            setCustomDocName("");
          },
          onError: () => toast.error("Failed to upload document"),
        }
      );
    };
    
    reader.readAsDataURL(file);
  };

  const openUploadDialog = (docType: string, docId?: number) => {
    setSelectedDocType(docType);
    setSelectedDocId(docId);
    setCustomDocName("");
    setUploadDialogOpen(true);
  };

  const handleDeleteClick = (docId: number, docType: string) => {
    setDocToDelete({ id: docId, type: docType });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!docToDelete) return;

    deleteDocumentMutation.mutate(
      {
        studentId: parsedStudentId,
        documentId: docToDelete.id,
      },
      {
        onSuccess: () => {
          toast.success("Document deleted successfully");
          setDeleteDialogOpen(false);
          setDocToDelete(null);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to delete document");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.headerSkeleton}>
          <Skeleton className={styles.skeletonBack} />
          <Skeleton className={styles.skeletonTitle} />
          <Skeleton className={styles.skeletonInfo} />
        </div>
        <div className={styles.gridSkeleton}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <h1>Error loading student</h1>
        <p>{error?.message || "Student not found"}</p>
        <Button asChild variant="outline">
          <Link to="/freelancer-dashboard/students">Back to Students</Link>
        </Button>
      </div>
    );
  }

  const { student, documents } = data;

  return (
    <>
      <Helmet>
        <title>{student.fullName} - Documents | Edufast Freelancer</title>
      </Helmet>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.topRow}>
            <Link to="/freelancer-dashboard/students" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Students
            </Link>
            <div className={styles.actions}>
              <Button asChild variant="outline" size="sm">
                <Link to={`/freelancer-dashboard/students/${student.id}/edit`}>
                  <Edit size={14} /> Edit Details
                </Link>
              </Button>
              {student.mobileNumber && (
                <>
                  <Button asChild variant="ghost" size="icon-sm" title="Call">
                    <a href={`tel:${student.mobileNumber}`}>
                      <Phone size={16} />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="icon-sm" title="WhatsApp">
                    <a 
                      href={`https://wa.me/${student.mobileNumber.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className={styles.studentProfile}>
            <div className={styles.nameSection}>
              <h1 className={styles.studentName}>{student.fullName}</h1>
              <Badge variant={student.admissionStage === "Admission Confirmed" ? "success" : "primary"}>
                {student.admissionStage}
              </Badge>
            </div>

            <div className={styles.quickInfo}>
              {student.mobileNumber && (
                <div className={styles.infoItem}>
                  <Phone size={14} />
                  <span>{student.mobileNumber}</span>
                </div>
              )}
              {student.email && (
                <div className={styles.infoItem}>
                  <Mail size={14} />
                  <span>{student.email}</span>
                </div>
              )}
              {student.lastQualification && (
                <div className={styles.infoItem}>
                  <GraduationCap size={14} />
                  <span>{student.lastQualification}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className={styles.content}>
          <div className={styles.sectionHeader}>
            <h2>Required Documents</h2>
            <p className={styles.subtitle}>
              Based on qualification: <strong>{student.lastQualification || "Not specified"}</strong>
            </p>
          </div>

          <FreelancerStudentDocumentsTab
            documents={documents}
            requiredDocTypes={requiredDocs}
            onUploadClick={openUploadDialog}
            onDeleteClick={handleDeleteClick}
          />
        </div>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedDocType === "Other" ? "Upload Document" : `Upload ${selectedDocType}`}
              </DialogTitle>
              <DialogDescription>
                Supported formats: PDF, JPG, PNG (Max 5MB)
              </DialogDescription>
            </DialogHeader>
            
            <div className={styles.dialogBody}>
              {selectedDocType === "Other" && !selectedDocId && (
                 <div className={styles.docNameInput}>
                   <label className={styles.docNameLabel}>Document Name</label>
                   <Input 
                     placeholder="e.g. Gap Certificate" 
                     value={customDocName}
                     onChange={(e) => setCustomDocName(e.target.value)}
                   />
                 </div>
              )}
              
              <FileDropzone 
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024}
                onFilesSelected={handleFileUpload}
                disabled={uploadDocumentMutation.isPending}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Document</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{docToDelete?.type}</strong>? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button 
                variant="destructive" 
                onClick={handleConfirmDelete}
                disabled={deleteDocumentMutation.isPending}
              >
                {deleteDocumentMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default StudentDetailPage;