import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";

    const [token, setToken] = useState("");
    const [employees, setEmployees] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : {};
    });
    const [productList, setProductList] = useState([]);
    
    // Add orderData state to store order information in context
    const [orderData, setOrderData] = useState(() => {
        const storedOrderData = localStorage.getItem("orderData");
        return storedOrderData ? JSON.parse(storedOrderData) : {
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: ''
        };
    });

    const addEmployee = async (employeeData) => {
        try {
            const response = await axios.post(`${url}/api/employees`, employeeData, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            });
            if (response.status === 201) {
                alert('Employee added successfully!');
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee.');
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${url}/api/employees`, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const loadInitialData = async () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            await fetchEmployees();
        }
    };

    const addToCart = (item) => {
        const itemId = item.id;

        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };

            if (!updatedCart[itemId]) {
                updatedCart[itemId] = { ...item, quantity: 1 };
            } else {
                updatedCart[itemId].quantity += 1;
            }

            return updatedCart;
        });

        console.log(`Added ${item.name} to cart`);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };

            if (updatedCart[itemId].quantity > 1) {
                updatedCart[itemId].quantity -= 1;
            } else {
                delete updatedCart[itemId];
            }

            return updatedCart;
        });
    };

    // Function to calculate total cart amount
    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            total += item.price * item.quantity;
        }
        return total;
    };

    // Save order data to both context and localStorage
    const saveOrderData = (data) => {
        setOrderData(data);
        localStorage.setItem("orderData", JSON.stringify(data));  // Also store in localStorage
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const contextValue = {
        url,
        token,
        setToken,
        employees,
        addEmployee,
        fetchEmployees,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        productList,
        setProductList,
        orderData,
        saveOrderData,  // Save order data method
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
