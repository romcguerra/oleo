import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import '../styles/pages/landing.css';
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div id = "page-landing">
    
            <div className= "content-wrapper">
        
                <main>
            
                    <h1>
                        Prog Oleo
                    </h1>
                    
                    <Link to="/login" className="enter-app">
                        <FiArrowRight size= { 26} color="0, 0, 0, 0.6" />
                    </Link>
            
                </main>
    
            </div>
    
        </div>
      );

}

export default Landing;