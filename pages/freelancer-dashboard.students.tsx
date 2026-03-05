import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { FreelancerStudentsList } from '../components/FreelancerStudentsList';
import { FreelancerStudentDetail } from '../components/FreelancerStudentDetail';
import { FreelancerStudentForm } from '../components/FreelancerStudentForm';
import styles from './freelancer-dashboard.students.module.css';

const FreelancerStudentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parse URL params to determine current view
  const studentIdParam = searchParams.get('studentId');
  const actionParam = searchParams.get('action');
  
  const studentId = studentIdParam ? parseInt(studentIdParam, 10) : null;
  const isAddMode = actionParam === 'add';
  const isEditMode = actionParam === 'edit' && studentId !== null;
  const isDetailMode = studentId !== null && !isEditMode;
  const isListMode = !isAddMode && !isEditMode && !isDetailMode;

  // Navigation handlers
  const handleBackToList = () => {
    setSearchParams({});
  };

  const handleAddNew = () => {
    setSearchParams({ action: 'add' });
  };

  const handleEdit = (id: number) => {
    setSearchParams({ studentId: id.toString(), action: 'edit' });
  };

  const handleView = (id: number) => {
    setSearchParams({ studentId: id.toString() });
  };

  // Render content based on current mode
  const renderContent = () => {
    if (isAddMode) {
      return (
        <div className={styles.formContainer}>
          <FreelancerStudentForm 
            mode="add" 
            onSuccess={handleBackToList}
            onCancel={handleBackToList}
          />
        </div>
      );
    }

    if (isEditMode && studentId) {
      return (
        <div className={styles.formContainer}>
          <FreelancerStudentForm 
            mode="edit" 
            studentId={studentId}
            onSuccess={() => handleView(studentId)}
            onCancel={() => handleView(studentId)}
          />
        </div>
      );
    }

    if (isDetailMode && studentId) {
      return (
        <FreelancerStudentDetail 
          studentId={studentId} 
          onBack={handleBackToList} 
        />
      );
    }

    // Default to list view
    return <FreelancerStudentsList />;
  };

  // Dynamic header content
  const headerContent = useMemo(() => {
    if (isListMode) {
      return (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link to="/freelancer-dashboard" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className={styles.title}>My Students</h1>
            <p className={styles.subtitle}>Manage your student leads and applications</p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus size={16} />
            Add New Student
          </Button>
        </div>
      );
    }
    
    // For other modes, the components handle their own specific headers or back buttons,
    // but we still provide a consistent top-level breadcrumb/context if needed.
    // However, FreelancerStudentDetail has its own back button and header.
    // FreelancerStudentForm has its own header.
    // So we might just return a simple wrapper or nothing if the sub-components handle it well.
    
    if (isAddMode || isEditMode) {
       return (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button onClick={handleBackToList} className={styles.backLinkButton}>
              <ArrowLeft size={16} />
              Back to Students
            </button>
          </div>
        </div>
       );
    }

    return null; 
  }, [isListMode, isAddMode, isEditMode]);

  return (
    <>
      <Helmet>
        <title>My Students - Freelancer Dashboard - Edufast</title>
        <meta name="description" content="Manage your students, track admissions, and update details." />
      </Helmet>

      <div className={styles.container}>
        {headerContent}
        
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default FreelancerStudentsPage;