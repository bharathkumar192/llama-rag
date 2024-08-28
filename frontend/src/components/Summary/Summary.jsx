import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Summary.css'; // Assuming you have the CSS in this file

const CustomerSummaries = ({ endpoint }) => {
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
    <div className="customer-summary-container">
      {customers.map((customer, index) => (
        <div key={index} className="customer-card">
          <div className="customer-card-header">
            <div>
              <h3 className="customer-name">{customer.name}</h3>
              <p className="customer-company">{customer.company}</p>
            </div>
            <p className="customer-date">{new Date(customer.timestamp).toLocaleDateString()}</p>
          </div>
          <ReactMarkdown className="customer-summary">
            {customer.summary}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default CustomerSummaries;
