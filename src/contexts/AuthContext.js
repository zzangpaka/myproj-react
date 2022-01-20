import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useCallback } from 'react';

export const AuthContext = createContext()

const INITIAL_AUTH = { isLoggedIn: false };

const UserInfo = (children) => {
    const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

    const login = useCallback(
        ({ access, refresh, username, first_name, last_name }) => {
        setAuth({
            isLoggedIn: true,
            access,
            refresh,
            username,
            first_name,
            last_name,
        });
        },
        [setAuth],
    );

    const logout = useCallback(() => {
        setAuth({
        isLoggedIn: false,
        });
    }, [setAuth]);

    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout}}>{children}</AuthContext.Provider>
    )

};

export default UserInfo;