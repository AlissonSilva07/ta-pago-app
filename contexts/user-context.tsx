import { UserStateInterface } from '@/interfaces/user.context';
import { createContext, useContext, useState } from 'react';

type UserContextProps = {
    userState?: {
        value: UserStateInterface;
        setValue: (value: UserStateInterface) => void;
    };
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userState, setUserState] = useState<UserStateInterface>({
        user: null
    });

    const value: UserContextProps = {
        userState: {
            value: userState,
            setValue: setUserState,
        },
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
    return useContext(UserContext);
};
export { UserContextProvider, useUserContext };