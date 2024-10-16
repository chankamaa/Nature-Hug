import React from 'react';
import './AboutUs.css';
import { assets } from '../../assets/assets'

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="header-image">
            <img src={assets.aboutus} alt="aboutus" />
            </div>
            <div className="mission-section">
                <h2>We Believe</h2>
                <p>Everyone should live with a little more green.</p>
                <p><strong>NATURE HUG</strong> is here to help strengthen your relationship with plants.</p>
                 <p>We make buying plants easy by delivering healthy, ready-to-go plants to your door and </p>
                 <p>setting you up with the tips and tricks you need to help your plants thrive. </p>
                 <p>Plants make life better. We make plants easy.</p>
            </div>
            <div className="sections">
                <div className="section 1">
                <img src={assets.flower} alt="flower" />
                    <h3>Direct From the Greenhouse</h3>
                    <p>When you buy a houseplant from a box store or nursery, it probably spends a third of its life on a truck traveling from farm to store. That’s where NATURE HUG plants are different. Your plants are shipped directly to you from our greenhouse, usually within 2-7 days from when they're picked. With NATURE HUG, you get plants that are healthier and already thriving.</p>
                </div>
                <div className="section 2">
                <img src={assets.man} alt="man" />
                    <h3>Shipped to Your Door</h3>
                    <p>Our plants are shipped with care and experience. We’ve learned how to keep them healthy while traveling from our greenhouse to your home. NATURE HUG's shipping process ensures that your plants arrive in perfect condition, ready to make your space greener and more vibrant.</p>
                </div>
                <div className="section 3">
                <img src={assets.water} alt="water" />
                    <h3>All the Guidance</h3>
                    <p>Our expertise doesn’t stop once your plants leave our greenhouse. We’re here to help you not only with care tips but also with ongoing support to make sure your plants thrive. Whether you’re a first-time plant parent or an experienced gardener, we’re here to help every step of the way.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
