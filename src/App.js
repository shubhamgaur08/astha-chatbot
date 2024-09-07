import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Scroll to the bottom of the chat history
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== '') {
      // Add user message to the messages array
      setMessages((prevMessages) => [...prevMessages, { type: 'user', message: userInput }]);

      // Clear the input field
      setUserInput('');

      try {
        const response = await fetch('http://localhost:3500/api/Chatbot/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput }),
        });

        const data = await response.json();

        // Add bot response to the messages array
        setMessages((prevMessages) => [...prevMessages, { type: 'bot', message: data.response }]);
      } catch (error) {
        console.error('Error:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }
  };

  return (
    <div id="chat-container">
      <h1>Astha Chatbot</h1>
      <div id="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={message.type === 'user' ? 'user-message' : 'bot-message'}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          id="user-input"
          placeholder="Enter your message"
          value={userInput}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
      <div id="loader">
        {/* Add your loading animation here */}
      </div>
    </div>
  );
}

export default App;
