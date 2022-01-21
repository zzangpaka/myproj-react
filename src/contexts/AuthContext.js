import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useCallback, useContext } from 'react';

export const AuthContext = createContext()

const INITIAL_AUTH = { isLoggedIn: false };

function AuthProvider({children}) {
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
        <AuthContext.Provider value={[auth, setAuth, login, logout]}>{children}</AuthContext.Provider>
    );
};

function useAuth() {
    return useContext(AuthContext);
};

export {AuthProvider, useAuth};