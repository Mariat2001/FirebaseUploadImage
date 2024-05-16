import React, { useState } from 'react';
import './Register.css'

function Registertest() {
    const [isFlipped, setIsFlipped] = useState(false);

    const rotateCard = () => {
        setIsFlipped(!isFlipped);
    };

    const seePassword = () => {
        const pwdInput = document.querySelector('.group input');
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
    };
  return (
  <div className="main-wrapper">
            <div className={`card-container ${isFlipped ? 'rotate' : ''}`}>
                <div className="card">
                    <div className="login-form">
                        <div className="header">Log in</div>
                        <div className="content">
                            <form>
                                <div className="input-field">
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="input-field">
                                    <input type="password" placeholder="Password" />
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
                            <form>
                                <div className="input-field">
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="input-field">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="input-field group">
                                    <input type="password" placeholder="Password" />
                                    <span className="see-password" onMouseDown={seePassword}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            {/* SVG icon */}
                                        </svg>
                                    </span>
                                </div>
                                <div className="input-field">
                                    <button className="btn btn-submit" type="submit">
                                        Get started
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
  )
}

export default Registertest
