import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const storedValue = storage.getString(key);
  try {
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  } catch (error) {
    console.error(`Error parsing storage item ${key}:`, error);
    return null;
  }
};

export const removeItem = (key: string) => {
  storage.delete(key);
};
