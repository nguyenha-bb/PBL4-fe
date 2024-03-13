import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [reloadSidebar, setReloadSidebar] = useState(false);

    const contextValue = {
        reloadSidebar,
        setReloadSidebar,
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
