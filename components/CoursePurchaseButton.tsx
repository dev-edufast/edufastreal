import React from "react";
import { Button } from "./Button";

interface CoursePurchaseButtonProps {
  courseId: string | number;
  title?: string;
  isFree?: boolean;
  price?: number;
  isEnrolled?: boolean;
  onPurchase?: () => void;
  onEnrollSuccess?: () => void;
  className?: string;
}

export function CoursePurchaseButton({ 
  courseId, 
  price, 
  isEnrolled = false,
  onPurchase,
  onEnrollSuccess,
  className = "" 
}: CoursePurchaseButtonProps) {
  if (isEnrolled) {
    return (
      <Button disabled className={`course-purchase-button ${className}`}>
        Already Enrolled
      </Button>
    );
  }

  return (
    <Button 
      onClick={onPurchase}
      className={`course-purchase-button ${className}`}
    >
      {price ? `Enroll Now - ₹${price}` : "Enroll Now"}
    </Button>
  );
}

export default CoursePurchaseButton;
