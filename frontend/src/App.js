import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'You', text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();

      setMessages([...newMessages, { sender: 'AI', text: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'AI', text: 'Error: could not reach backend.' }]);
    }

    setInput('');
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial' }}>
      <h2>AI Chat Demo</h2>
      <div style={{
        border: '1px solid #ccc',
        height: '400px',
        overflowY: 'auto',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%', padding: '5px' }}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ padding: '5px 10px' }}>Send</button>
    </div>
  );
}

export default App;
