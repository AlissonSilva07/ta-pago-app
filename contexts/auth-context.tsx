import { AuthStateInterface } from '@/interfaces/auth.interface';
import { createContext, useContext, useState } from 'react';

type AuthContextProps = {
	authState?: {
		value: AuthStateInterface;
		setValue: (value: AuthStateInterface) => void;
	};
	onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [authState, setAuthState] = useState<AuthStateInterface>({
		token: null,
        authenticated: false
	});

	const value: AuthContextProps = {
		authState: {
			value: authState,
			setValue: setAuthState,
		},
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	return useContext(AuthContext);
};
export { AuthContextProvider, useAuthContext };