import React, { createContext, useState } from 'react';
import BottomNavigator from '../components/Molecules/BottomNav/BottomNavigator';

export const NavigatorContext = createContext();

export const NavigatorProvider = (props) => {   

    const [show, setShow] = useState(true);

    return (
        <NavigatorContext.Provider
            value={{setShowNavigator: setShow}}   
        >
            {
                props.children
            }
            {
                show?<BottomNavigator />:<></>
            }
        </NavigatorContext.Provider>
    );
    
}