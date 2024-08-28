import React, { useState, useEffect } from 'react';
import './feedback.css';

const FeedbackEntries = ({ endpoint }) => {
    const [customers, setCustomers] = useState([]);
    
    useEffect(() => {
        const fetchCustomerData = async () => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
        };
    
        fetchCustomerData();
    }, [endpoint]);

    return (
        <div className="feedback-container">
            {customers.map((entry, index) => (
                <div key={index} className="feedback-card">
                    <div className="feedback-header">
                        <p>{entry.timestamp}</p>
                        <p>{entry.name} - {entry.company}</p>
                    </div>
                    <div className="feedback-content">
                        <p className="question"><strong>Q:</strong> {entry.userQuery}</p>
                        <p className="response"><strong>A:</strong> {entry.botResponse}</p>
                    </div>
                    <div className="feedback-interactions">
                        <p>{entry.like ? '👍' : '👎'}</p>
                        <textarea placeholder="Your feedback here" defaultValue={entry.manualFeedback}></textarea>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedbackEntries;
