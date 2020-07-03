import React, { createContext, useState } from 'react';
import io from "socket.io-client";
import { ROOT_WS } from '../constants/routes';

export const SocketContext = createContext();

const socket = io(ROOT_WS, {
    query: "token=123"
});

export const SocketProvider = (props) => {   

    return (
        <SocketContext.Provider
            value={{socket}}   
        >
            {
                props.children
            }
        </SocketContext.Provider>
    );
    
}