import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext(
    {
        isLoggedIn: false,
        onLogout: () => {}, //Help IDE suggest value
        onLogin: () => {}
    }
);

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

// Keeps User on Authenticated Screen By Holding a Key
useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInfo === '1'){
      setIsLoggedIn(true);
    }}, []);

function logoutHandler(){
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
}

function loginHandler(){
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
}


    return (
    <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler, 
        onLogin:loginHandler,
    }}> 
        {props.children} 
    </AuthContext.Provider>)
}

export default AuthContext;