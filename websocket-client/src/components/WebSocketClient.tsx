import React, { useEffect, useState } from 'react';

interface Message {
  key: string;
  message: string;
  master: boolean;
  canAnswer: boolean;
  messageId?: string;
}

const WebSocketClient: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      const message: Message = {
        key: 'test',
        message: 'Hello, PWA!',
        master: false,
        canAnswer: false,
      };
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
    };

    setWs(socket);

    // Clean up on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Client PWA</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketClient;
