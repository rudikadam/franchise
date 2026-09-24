import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-bars">
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
            </div>
        </div>
    );
};

export default Loader;
