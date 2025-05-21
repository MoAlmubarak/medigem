// client/src/features/chat/MessageBubble.js
import React from 'react';

const MessageBubble = ({ message }) => {
  const { text, sender, timestamp } = message;
  
  const formatTime = (date) => {
    if (!date) return '';
    
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString([], options);
  };
  
  return (
    <div className={`message-bubble ${sender}`}>
      {sender === 'bot' && (
        <div className="bot-indicator">
          <span role="img" aria-label="MediGem">💊</span>
          <span className="bot-name">MediGem</span>
        </div>
      )}
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