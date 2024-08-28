// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import FileUpload from "./components/fileUpload/fileUpload";
import './App.css';
import CustomerSummaries from './components/Summary/Summary';
import FeedbackEntries from './components/feedback/feedback';



const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/chatbot" element={<Main />} />
            <Route path="/summaries" element={<CustomerSummaries endpoint="http://127.0.0.1:5000/narratives" />}/>
            <Route path="/feedbacks" element={<FeedbackEntries endpoint="http://127.0.0.1:5000/feedback" />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
