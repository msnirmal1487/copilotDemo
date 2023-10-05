import { createContext, useContext, useState } from 'react';
import { User } from '../utils/auth.service';

interface ContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Context = createContext<ContextValue>({
  user: null,
  setUser: () => {},
});

export function useUser() {
  return useContext(Context);
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
}