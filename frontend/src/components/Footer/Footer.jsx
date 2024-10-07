import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'; // Add this line

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={assets.logo} alt="Nature Hug Logo" />
                    <img src={assets.handcr} alt="" />
                </div>
                <div className="footer-company">
                    <h4>COMPANY</h4>
                    <ul>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Reviews</li>
                        <li>Our Guarantee</li>
                    </ul>
                </div>
                <div className="footer-support">
                    <h4>SUPPORT</h4>
                    <ul>
                        <li>Contact Support</li>
                        <li>Track order</li>
                    </ul>
                </div>
                <div className="footer-plant-questions">
                    <h4>PLANT QUESTIONS?</h4>
                    <ul>
                    <li><Link to="/PlantCareTips">Plant Care Tips</Link></li>
                    <li><Link to="/PlantLifeBlog">Plant Life Blog</Link></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <div className="footer-terms">
                    {/* Update these with Links */}
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                </div>
                <div className="footer-social">
                    <img src={assets.fb_icon} alt="Facebook" />
                    <img src={assets.insta} alt="Instagram" />
                    <img src={assets.tiktok} alt="TikTok" />
                    <img src={assets.whatsapp} alt="WhatsApp" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;
