import React, { createContext, useContext, useState} from "react";
 type ThemeContextType = {
    dark: boolean;
    toggleTheme: () => void;
 };

 const ThemeContext = createContext<ThemeContextType>({
    dark: false,
    toggleTheme: () => {},
 });

 export function ThemeProvider({ children}: { children: React.ReactNode }) {
    const [dark, setDark] = useState(false);

    function toggleTheme() {
        setDark((prev) => !prev);
    }
    return(
        <ThemeContext.Provider value={{ dark, toggleTheme}}>
        {children}
        </ThemeContext.Provider>
    );
 }
 export function useTheme(){
    return useContext(ThemeContext);
 }