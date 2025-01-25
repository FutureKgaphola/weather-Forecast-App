import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const useSavedPlaces=()=>{
    const [error,setError]=useState(undefined);
    const storeData = async (value:any) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('my-key', jsonValue);
        } catch (e:any) {
          // saving error
          setError(e.message);
        }
      };

      const getData = async () => {
        let datafound;
        try {
          const value = await AsyncStorage.getItem('my-key');
          if (value !== null) {
            // value previously stored
            datafound=value;
          }
        } catch (e:any) {
          // error reading value
          setError(e.message);
        }finally{
            return datafound;
        } 
      };

}