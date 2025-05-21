// client/src/features/chat/MessageBubble.js
import React from 'react';

const MessageBubble = ({ message }) => {
  const { text, sender, timestamp, isLoading, error } = message;
  
  const formatTime = (date) => {
    if (!date) return '';
    
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString([], options);
  };

  // Determine message class based on state
  const messageClass = `message-bubble ${sender} ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`;
  
  return (
    <div className={messageClass}>
      {sender === 'bot' && (
        <div className="bot-indicator">
          <span role="img" aria-label="MediGem">💊</span>
          <span className="bot-name">MediGem</span>
          {isLoading && <span className="bot-loading-indicator"></span>}
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