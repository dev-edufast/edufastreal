import React from "react";

interface SmartCTAProps {
  actions?: string[];
  className?: string;
  variant?: "default" | "inline" | "banner";
  programInterest?: string;
  userBehavior?: string;
}

export function SmartCTA({ 
  actions = [], 
  className = "",
  variant = "default",
  programInterest,
  userBehavior
}: SmartCTAProps) {
  return (
    <div className={`smart-cta ${variant} ${className}`}>
      <p>Smart CTA Component</p>
      {programInterest && <p>Interest: {programInterest}</p>}
      {userBehavior && <p>Behavior: {userBehavior}</p>}
      {actions.length > 0 && (
        <div className="actions">
          {actions.map((action, index) => (
            <span key={index} className="action-tag">{action}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SmartCTA;
