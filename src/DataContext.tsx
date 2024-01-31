import { ReactNode, createContext, useContext, useState } from 'react';

interface DataProviderProps {
  children: ReactNode;
}

interface DataContextProps {
  data: any;
  updateData: (newData: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState('Default Data');

  const updateData = (newData: any) => {
    setData(newData);
  };

  const contextValue: DataContextProps = {
    data,
    updateData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): [DataContextProps, React.FC<DataProviderProps>] => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return [context, DataProvider];
};
