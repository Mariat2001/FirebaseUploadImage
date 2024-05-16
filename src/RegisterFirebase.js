// RegisterFirebase.js

import { useState, useRef } from 'react';
import { useAuth, signup, Login, logout } from './Firebase';
import UploadFile from './UploadFile';
import './Register.css';

function RegisterFirebase() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const rotateCard = () => {
    setIsFlipped(!isFlipped);
  };

  const seePassword = () => {
    const pwdInput = document.querySelector('.group input');
    pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
  };

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert(error.message); // Display Firebase authentication error message
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert(error.message); // Display Firebase authentication error message
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      alert('Error logging out'); // Display logout error message
    }
    setLoading(false);
  }

  return (
    <div id="main">
  
   
    
      {!currentUser && (
        <div className="main-wrapper">
          <div className={`card-container ${isFlipped ? 'rotate' : ''}`}>
            <div className="card">
              <div className="login-form">
                <div className="header">Log in</div>
                <div className="content">
                  <form onSubmit={handleLogin}>
                    <div className="input-field">
                      <input type="text" ref={emailRef} placeholder="Email" />
                    </div>
                    <div className="input-field">
                      <input type="password" ref={passwordRef} placeholder="Password" />
                    </div>
                    <div className="input-field">
                      <button className="btn btn-submit" type="submit">
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
                <div className="footer">
                  Don't have an account ?
                  <button className="btn btn-rotate" onClick={rotateCard}>
                    Sign up
                  </button>
                </div>
              </div>
              <div className="signup-form">
                <div className="header">Sign up</div>
                <div className="content">
                  <form onSubmit={handleSignup}>
                    <div className="input-field">
                      <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                      <input type="email" ref={emailRef} placeholder="Email" />
                    </div>
                    <div className="input-field group">
                      <input type="password" ref={passwordRef} placeholder="Password" />
                      <span className="see-password" onMouseDown={seePassword}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          {/* SVG icon */}
                        </svg>
                      </span>
                    </div>
                    <div className="input-field">
                      <button className="btn btn-submit" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div className="footer">
                  <button className="btn btn-rotate" onClick={rotateCard}>
                    I have an account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentUser && (
        <>
            
          <UploadFile />
          {/* <div>Currently logged in as: { currentUser?.email } </div> */}
          {/* <button disabled={loading || !currentUser} onClick={handleLogout}>
            Log Out
          </button> */}
        </>
      )}
    </div>
  );
}

export default RegisterFirebase;
