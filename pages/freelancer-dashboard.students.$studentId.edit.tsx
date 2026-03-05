import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { FreelancerStudentForm } from '../components/FreelancerStudentForm';
import styles from './freelancer-dashboard.students.$studentId.edit.module.css';

const EditStudentPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const parsedStudentId = studentId ? parseInt(studentId, 10) : undefined;

  const handleBack = () => {
    if (parsedStudentId) {
      navigate(`/freelancer-dashboard/students/${parsedStudentId}`);
    } else {
      navigate('/freelancer-dashboard/students');
    }
  };

  if (!parsedStudentId || isNaN(parsedStudentId)) {
    return (
      <div className={styles.errorContainer}>
        <h1>Invalid Student ID</h1>
        <p>The student ID provided in the URL is invalid.</p>
        <Link to="/freelancer-dashboard/students" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Students List
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Student - Freelancer Dashboard - Edufast</title>
        <meta name="description" content="Update student details and admission status." />
      </Helmet>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            <ArrowLeft size={16} />
            Back to Student Details
          </button>
        </header>

        <main className={styles.content}>
          <div className={styles.formWrapper}>
            <FreelancerStudentForm
              mode="edit"
              studentId={parsedStudentId}
              onSuccess={handleBack}
              onCancel={handleBack}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default EditStudentPage;