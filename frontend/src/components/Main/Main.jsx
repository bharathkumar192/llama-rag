import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
import "./Main.css";
import React, { useContext, useRef, useEffect, useState } from 'react';
import UserModal from './UserModal';
import CardSelector from './CustomCards';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";


const Main = () => {
const [showModal, setShowModal] = useState(false);
const [userName, setUserName] = useState('');
const [companyName, setCompanyName] = useState('');
const [isFirstMessage, setIsFirstMessage] = useState(true); 
const [history, setHistory] = useState([]);
const [conversation, setConversation] = useState([]);
const [loading, setLoading] = useState(false);
const messagesEndRef = useRef(null);

const {
  onSent,
  recentPrompt,
  setRecentPrompt,
  showResult,
  resultData,
  setResultData, // Ensure this is used from the context
  setInput,
  input,
  selectedCard,
  setSelectedCard,
  setShowResult, // Ensure this is added if you use it
} = useContext(Context);


const handleSend = async () => {
  if (isFirstMessage && !userName && !companyName) {
    setShowModal(true);
    return; 
  }

  setLoading(true);
  setShowResult(true);
  setHistory((prev) => [
    ...prev,
    { query: input, response: "Waiting for response..." },
  ]);
  setConversation((prevConversation) => [
    ...prevConversation,
    { role: 'user', content: input },
    { role: 'assistant', content: "Loading...", source: "" },
  ]);
  setIsFirstMessage(false);
  setRecentPrompt(input);

  try {
    const response = await sendQueryToServer({ prompt: input, history });
    setLoading(false); 
    setHistory((prev) =>
      prev.map((item) =>
        item.query === input ? { ...item, response: response.answer } : item
      )
    );
    setResultData(response.answer);
    setConversation((prevConversation) => {
      const lastIndex = prevConversation.length - 1;
      return prevConversation.map((item, index) => {
          if (index === lastIndex) {
              return { ...item, content: response.answer, source: response.docs };
          }
          return item;
      });
    });
    setLoading(false);
  } catch (error) {
    console.error("Failed to fetch:", error);
    setResultData("Error fetching data.");
    setLoading(false);
    setInput("");
  }
  setInput("");
};




// https://monarch-modest-cod.ngrok-free.app/chat_llm
const sendQueryToServer = async (payload) => {
  try {
    setInput("");
    console.log('Sending request to:', 'http://localhost:5000/chat_llm');
    const response = await fetch('http://localhost:5000/chat_llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream complete');
        break;
      }
      
      const chunk = decoder.decode(value);
      console.log('Received chunk:', chunk);

      const lines = chunk.split('\n\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const jsonData = JSON.parse(line.slice(6));
            console.log('Parsed JSON data:', jsonData);
            if (jsonData.answer === 'END') {
              console.log('Received END signal');
              break;
            }
            fullResponse += jsonData.answer + ' ';
            console.log('Updated full response:', fullResponse);
            setResultData(fullResponse);
            setConversation((prevConversation) => {
              const lastIndex = prevConversation.length - 1;
              return prevConversation.map((item, index) => {
                if (index === lastIndex) {
                  return { ...item, content: fullResponse };
                }
                return item;
              });
            });
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.log('Problematic line:', line);
          }
        }
      }
    }

    console.log('Final full response:', fullResponse);
    return { answer: fullResponse };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return { error: "Failed to fetch data" };
  }
};
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);
  

  const handleSaveUser = (name, company) => {
    setUserName(name);
    setCompanyName(company);
    setIsFirstMessage(false); // Assuming message will be sent after this
    setShowModal(false);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleCardClick = (prompt) => {
    setSelectedCard(prompt);
    setInput(prompt);
  };


  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      // setInput("");
      handleSend();
      
    }
  };

  const handleLike = () => {
    // Handle like button click
    console.log('Like button clicked');
  };
  
  const handleDislike = () => {
    // Handle dislike button click
    console.log('Dislike button clicked');
  };
  
  const handleFeedback = () => {
    // Handle feedback button click
    console.log('Feedback button clicked');
  };

  return (
    <div className="main">
    <UserModal isOpen={showModal} onSave={handleSaveUser} onCancel={handleCancelModal} />
      <div className="nav">
        <p className="Heading-title">Data Masking Assist</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello!</span>
              </p>
              <p>Ask me about Data Masking ...</p>
            </div>
            <CardSelector handleCardClick={handleCardClick} selectedCard={selectedCard} />
          </>
        ) : (
          <div className="result">
            <div className="chat-history">
              {conversation.map((item, index) => (
                <div key={index} className="message-container">
                  {item.content && (
                    <div className="message-wrapper">
                      <div className={`message ${item.role === 'user' ? 'user-message' : 'agent-message'}`}>
                        <img src={item.role === 'user' ? assets.user_icon : assets.gemini_icon} alt={item.role} />
                        {item.role === "assistant" && item.content === "Loading..." ? (
                          <div className="loader"></div>
                        ) : (
                          <>
                            <ReactMarkdown className={`bot_response ${item.role === 'user' ? 'user-message-1' : 'agent-message-1'}`} remarkPlugins={[remarkGfm]}>
                              {item.content}
                            </ReactMarkdown>
                            {item.role === 'assistant' && item.content.includes('Deterministic Encryption') && (
                              <div className="video-container">
                              <iframe
                                  width="100%"
                                  height="315"
                                  src="https://www.youtube.com/embed/6h1dLzLS2p8?si=SgLKJAneN7d6mPee&amp;start=1431"
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                          </>
                        )}
                        {item.role === 'assistant' && (
                          <div className="options">
                            <button className="option-button like-button" onClick={handleLike}>👍</button>
                            <button className="option-button dislike-button" onClick={handleDislike}>👎</button>
                            <button className="option-button feedback-button" onClick={handleFeedback}>💭</button>
                            <a href={item.source} target="_blank" rel="noopener noreferrer" className="option-button source-button">📁</a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Ask me regarding Data Masking ..."
            />
            <div>
              {/* <img className="input-icon" src={assets.gallery_icon} alt="galery" />
              <img className="input-icon" src={assets.mic_icon} alt="mic" /> */}
              {input ? (
                <img
                  onClick={handleSend}
                  src={assets.send_icon}
                  alt="send"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Generated responses can provide incorrect information. Please double check with provided documentation links.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
