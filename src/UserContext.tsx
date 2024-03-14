import { useState, createContext, ReactNode, useEffect } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: number;
  username: string;
  role: string;
};

export const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productionUrl = 'https://disco-app-7sxty.ondigitalocean.app';
        const currentUserGetResponse = await fetch(
          `${productionUrl}/api/users/current`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth')}`,
            },
          }
        );
        const { data: currentUserData } = await currentUserGetResponse.json();
        const currentUser = currentUserData.user;
        setUser(currentUser);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    </>
  );
};
