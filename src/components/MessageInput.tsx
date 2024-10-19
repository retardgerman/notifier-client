// src/components/MessageInput.tsx
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSend(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default MessageInput;
