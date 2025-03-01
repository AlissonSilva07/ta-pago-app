import { GetUserOutputDto } from '@/modules/user/interfaces/user.interface';
import { useGetUserData } from '@/modules/user/services/getUserData.service';
import { useFocusEffect } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type UserContextProps = {
  userState: {
    value: GetUserOutputDto;
    setValue: (value: GetUserOutputDto) => void;
  };
  getUserState: () => void
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, setUserState] = useState<GetUserOutputDto>({} as GetUserOutputDto);

  async function handleGetUser() {
    try {    
      const response = await useGetUserData.execute();
      if (response) setUserState(response);
    } catch (err: any) {
      console.error("Failed to fetch user data:", err);
    }
  }

  const value: UserContextProps = {
    userState: {
      value: userState,
      setValue: setUserState,
    },
    getUserState: handleGetUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUserContext };
