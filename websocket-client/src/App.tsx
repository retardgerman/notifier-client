// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

interface Message {
  key: string;
  message: string;
  master: boolean;
  canAnswer: boolean;
  messageId?: string;
}

const App: React.FC = () => {
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

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (messageText: string) => {
    if (ws) {
      const message: Message = {
        key: 'test',
        message: messageText,
        master: false,
        canAnswer: true,
      };
      ws.send(JSON.stringify(message));
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Client PWA</h1>
      <MessageInput onSend={sendMessage} />
      <MessageList messages={messages} />
    </div>
  );
};

export default App;
