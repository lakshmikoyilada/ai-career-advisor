import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css'; // Create this CSS file for styling

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to state
    const userMessage = {
      role: 'user',
      parts: [{ text: input }],
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/gemini-chat/', {
        messages: newMessages, // Send the entire conversation history
      });
      
      const botMessage = {
        role: 'model',
        parts: [{ text: response.data.response }],
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'model',
        parts: [{ text: 'Error: Could not get a response. Please try again.' }],
      };
      setMessages([...newMessages, errorMessage]);
      console.error('API call error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p>{msg.parts[0].text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="message model">
            <p>...</p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;