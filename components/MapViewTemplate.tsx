import { Platform, StyleSheet, View, Text } from "react-native";
import { TailwindSstyles } from "../style/appStyles";
import MapView, { Marker } from "react-native-maps";
import CMarker from "./customMarker";
import { useEffect, useRef, useState, memo } from "react";
import { useSavedPlaces } from "../hooks/useSavedPlaces";

const MapViewTemplate = () => {
     const [initialRegion, setInitialRegion] = useState({
          latitude: -23.9116681,
          longitude: 29.4559915,
          latitudeDelta: 4.2,
          longitudeDelta: 3.0,
     });
     const mapRef = useRef<MapView | any>();
     const { cities, getPlaces, setCities } = useSavedPlaces();
     const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

     const handleMarkerPress = (title: string) => {
          setSelectedMarker(title);
     };

     const AnimateToArea = (p: any) => {
          if (p?.lat && p?.lon) {
               mapRef.current?.animateCamera(
                    { center: { latitude: p.lat, longitude: p.lon }, zoom: 15 },
                    { duration: 1500 }
               );
          }
     };

     useEffect(() => {
          if (!cities || cities.length === 0) {
               getPlaces()
                    .then((resp) => {
                         setCities(resp);
                         if (resp.length > 0) {
                              const { lat, lon } = resp[0]?.coord;
                              setInitialRegion((prev) => ({ ...prev, latitude: lat, longitude: lon }));
                              AnimateToArea(resp[0]?.coord);
                         }
                    })
                    .catch((err) => {
                         console.log(err);
                    });
          } else {
               AnimateToArea(cities[0]?.coord);
          }
     }, [cities]);

     return (
          <View style={TailwindSstyles.map}>
               <MapView
                    style={TailwindSstyles.map}
                    mapType="standard"
                    zoomTapEnabled
                    zoomControlEnabled
                    initialRegion={initialRegion}
                    showsUserLocation
                    showsMyLocationButton
                    ref={mapRef}
               >
                    {cities?.length > 0 &&
                         cities.map((mrk) => (
                              <Marker
                                   key={mrk.name}
                                   onPress={() => handleMarkerPress(mrk?.name)}
                                   coordinate={{ latitude: mrk.coord.lat, longitude: mrk.coord.lon }}
                              >
                                   {Platform.OS === "ios" ? (
                                        <CMarker isNight={false} name={mrk?.name} temp={parseInt(mrk?.temp)} />
                                   ) : null}
                              </Marker>
                         ))}
               </MapView>

               {selectedMarker && (
                    <View style={styles.titleContainer}>
                         <Text style={TailwindSstyles.titleText}>{selectedMarker}</Text>
                    </View>
               )}
          </View>
     );
};

export default memo(MapViewTemplate);

const styles = StyleSheet.create({
     titleContainer: {
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: [{ translateX: -50 }],
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 10,
          borderRadius: 5,
     },
});
