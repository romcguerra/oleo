import React from 'react';
import '../styles/pages/landingLogin.css';
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div id = "page-landing">
    
            <div className= "content-wrapper">
        
                <main>
            
                    <h1>
                        Prog Oleo
                    </h1>
            
                    <Link to="/mapas" className="login-app">
                        Login
                    </Link>
            
                </main>
    
            </div>
    
        </div>
      );

}

export default Landing;