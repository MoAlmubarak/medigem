// In client/src/components/MessageBubble.js
import React from 'react';

const MessageBubble = ({ message }) => {
  const { text, sender, timestamp } = message;
  
  const formatTime = (date) => {
    if (!date) return '';
    
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString([], options);
  };
  
  // Add animation class based on sender
  const animationClass = sender === 'user' ? 'animate-slideInRight' : 'animate-slideInLeft';
  
  return (
    <div className={`message-bubble ${sender} ${animationClass}`}>
      <div className="message-content">
        <p>{text}</p>
      </div>
      {timestamp && (
        <div className="message-timestamp">{formatTime(timestamp)}</div>
      )}
    </div>
  );
};

export default MessageBubble;