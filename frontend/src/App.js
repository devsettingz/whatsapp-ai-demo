import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'You', text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://whatsapp-ai-demo.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();

      setMessages([...newMessages, { sender: 'AI', text: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'AI', text: 'Error: could not reach backend.' }]);
    }

    setLoading(false);
    setInput('');
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial' }}>
      {/* Logo and header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Logo served directly from public folder */}
        <img src="/botari-logo.png" alt="Botari Logo" style={{ width: '80px', marginBottom: '10px' }} />
        <h2 style={{ color: '#333' }}>Botari AI Demo</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Smart, seamless customer support</p>
      </div>

      {/* Chat window */}
      <div style={{
        border: '1px solid #ccc',
        height: '400px',
        overflowY: 'auto',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              backgroundColor: msg.sender === 'AI' ? '#e0f7fa' : '#dcedc8',
              padding: '8px 12px',
              borderRadius: '20px',
              margin: '6px 0',
              maxWidth: '80%',
              alignSelf: msg.sender === 'AI' ? 'flex-start' : 'flex-end',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
        {loading && (
          <p style={{ fontStyle: 'italic', color: '#888', margin: '6px 0' }}>AI is typing...</p>
        )}
      </div>

      {/* Input + button */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
