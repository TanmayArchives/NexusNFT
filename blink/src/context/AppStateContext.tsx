import React, { createContext, useState, ReactNode } from 'react';

interface Notification {
  message: string;
  type: 'success' | 'error';
}

interface AppStateContextType {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
}

export const AppStateContext = createContext<AppStateContextType>({
  notification: null,
  setNotification: () => {},
});

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <AppStateContext.Provider value={{ notification, setNotification }}>
      {children}
    </AppStateContext.Provider>
  );
};
