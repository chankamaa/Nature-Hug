import React from 'react';
import './PlantLifeBlog.css';
import { assets } from '../../assets/assets'; // Ensure your images are properly referenced
import { useNavigate } from 'react-router-dom'; 

const PlantLifeBlog = () => {
    const navigate = useNavigate();

    return (
        <div className="plant-life-blog-container">
            <div className="header-image">
                <img src={assets.aboutus} alt="aboutus" />
            </div>
            <div className="intro-section">
                <h2>Welcome to the Plant Life Blog</h2>
                <p>Explore the world of plants and discover how they can make your life better.</p>
                <p>From tips on plant care to understanding the benefits of greenery in your home, our blog covers all you need to know about living with plants.</p>
            </div>

            <div className="blog-sections">
                {/* Blog Section 1 */}
                <div className="blog-section">
                    <img src={assets.water} alt="water" />
                    <h3>Top 5 Plant Care Tips for Beginners</h3>
                    <p>Starting your plant journey? Check out our top 5 plant care tips to keep your plants happy and healthy. Whether you are a beginner or seasoned gardener, these tips will help your plants thrive.</p>
                    <p>author: "Jane Doe",
                    date: "October 5, 2024"</p>
                </div>

                {/* Blog Section 2 */}
                <div className="blog-section">
                    <img src={assets.Money_plant} alt="Money_plant" />
                    <h3>The Benefits of Having Plants in Your Home</h3>
                    <p>Did you know that plants not only purify the air but also boost your mood? Learn about the amazing benefits of indoor plants and how they can improve your living space and well-being.</p>
                    <p>author: "John Smith",
                    date: "September 29, 2024"</p>
                    
                </div>

                {/* Blog Section 3 */}
                <div className="blog-section">
                    <img src={assets.Bird_of_paradise} alt="Bird_of_paradise" />
                    <h3>Incorporating Plants into Your Home Decor</h3>
                    <p>Plants are not just for the garden! Discover creative ways to incorporate plants into your home decor to make your living space greener and more vibrant.</p>
                    <p>author: "Emily Green",
                    date: "September 15, 2024"</p>
                    
                </div>

                {/* Blog Section 4 */}
                <div className="blog-section">
                    <img src={assets.flower} alt="flower" />
                    <h3>How to Start Your Own Outdoor Garden</h3>
                    <p>Dreaming of growing your own herbs and flowers? Our guide on outdoor gardening will get you started with the basics, from choosing the right plants to preparing the soil.</p>
                    <p>author: "Anna Leaf",
                    date: "August 30, 2024"</p>
                    
                </div>
            </div>
        </div>
    );
};

export default PlantLifeBlog;
