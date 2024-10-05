/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './profileView.css';  // Import the CSS file
import SidebarUser from "../../components/SidebarUser/sidebaruser";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const userId = JSON.parse(localStorage.getItem('user'))._id; // Assuming user ID is stored in localStorage
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/NatureHug/user/view-user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleLogout = () => {
        // Clear user-related data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to the login page
        navigate('/');
    };

    return (
        <section>
          <SidebarUser></SidebarUser>
            <div className="profile-container">
                <h1 className="greeting">Good Evening! {user.firstName}</h1>
                <div className="profile-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            value={user.firstName || ''} 
                            className="form-control" 
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            value={user.lastName || ''} 
                            className="form-control" 
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={user.email} 
                            className="form-control" 
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input 
                            type="text" 
                            id="contact" 
                            value={user.phoneNumber || ''} 
                            className="form-control" 
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label>Birthdate</label>
                        <div className="birthdate-input">
                            <input type="text" placeholder="DD" className="form-control" />
                            <input type="text" placeholder="MM" className="form-control" />
                            <input type="text" placeholder="YYYY" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <label>
                                <input type="radio" name="gender" value="Male" />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" />
                                Female
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Other" />
                                Other
                            </label>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleLogout} className="btn btn-danger">LogOut</button>
                        <button className="btn btn-primary" onClick={() => navigate(`/update-user/${userId}`)}>Update</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
