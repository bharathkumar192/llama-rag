import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUpload, FaRobot, FaComments, FaFileAlt, FaCommentAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);

  const handleToggle = () => {
    setExtended(!extended);
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={handleToggle}>
          <span className="toggle-icon"></span>
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/upload" className="sidebar-link" activeclassname="active">
          <FaUpload className="link-icon" />
          {extended && <span className="link-text">File Upload</span>}
        </NavLink>
        <NavLink to="/chatbot" className="sidebar-link" activeclassname="active">
          <FaRobot className="link-icon" />
          {extended && <span className="link-text">DataMasking Assist</span>}
        </NavLink>
        <NavLink to="/summaries" className="sidebar-link" activeclassname="active">
          <FaComments className="link-icon" />
          {extended && <span className="link-text">Customer Narratives</span>}
        </NavLink>
        <NavLink to="/approve-docs" className="sidebar-link" activeclassname="active">
          <FaFileAlt className="link-icon" />
          {extended && <span className="link-text">Approve Docs</span>}
        </NavLink>
        <NavLink to="/feedbacks" className="sidebar-link" activeclassname="active">
          <FaCommentAlt className="link-icon" />
          {extended && <span className="link-text">Feedback Preview</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;