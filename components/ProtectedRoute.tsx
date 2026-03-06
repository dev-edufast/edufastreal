import React from "react";

type GuardProps = {
  children?: React.ReactNode;
};

function PassThroughGuard({ children }: GuardProps) {
  return <>{children ?? null}</>;
}

export const UserRoute = PassThroughGuard;
export const AdminRoute = PassThroughGuard;
export const SuperAdminRoute = PassThroughGuard;
export const CounselorRoute = PassThroughGuard;
export const FreelancerRoute = PassThroughGuard;
export const VerifierRoute = PassThroughGuard;

export default PassThroughGuard;
