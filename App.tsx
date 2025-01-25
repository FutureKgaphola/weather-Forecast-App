import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Map from './screens/Map';
import Cities from './screens/Cities';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const Stack = createNativeStackNavigator();
  const options = { title: '', headerShown: false };
  return (
    <MenuProvider>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={options} />
          <Stack.Screen name="Map" component={Map} options={options} />
          <Stack.Screen name="Cities" component={Cities} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
