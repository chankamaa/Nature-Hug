import axios from 'axios';
import { createContext, useEffect } from 'react'
import { useState } from 'react'
import React from 'react'

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {
    return (
        <StoreContext.Provider value={{}}>
            {props.children}
        </StoreContext.Provider>
    )
}



export default StoreContextProvider;