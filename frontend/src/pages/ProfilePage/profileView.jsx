import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './profileView.css';  // Import the CSS file

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
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="card mb-4 w-100">
                            <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" />
                                <h5 className="my-3">{user.firstName || 'User Name'}</h5>
                                <p className="text-muted mb-4">{user.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.firstName + " " + user.lastName || 'N/A'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.phoneNumber || 'N/A'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <button onClick={handleLogout} className="btn btn-danger">LogOut</button>
                                    <button className="btn btn-danger" onClick={() => navigate(`/update-user/${userId}`)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
