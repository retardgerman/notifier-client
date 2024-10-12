import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to server');
    const message: Message = {
        key: 'test',
        message: 'Hello, 2021!',
        master: false,
        canAnswer: false
    }
  ws.send(JSON.stringify(message))
});

ws.on('message', (message: string) => {
  console.log(`Received message from server: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from server');
});


interface Message {
    key: string;
    message: string;
    master: boolean;
    canAnswer: boolean;
}