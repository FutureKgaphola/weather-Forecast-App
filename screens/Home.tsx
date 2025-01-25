import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import useGetWeather, { WeatherData } from "../hooks/useGetWeather";
import { useEffect, useState } from "react";
import { MD3Colors, ProgressBar } from "react-native-paper";
const Home = () => {
    const { loading, error, getCityCoordinates, Today } = useGetWeather();
    const [backgroundImage, setBeackgroundImage] = useState<string>("");
    const [weather, setWeather] = useState<any>(null);
    const [resolved, setResolved] = useState(false);
    // useEffect(() => {
    //     getCityCoordinates().then((resp) => {
    //         console.log(resp);
    //         setWeather(resp?.weather);
    //     }).catch((err) => console.log(err));

    // }, []);

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require('../assets/clouds.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Text style={styles.city}>{weather?.name}</Text>
                    <Text style={styles.temperature}>{(((weather?.main?.temp ?? 273.15) - 273.15)).toFixed(0)}&deg;c</Text>
                    <Text style={styles.weatherType}>{weather?.weather[0]?.description}</Text>
                    <Text style={styles.highLow}>H:{((weather?.forecast[0]?.maxTemp ?? 273.15) - 273.15).toFixed(0)}&deg;  L:{((weather?.forecast[0]?.minTemp ?? 273.15) - 273.15).toFixed(0)}&deg;</Text>
                </View>
                <View style={styles.forecastContainer}>
                    <Text style={styles.forecastText}>{Today[Today.length - 1]?.weather} conditions expected around {Today[Today.length - 1]?.time}:00.</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.hourlyForecast}>
                            {Today.map((item: any, index: number) => (
                                <View key={index} style={styles.hourContainer}>
                                    {index === 0 ? <Text style={styles.hour}>Now</Text> : <Text style={styles.hour}>{item.time}</Text>}
                                    <Image source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} style={{ width: 20, height: 20, alignSelf: "center" }} />
                                    <Text style={styles.hourTemp}>{(item.temp - 270.15).toFixed(0)}°</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.dailyForecast}>
                <Text style={{flexDirection:"row",color:'white'}}>{weather?.forecast.length ?? 0}-DAY FORECAST</Text>
                    {weather?.forecast.map((item: any, index: number) => (
                        <View key={index} style={styles.dayContainer}>
                            {index === 0 ? <Text style={styles.day}>Today</Text> : <Text style={styles.day}>{item.day}</Text>}
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} style={{ width: 20, height: 20 }} />
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Text style={styles.dayTemp}>{((item.minTemp ?? 0) - 270.15).toFixed(0)}°</Text>
                                    <View style={{ width: 70, height: 5, backgroundColor:'#fbf004' }} />
                                    <Text style={styles.dayTemp}>{((item.maxTemp ?? 0) - 270.15).toFixed(0)}°</Text>
                                </View>

                            </View>

                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <Ionicons name="map-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
                    <Ionicons name="list" size={24} color="white" />
                </TouchableOpacity>

            </View>
        </ImageBackground>

    );

}

export default Home;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    bottomView: {
        height: 70,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    city: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    temperature: {
        fontSize: 72,
        fontWeight: '100',
        color: '#fff',
    },
    weatherType: {
        fontSize: 20,
        color: '#fff',
        marginVertical: 5,
    },
    highLow: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    forecastContainer: {
        marginBottom: 20,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 10,
    },
    forecastText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    hourlyForecast: {
        flexDirection: 'row',
    },
    hourContainer: {
        alignItems: 'center',
        marginRight: 15,
    },
    hour: {
        fontSize: 16,
        color: '#fff',
    },
    hourTemp: {
        fontSize: 18,
        color: '#fff',
    },
    dailyForecast: {
        marginTop: 20,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 10,
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    day: {
        fontSize: 18,
        color: '#fff',
    },
    dayTemp: {
        fontSize: 18,
        color: '#fff',
    },
});