import { Product } from '../types';

export const loadState = (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Error loading state:', err);
      return undefined;
    }
  };
  
  export const saveState = (key: string, state: Product[]) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Error saving state:', err);
    }
  };
  