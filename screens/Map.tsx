import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import MapViewTemplate from "../components/MapViewTemplate";

const Map = () => {
     type NavigationProp = NativeStackNavigationProp<RootStackParamList>
     const navigation = useNavigation<NavigationProp>();
     const [text, setText] = useState("");
     const [uiPlaces, SetUIplaces] = useState<any>([]);
     return (
          <SafeAreaView style={styles.safeArea}>
     <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
               <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <MapViewTemplate />
     </View>
</SafeAreaView>
     );
}

export default Map;

const styles = StyleSheet.create({
     safeArea: {
          flex: 1,
     },
     center: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
     },
     button: {
          backgroundColor: '#f2f3f5',
          position: 'absolute',
          top: 0,
          zIndex: 5,
          left: 0,
          margin: 5,
          padding: 10,
          borderRadius: 10,
     },
     buttonText: {
          fontWeight: 'bold',
     },
});
