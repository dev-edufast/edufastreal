import React from "react";
import { useAuth } from "../helpers/useAuth";
import { useVerifierStats } from "../helpers/useVerifier";
import { VerifierStudentsList } from "../components/VerifierStudentsList";
import { Skeleton } from "../components/Skeleton";
import { FileText, CheckCircle, XCircle, AlertCircle, Users, File } from "lucide-react";
import { Helmet } from "react-helmet";
import styles from "./student-verifier.module.css";

const StatCard = ({
  title,
  value,
  icon: Icon,
  isLoading,
  variant = "default",
}: {
  title: string;
  value: number | undefined;
  icon: React.ElementType;
  isLoading: boolean;
  variant?: "default" | "success" | "error" | "warning";
}) => (
  <div className={`${styles.statCard} ${styles[variant]}`}>
    <div className={styles.statHeader}>
      <h3 className={styles.statTitle}>{title}</h3>
      <div className={`${styles.iconWrapper} ${styles[`icon-${variant}`]}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className={styles.statContent}>
      {isLoading ? (
        <Skeleton className={styles.skeletonValue} />
      ) : (
        <span className={styles.statValue}>{value ?? 0}</span>
      )}
    </div>
  </div>
);

export default function StudentVerifierDashboard() {
  const { authState } = useAuth();
  const { data: stats, isLoading: statsLoading } = useVerifierStats();

  const userDisplayName =
    authState.type === "authenticated" ? authState.user.displayName : "Verifier";

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Student Verifier Dashboard | Edufast</title>
        <meta name="description" content="Manage and verify student documents and applications." />
      </Helmet>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Verifier Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back, {userDisplayName}. Here are the documents pending your review.
          </p>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsSectionHeader}>
          <Users size={20} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Students</h2>
        </div>
        <div className={styles.statsGrid}>
          <StatCard
            title="Pending Students"
            value={stats?.totalPendingStudents}
            icon={AlertCircle}
            isLoading={statsLoading}
            variant="warning"
          />
          <StatCard
            title="Approved Today"
            value={stats?.studentsApprovedToday}
            icon={CheckCircle}
            isLoading={statsLoading}
            variant="success"
          />
          <StatCard
            title="Rejected Today"
            value={stats?.studentsRejectedToday}
            icon={XCircle}
            isLoading={statsLoading}
            variant="error"
          />
          <StatCard
            title="Total Students"
            value={stats?.totalStudents}
            icon={Users}
            isLoading={statsLoading}
          />
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsSectionHeader}>
          <File size={20} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Documents</h2>
        </div>
        <div className={styles.statsGrid}>
          <StatCard
            title="Pending Documents"
            value={stats?.totalPendingDocuments}
            icon={AlertCircle}
            isLoading={statsLoading}
            variant="warning"
          />
          <StatCard
            title="Approved Today"
            value={stats?.documentsApprovedToday}
            icon={CheckCircle}
            isLoading={statsLoading}
            variant="success"
          />
          <StatCard
            title="Rejected Today"
            value={stats?.documentsRejectedToday}
            icon={XCircle}
            isLoading={statsLoading}
            variant="error"
          />
          <StatCard
            title="Total Documents"
            value={stats?.totalDocuments}
            icon={FileText}
            isLoading={statsLoading}
          />
        </div>
      </div>

      <div className={styles.contentSection}>
        <VerifierStudentsList />
      </div>
    </div>
  );
}