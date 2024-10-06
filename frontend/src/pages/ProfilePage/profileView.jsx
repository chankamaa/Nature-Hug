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
            <SidebarUser />
            <div className="userProfileContainer">
                <h1 className="welcomeMessage">Good Morning! {user.firstName}</h1>
                <div className="userInfoForm">
                    <div className="formField">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            value={user.firstName || ''} 
                            className="inputField" 
                            readOnly 
                        />
                    </div>
                    <div className="formField">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            value={user.lastName || ''} 
                            className="inputField" 
                            readOnly 
                        />
                    </div>
                    <div className="formField">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={user.email} 
                            className="inputField" 
                            readOnly 
                        />
                    </div>
                    <div className="formField">
                        <label htmlFor="contact">Contact Number</label>
                        <input 
                            type="text" 
                            id="contact" 
                            value={user.phoneNumber || ''} 
                            className="inputField" 
                            readOnly 
                        />
                    </div>
                    <div className="formField">
                        <label>Birthdate</label>
                        <div className="dateInputGroup">
                            <input 
                                type="number" 
                                placeholder="DD" 
                                className="inputField" 
                                min="1" 
                                max="31" 
                                required 
                            />
                            <input 
                                type="number" 
                                placeholder="MM" 
                                className="inputField" 
                                min="1" 
                                max="12" 
                                required 
                            />
                            <input 
                                type="number" 
                                placeholder="YYYY" 
                                className="inputField" 
                                min="1900" 
                                max={new Date().getFullYear()} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="formField">
                        <label>Gender</label>
                        <div className="genderSelection">
                            <label>
                                <input type="radio" name="gender" value="Male" />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="buttonGroup">
                        <button onClick={handleLogout} className="button logoutButton">LogOut</button>
                        <button className="button updateButton" onClick={() => navigate(`/update-user/${userId}`)}>Update</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
