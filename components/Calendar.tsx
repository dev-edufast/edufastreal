import React from "react";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  mode?: "single" | "multiple" | "range";
}

export function Calendar({ selected, onSelect, disabled, className = "" }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (disabled && disabled(date)) return;
    onSelect?.(date);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth &&
      selected.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    const date = new Date(currentYear, currentMonth, day);
    return disabled(date);
  };

  const days: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const selectedClass = isSelected(day) ? "selected" : "";
    const todayClass = isToday(day) ? "today" : "";
    const disabledClass = isDisabled(day) ? "disabled" : "";
    
    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={isDisabled(day)}
        className={`calendar-day ${selectedClass} ${todayClass} ${disabledClass}`}
        style={{
          padding: "8px",
          border: "none",
          background: isSelected(day) ? "#2563eb" : isToday(day) ? "#e0e7ff" : "transparent",
          color: isSelected(day) ? "#fff" : isDisabled(day) ? "#9ca3af" : "#374151",
          borderRadius: "6px",
          cursor: isDisabled(day) ? "not-allowed" : "pointer",
          fontSize: "14px",
        }}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={`calendar ${className}`} style={{ width: "280px", background: "#fff", borderRadius: "8px", padding: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button onClick={handlePrevMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>←</button>
        <span style={{ fontWeight: 600 }}>{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={handleNextMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>→</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <div key={day} style={{ fontSize: "12px", color: "#6b7280", padding: "8px" }}>{day}</div>
        ))}
        {days}
      </div>
    </div>
  );
}

export default Calendar;
