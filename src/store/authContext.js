import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (username, password) => { }
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedInd] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('isLoggedIn');
        setIsLoggedInd(storedUserInfo === '1');
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedInd(false);
        history.push('/');
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedInd(true);
        history.push('/welcome');
    };

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{props.children}</AuthContext.Provider>
}
export default AuthContext;