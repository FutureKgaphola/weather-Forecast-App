import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

// Define the type for a place
export interface Place {
  name: string;
  temp: string;
  high: string;
  low: string;
  desc: string;
coord:{lon: number, lat: number};
}

export const useSavedPlaces = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [cities, setCities] = useState<Place[]>([]);

  const setLastItemClicked = async (value: string) => {
    try {
      await AsyncStorage.setItem('lastIndexClicked', value.toString());
    } catch (e: any) {
      console.error("Error saving to AsyncStorage:", e);
      setError(e.message || 'Failed to save places.');
    }
  }

  const getLastItemClicked = async (): Promise<string> => {
    try {
      const Value = await AsyncStorage.getItem('lastIndexClicked');
      return Value ? Value : '';
    } catch (e: any) {
      console.error("Error reading from AsyncStorage:", e);
      setError(e.message || 'Failed to fetch places.');
      return '';
    }
  };

  // Save a new place to AsyncStorage and update state, avoiding duplicates
  const setPlaces = async (value: Place) => {
    try {
      const currentList = await getPlaces(); // Fetch current saved places

      // Check if the place already exists
      const isDuplicate = currentList.some((place) => place.name === value.name);

      if (isDuplicate) {
        console.warn(`Place "${value.name}" already exists. Skipping addition.`);
        return currentList; // Return the current list unchanged
      }

      // Add new place if it's not a duplicate
      const updatedList = [...currentList, value];
      const jsonValue = JSON.stringify(updatedList);
      await AsyncStorage.setItem('my-key', jsonValue); // Save to AsyncStorage
      setCities(updatedList); // Update state
      return updatedList;
    } catch (e: any) {
      console.error("Error saving to AsyncStorage:", e);
      setError(e.message || 'Failed to save places.');
      AsyncStorage.clear(); // Clear all saved places if an error occurs maybe the memory is full
    }
  };

  const setStorageOnDelete = async (value: Place[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e: any) {
      console.error("Error saving to AsyncStorage:", e);
      setError(e.message || 'Failed to save places.');
    }
  }

  // Retrieve saved places from AsyncStorage
  const getPlaces = async (): Promise<Place[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      setCities(jsonValue ? JSON.parse(jsonValue) : []);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e: any) {
      console.error("Error reading from AsyncStorage:", e);
      setError(e.message || 'Failed to fetch places.');
      return [];
    }
  };

  return { error, cities, setPlaces, getPlaces,setLastItemClicked,getLastItemClicked,setCities,setStorageOnDelete };
};
