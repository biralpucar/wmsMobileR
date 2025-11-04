import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DepoContextType {
  selectedDepo: string;
  setSelectedDepo: (depo: string) => void;
  depoOptions: DropdownOption[];
  selectedDepoInfo: DropdownOption | undefined;
  clearSelectedDepo: () => void;
}

const DepoContext = createContext<DepoContextType | undefined>(undefined);

interface DepoProviderProps {
  children: ReactNode;
}

export const DepoProvider: React.FC<DepoProviderProps> = ({ children }) => {
  const [selectedDepo, setSelectedDepoState] = useState<string>('');

  // Depo seçenekleri - tüm uygulamada standart
  const depoOptions: DropdownOption[] = [
    { label: 'Ana Depo', value: 'D001' },
    { label: 'Yedek Depo', value: 'D002' },
    { label: 'Satış Deposu', value: 'D003' },
    { label: 'İade Deposu', value: 'D004' }
  ];

  // Seçili depo bilgisini bul
  const selectedDepoInfo = depoOptions.find(depo => depo.value === selectedDepo);

  // AsyncStorage'dan depo bilgisini yükle
  useEffect(() => {
    const loadSelectedDepo = async () => {
      try {
        const savedDepo = await AsyncStorage.getItem('selectedDepo');
        if (savedDepo) {
          setSelectedDepoState(savedDepo);
        }
      } catch (error) {
        console.error('Depo bilgisi yüklenirken hata:', error);
      }
    };

    loadSelectedDepo();
  }, []);

  // Depo seçimini güncelle ve AsyncStorage'a kaydet
  const setSelectedDepo = async (depo: string) => {
    try {
      setSelectedDepoState(depo);
      await AsyncStorage.setItem('selectedDepo', depo);
    } catch (error) {
      console.error('Depo bilgisi kaydedilirken hata:', error);
    }
  };

  // Depo seçimini temizle
  const clearSelectedDepo = async () => {
    try {
      setSelectedDepoState('');
      await AsyncStorage.removeItem('selectedDepo');
    } catch (error) {
      console.error('Depo bilgisi temizlenirken hata:', error);
    }
  };

  const value: DepoContextType = {
    selectedDepo,
    setSelectedDepo,
    depoOptions,
    selectedDepoInfo,
    clearSelectedDepo
  };

  return (
    <DepoContext.Provider value={value}>
      {children}
    </DepoContext.Provider>
  );
};

// Custom hook for using depo context
export const useDepo = (): DepoContextType => {
  const context = useContext(DepoContext);
  if (!context) {
    throw new Error('useDepo must be used within a DepoProvider');
  }
  return context;
};

export default DepoContext;