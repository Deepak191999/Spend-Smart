import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Budget Buddy</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                {/* <span>Hello, Dev.</span> */}
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>How can I create a monthly budget plan?</p>
                <img src={assets.message_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>What are some effective ways to save money?</p>
                <img src={assets.bulb_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>Explain the benefits of investing in mutual funds</p>
                <img src={assets.message_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>How can I reduce my monthly expenses?</p>
                <img src={assets.code_icon} alt="compass_icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user_icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini_icon" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              {input?<img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="send_icon"
              />:
              null
              }
              
            </div>
          </div>
          <p className="bottom-info">
            Budget Buddy may display inaccurate info, including about people, so
            double-check its response. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
