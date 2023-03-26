import React from 'react';
type AppContextType = {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const useAppContext: () => AppContextType;
declare const AppProvider: React.FC;
export default AppProvider;
