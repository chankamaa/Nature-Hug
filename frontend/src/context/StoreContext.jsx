import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";

    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const [plants, setPlants] = useState([]);
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
            phone: '',
            userId: ''
        };
    });


    // Add clearCart function to clear the cart after the order is placed
    const clearCart = () => {
        setCartItems({});  // Clear the cartItems state
        localStorage.removeItem("cartItems");  // Remove cart data from localStorage
    };
    
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
            await fetchEmployees();  // Ensure employees are fetched after token is set
        }
    };

    const fetchplants = async () => {
        const response = await axios.get(url + "/api/plants");
        setPlants(response.data.data);
    };

    const addToCart = (item) => {
        const itemId = item._id;

        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };

            if (!updatedCart[itemId]) {
                updatedCart[itemId] = { ...item, quantity: 1 };
            } else {
                updatedCart[itemId].quantity += 1;
            }

            // Save to local storage
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };

            if (updatedCart[itemId].quantity > 1) {
                updatedCart[itemId].quantity -= 1;
            } else {
                delete updatedCart[itemId];
            }

            // Save to local storage
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
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

    // Add this to StoreContext to handle quantity updates
    const increaseQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[itemId].quantity += 1;
      return updatedItems;
    });
    };
  
    const decreaseQuantity = (itemId) => {
        setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        if (updatedItems[itemId].quantity > 1) {
            updatedItems[itemId].quantity -= 1;
        } else {
            delete updatedItems[itemId];
        }
        return updatedItems;
        });
    };
  

    // Save order data to both context and localStorage
    const saveOrderData = (data) => {
        setOrderData(data);
        localStorage.setItem("orderData", JSON.stringify(data));  // Also store in localStorage
    };

    
    useEffect(() => {
        loadInitialData();  // Moved the logic to a reusable function
        fetchplants();      // Fetch plants on load
    }, []);

    useEffect(() => {
        const storedOrderData = localStorage.getItem("orderData");
        if (storedOrderData) {
            const parsedOrderData = JSON.parse(storedOrderData);
            setOrderData(parsedOrderData);
            console.log("Loaded orderData:", parsedOrderData);  // Add this to debug
        }
    }, []);
    
    const handleLogin = (loginResponse) => {
        const userId = loginResponse.data.userId;  // Assuming this is where the userId comes from
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            userId: userId,
        }));
        localStorage.setItem('orderData', JSON.stringify({
            ...orderData,
            userId: userId,
        }));
    };
    
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
        plants,
        fetchplants,
        increaseQuantity,
        decreaseQuantity,
        handleLogin,  // Add handleLogin to context
        clearCart,  // Add clearCart to the context
        
        
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
