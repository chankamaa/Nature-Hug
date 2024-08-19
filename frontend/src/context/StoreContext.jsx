import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import React from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Store the backend URL
    const url = "http://localhost:4000";

    // Example states (similar to your other project)
    const [token, setToken] = useState("");
    const [employees, setEmployees] = useState([]);

    // Function to add a new employee
    const addEmployee = async (employeeData) => {
        try {
            const response = await axios.post(url + "/api/employees", employeeData, {
                headers: { 'Content-Type': 'application/json', token }
            });
            if (response.status === 201) {
                alert('Employee added successfully!');
                // Optionally, you could refresh the employee list after adding a new one
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee.');
        }
    };

    // Function to fetch all employees (if needed)
    const fetchEmployees = async () => {
        try {
            const response = await axios.get(url + "/api/employees", { headers: { token } });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Similar to loadCartData, you can load initial data here
    const loadInitialData = async () => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await fetchEmployees();  // Fetch employees if needed at startup
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        employees,
        addEmployee,
        fetchEmployees
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
