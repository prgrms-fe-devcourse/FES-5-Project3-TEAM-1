import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../libs/supabase";


interface AuthContextType {
	isLoggedIn : boolean,
	login : () => void,
	logout : () => void,
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({data : {session}}) => {
			setIsLoggedIn(!!session);
		})

		const {data:authListener} = supabase.auth.onAuthStateChange((_event, session) => {
			setIsLoggedIn(!!session);
		})

		return () => {
			authListener.subscription.unsubscribe();
		}
	}, []);

	const login = () => {
		setIsLoggedIn(true);
	}

	const logout = () => {
		setIsLoggedIn(false);
	}

	const value : AuthContextType = {
		isLoggedIn,
		login,
		logout,
	}

	return (
		<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
}