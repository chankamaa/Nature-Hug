import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import React from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Store the backend URL
    const url = "http://localhost:4000";

    // Example states
    const [token, setToken] = useState("");
    const [plants, setPlants] = useState([]);
    const [employees, setEmployees] = useState([]);

    // Function to add a new employee
    const addEmployee = async (employeeData) => {
        try {
            const response = await axios.post(url + "/api/employees", employeeData, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            });
            if (response.status === 201) {
                alert('Employee added successfully!');
                fetchEmployees(); // Refresh the employee list after adding a new one
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee.');
        }
    };

    // Function to fetch all employees
    const fetchEmployees = async () => {
        try {
            const response = await axios.get(url + "/api/employees", { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Function to load initial data when the app starts
    const loadInitialData = async () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            await fetchEmployees();  // Fetch employees if a token exists at startup
        }
    };
    const fetchplants = async () => {
        const response = await axios.get(url + "/api/plants");
        setPlants(response.data.data);
    }


    useEffect(() => {
        async function loadData(){
            await fetchplants();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        employees,
        addEmployee,
        fetchEmployees,
        plants,
        fetchplants
    };
    

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};


export default StoreContextProvider;

