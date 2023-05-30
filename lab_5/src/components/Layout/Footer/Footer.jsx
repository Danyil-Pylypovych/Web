import React from 'react';
import Navbar from "../Navigation/Navbar.jsx";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__body">
                <div className="footer__info">
                    <div className="footer__text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at culpa earum ex excepturi
                            fugit incidunt inventore modi nemo temporibus!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, velit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, sint.</p>
                    </div>
                </div>
               <Navbar/>
            </div>
        </footer>
    );
};

export default Footer;
