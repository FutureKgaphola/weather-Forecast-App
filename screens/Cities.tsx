import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Keyboard, Linking, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Place, useSavedPlaces } from "../hooks/useSavedPlaces";
import useGetWeather from "../hooks/useGetWeather";
import { FlatList } from "react-native";
import ListCities from "../components/ListCities";
import { black, TailwindSstyles, white } from "../style/appStyles";
import TextinputField from "../components/TextInput";
import LoadingView from "../components/LoadingView";

export type city_type = { high: string, low: string, name: string, temp: string };

const Cities = () => {
    const [text, setText] = useState("");
    const [ShowDeleteIcons, setShowDeleteIcons] = useState<boolean>(false);
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    const { loading,getCityCoordinates } = useGetWeather();
    const { cities, setPlaces, getPlaces, setLastItemClicked, setCities } = useSavedPlaces();
    useEffect(() => {
        getPlaces();
    }, []);

    const HandleAddPlace = () => {
        if (!text) return;
        Keyboard.dismiss();
        getCityCoordinates(text.trim()).then(async (resp) => {
            if (resp) {
                const { weatherDetails } = resp;
                try {
                    const result = await setPlaces({ name: weatherDetails?.name ?? '', temp: (((weatherDetails?.main?.temp ?? 273.15) - 273.15)).toFixed(0), high: ((weatherDetails?.forecast[0]?.maxTemp ?? 273.15) - 273.15).toFixed(0), low: ((weatherDetails?.forecast[0]?.minTemp ?? 273.15) - 273.15).toFixed(0), desc: weatherDetails?.weather[0].description ?? "", coord: { lon: weatherDetails?.coord.lon ?? 0, lat: weatherDetails?.coord.lat ?? 0 } });
                    if (result) {
                        setLastItemClicked(weatherDetails?.name.trim() ?? '');
                        setText("");
                        navigation.navigate('Home');
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }).catch((err) => console.log(err));
    }
    {/*paddingTop:45 is for getting out of the safe areaview without wrapping the screen with <safeAreaView> because we want to color that part with black as background*/ }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={TailwindSstyles.containerCity}>
                <Menu>
                    <MenuTrigger style={TailwindSstyles.MenuTrigger} />
                    <TouchableOpacity style={{ position: 'absolute', zIndex: -10, alignSelf: 'flex-end' }}>
                        <MaterialCommunityIcons
                            name={Platform.OS == 'ios' ? "dots-horizontal-circle-outline" : "dots-vertical"}
                            size={24} color="white" />
                    </TouchableOpacity>

                    <MenuOptions customStyles={{
                        optionsWrapper: {
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? -60 : -68,
                            right: 0,
                            top: 20,
                            left: Dimensions.get('window').width / 2,
                            height: 100,
                            backgroundColor: 'rgba(255, 255, 255, 0.18)',
                            borderRadius: 8,
                            padding: 8,
                            width: 150,
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                        },
                    }}>
                        <MenuOption onSelect={() => { setShowDeleteIcons(true) }}>
                            <Text style={{ color: white }}>Edit List</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => { /*will implement soon*/ }}>
                            <Text style={{ color: white }}>Celsius</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => { /*will implement soon*/ }}>
                            <Text style={{ color: white }}>Fahrenheit</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>

                <Text style={TailwindSstyles.weatherlabel}>Weather</Text>
                <View>
                    <TextinputField text={text} setText={setText} />
                    {
                        text && text !== "" ? (
                            <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
                                <TouchableOpacity onPress={() => HandleAddPlace()} style={{ backgroundColor: '#4A4947', padding: 5, borderRadius: 15 }}>
                                    <Text style={{ color: white }}>Search</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setText("")} style={{ backgroundColor: 'white', padding: 5, borderRadius: 15 }}>
                                    <Text style={{ color: black }}>Cancel</Text>
                                </TouchableOpacity>

                                {loading && <LoadingView sizeIcon='small'/>}
                            </View>
                        ) : null
                    }
                </View>
                {
                    cities ? <View style={{flex:1,marginTop:5}}>
                        <FlatList
                            data={cities}
                            renderItem={({ item }: { item: Place }) => 
                            <ListCities
                                high={item.high} low={item.low}
                                name={item.name}
                                temp={item.temp} desc={item.desc}
                                ShowDeleteIcons={ShowDeleteIcons}
                                setShowDeleteIcons={setShowDeleteIcons}
                                cities={cities}
                                setCities={setCities} />}
                            keyExtractor={(item) => item.name}
                        />
                    </View> : null
                }
                <Text style={{ color: '#D8D2C2', textAlign: 'center',marginBottom:30 }}>Learn more about <Text onPress={() => Linking?.openURL(Platform.OS == 'ios' ? 'https://support.apple.com/en-gb/105038' : "https://support.google.com/websearch/answer/13692898?hl=en")} style={{ textDecorationLine: 'underline' }}>weather data</Text> and <Text onPress={() => Linking?.openURL(Platform.OS == 'ios' ? 'https://gspe21-ssl.ls.apple.com/html/attribution.html' : '#')} style={{ textDecorationLine: 'underline' }}>map data</Text> </Text>
            </View>

        </TouchableWithoutFeedback>
    );
}

export default Cities;