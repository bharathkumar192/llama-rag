import React, { useState } from 'react';
import './Main.css' 

const UserModal = ({ isOpen, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && company) {
      onSave(name, company);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Company:
            <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
          </label>
          <div style={{ marginTop: '20px' }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
