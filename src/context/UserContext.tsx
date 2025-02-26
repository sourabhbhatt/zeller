import React, {createContext, useContext, useState, ReactNode} from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{selectedUser, setSelectedUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
