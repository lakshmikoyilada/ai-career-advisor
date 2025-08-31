import React, { useState } from 'react';
import axios from 'axios';

const GeminiForm = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Adjust the URL to your Django server's API endpoint
            const res = await axios.post('http://localhost:8000/api/gemini-prompt/', { prompt });
            setResponse(res.data.response);
        } catch (error) {
            setResponse('Error: Could not get a response from the API.');
            console.error('API call error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Test Gemini API</h2>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                rows="5"
                cols="50"
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Get Response'}
            </button>
            {response && (
                <div className="response-container">
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </form>
    );
};

export default GeminiForm;