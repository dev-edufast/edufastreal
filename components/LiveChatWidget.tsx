import React from "react";

interface LiveChatWidgetProps {
  className?: string;
}

export function LiveChatWidget({ className = "" }: LiveChatWidgetProps) {
  return (
    <div className={`live-chat-widget ${className}`}>
      <button className="chat-button">
        💬 Chat with us
      </button>
    </div>
  );
}

export default LiveChatWidget;
