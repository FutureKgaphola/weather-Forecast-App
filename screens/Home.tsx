import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import useGetWeather from "../hooks/useGetWeather";
import { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import WeatherConditions from "../Store";
import { observer } from "mobx-react";
import { useSavedPlaces } from "../hooks/useSavedPlaces";
import { black, TailwindSstyles, white } from "../style/appStyles";
const Home = () => {
    const { loading, error, getCityCoordinates, Today } = useGetWeather();
    const [weather, setWeather] = useState<any>(null);
    const { cities, getPlaces, getLastItemClicked } = useSavedPlaces();
    useEffect(() => {
        getPlaces().then(async (resp) => {
            if (resp?.length > 0) {
                let index = 0;
                const area = await getLastItemClicked();
                if (area) {
                    index = resp.findIndex((item) => item.name === area);
                }
                const city = resp[index ?? 0]?.name;
                if (city) {
                    getCityCoordinates(city).then((resp) => {
                        if (resp) {
                            let das = new WeatherConditions(resp.weatherDetails, Today);
                            setWeather(das.weatherData);
                        }
                    }).catch((err) => console.log(err));
                }
            }
        }).catch(err => console.log(err));

    }, []);

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={{ flex: 1 }}>
            {
                cities && cities.length > 0 ? (
                    <ImageBackground
                        source={require('../assets/night-stars.jpg')}
                        style={TailwindSstyles.background}
                    >
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={TailwindSstyles.container}>

                                <View style={TailwindSstyles.containTop}>
                                    <Text style={TailwindSstyles.city}>{weather?.name}</Text>
                                    <Text style={TailwindSstyles.temperature}>{(((weather?.main?.temp ?? 273.15) - 273.15)).toFixed(0)}&deg;</Text>
                                    <Text style={TailwindSstyles.weatherType}>{weather?.weather[0]?.description}</Text>
                                    <Text style={TailwindSstyles.highLow}>H:{((weather?.forecast[0]?.maxTemp ?? 273.15) - 273.15).toFixed(0)}&deg;  L:{((weather?.forecast[0]?.minTemp ?? 273.15) - 273.15).toFixed(0)}&deg;</Text>
                                </View>
                                {
                                    Today?.length > 0 ? (
                                        <View style={TailwindSstyles.forecastContainer}>
                                            <Text style={TailwindSstyles.forecastText}>{Today[Today.length - 1]?.weather} conditions expected around {Today[Today.length - 1]?.time}:00.</Text>
                                            <Divider />
                                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                <View style={TailwindSstyles.hourlyForecast}>
                                                    {Today.map((item: any, index: number) => (
                                                        <View key={index} style={TailwindSstyles.hourContainer}>
                                                            {index === 0 ? <Text style={TailwindSstyles.hour}>Now</Text> : <Text style={TailwindSstyles.hour}>{item.time}</Text>}
                                                            <Image source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} style={TailwindSstyles.watherIcon} />
                                                            <Text style={TailwindSstyles.hourTemp}>{(item.temp - 270.15).toFixed(0)}&deg;</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    ) : null
                                }


                                <View style={TailwindSstyles.dailyForecast}>
                                    <Text style={{ flexDirection: "row", color: white }}><EvilIcons name="calendar" size={18} color={white} />{weather?.forecast.length ?? 0}-DAY FORECAST</Text>
                                    {weather?.forecast.map((item: any, index: number) => (
                                        <View key={index} >
                                            <Divider style={{ marginTop: 5 }} />
                                            <View style={TailwindSstyles.dayContainer}>
                                                {index === 0 ? <Text style={TailwindSstyles.day}>Today</Text> : <Text style={TailwindSstyles.day}>{item.day}</Text>}
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                    <Image source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} style={TailwindSstyles.watherIcon} />
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                        <Text style={TailwindSstyles.dayTemp}>{((item.minTemp ?? 0) - 270.15).toFixed(0)}&deg;</Text>
                                                        <View style={{ width: 70, height: 5, backgroundColor: '#fbf004' }} />
                                                        <Text style={TailwindSstyles.dayTemp}>{((item.maxTemp ?? 0) - 270.15).toFixed(0)}&deg;</Text>
                                                    </View>

                                                </View>

                                            </View>

                                        </View>
                                    ))}

                                </View>
                            </View>
                        </ScrollView>
                        <View style={TailwindSstyles.bottomView}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Ionicons name="map-outline" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
                                <Ionicons name="list" size={24} color="white" />
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                ) : <View style={TailwindSstyles.contWelcome}>
                    <Image source={require('../assets/weather.png')} style={{ width: 90, height: 90, alignSelf: 'center', zIndex: 5 }} />
                    <Text style={{ color: white }}>Let's add a city first</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cities')}
                        style={{ backgroundColor: '#D8D2C2', padding: 15, borderRadius: 15 }}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>

            }
        </View>
    );

}

export default observer(Home);
