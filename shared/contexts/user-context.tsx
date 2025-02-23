import { UserStateInterface } from '@/modules/user/interfaces/user.interface';
import { useGetUserData } from '@/modules/user/services/getUserData.service';
import { useFocusEffect } from 'expo-router';
import { createContext, useCallback, useContext, useState } from 'react';

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

    async function handleGetUser() {
        try {
          const response = await useGetUserData.execute();
          setUserState({
            user: response,
          });
        } catch (err: any) {
          return err;
        }
      }
    
      useFocusEffect(
        useCallback(() => {
            handleGetUser();
        }, [])
      );    

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