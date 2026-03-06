import React from "react";

interface InstantBookingProps {
  className?: string;
}

export function InstantBooking({ className = "" }: InstantBookingProps) {
  return (
    <div className={`instant-booking ${className}`}>
      <h3>Book a Counseling Session</h3>
      <p>Schedule a free counseling session with our experts.</p>
      <div className="booking-form">
        <input type="date" placeholder="Select date" />
        <input type="time" placeholder="Select time" />
        <button>Book Now</button>
      </div>
    </div>
  );
}

export default InstantBooking;
