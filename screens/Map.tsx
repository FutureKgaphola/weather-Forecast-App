import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { Marker } from "react-native-maps";
import { memo, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CMarker from "../components/customMarker";
import { useSavedPlaces } from "../hooks/useSavedPlaces";

const Map = () => {
     type NavigationProp = NativeStackNavigationProp<RootStackParamList>
     const navigation = useNavigation<NavigationProp>();
     const [text, setText] = useState("");
     const [uiPlaces, SetUIplaces] = useState<any>([]);
     const [lat, setLat] = useState(-23.9116681);
     const [lon, setLon] = useState(29.4559915);
     const mapRef = useRef<MapView | any>();
     const { cities, getPlaces, setCities } = useSavedPlaces();


     const AnimateToArea = (p: any) => {
          mapRef.current?.animateCamera({ center: { latitude: p?.lat, longitude: p?.lon }, zoom: 15 }, { duration: 1500 });
     }
     useEffect(() => {

          if (!cities || cities?.length == 0)
               getPlaces().then((resp) => {
                    setCities(resp);
               }).catch(err => {
                    console.log(err);
               })
          AnimateToArea(cities[0]?.coord);
     }, []);
     const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
     const handleMarkerPress = (title: string) => {
          setSelectedMarker(title);
     };
     return (
          <SafeAreaView style={{ flex: 1 }}>
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                         style={{ backgroundColor: '#f2f3f5', position: 'absolute', top: 0, zIndex: 5, left: 0, margin: 5, padding: 10, borderRadius: 10 }}
                         onPress={() => navigation.navigate('Home')}>
                         <Text style={{ fontWeight: 'bold' }}>Done</Text>
                    </TouchableOpacity>
                    <MapView
                         style={styles.map}
                         mapType="standard"
                         zoomTapEnabled
                         zoomControlEnabled
                         region={{
                              latitude: cities[0]?.coord.lat ?? lat,
                              longitude: cities[0]?.coord.lon ?? lon,
                              latitudeDelta: 4.2,
                              longitudeDelta: 3.0,
                         }}
                         showsUserLocation
                         showsMyLocationButton
                         ref={mapRef}
                    >
                         {
                              cities?.length > 0 && cities?.map((mrk) => (
                                   <Marker key={mrk.name}
                                        onPress={() => handleMarkerPress(mrk?.name)}
                                        coordinate={{ latitude: mrk.coord.lat, longitude: mrk.coord.lon }}>
                                        {Platform.OS == "ios" ? <CMarker isNight={true} name={mrk?.name} temp={parseInt(mrk?.temp)} /> : null}
                                   </Marker>
                              ))
                         }
                    </MapView>


                    {selectedMarker && (
                         <View style={styles.titleContainer}>
                              <Text style={styles.titleText}>{selectedMarker}</Text>
                         </View>
                    )}
               </View>
          </SafeAreaView>
     );
}

export default memo(Map);

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     map: {
          width: '100%',
          height: '100%',
     },
     titleContainer: {
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: [{ translateX: -50 }],
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 10,
          borderRadius: 5,
     },
     titleText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
     }
});