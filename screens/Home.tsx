import { useNavigation } from "@react-navigation/native";
import { ImageBackground, ScrollView, Text, View } from "react-native";
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
import { TailwindSstyles, white } from "../style/appStyles";
import HourlyForecast from "../components/TodayForecast";
import FiveDaysForeCast from "../components/FiveDaysForecast";
import BottomNav from "../components/BottomNavIcons";
import WelcomeView from "../components/WelcomeView";
import LoadingView from "../components/LoadingView";

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
                        {
                            !loading ? (
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
                                                    <HourlyForecast Today={Today} />
                                                </View>
                                            ) : null
                                        }

                                        <View style={TailwindSstyles.dailyForecast}>
                                            <Text style={{ flexDirection: "row", color: white }}><EvilIcons name="calendar" size={18} color={white} />{weather?.forecast.length ?? 0}-DAY FORECAST</Text>
                                            <FiveDaysForeCast forecast={weather?.forecast} />
                                        </View>
                                    </View>
                                </ScrollView>
                            ) : <LoadingView />
                        }

                        <BottomNav />
                    </ImageBackground>
                ) : <WelcomeView />
            }
        </View>
    );

}

export default observer(Home);
