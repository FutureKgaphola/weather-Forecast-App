import axios from "axios";
import { useState } from "react";

export type WeatherData = {
    name: string;
    country: string;
    state: string;
    main: { temp: number; temp_min: number; temp_max: number };
    weather: [
        { description: string; icon: string }
    ];
    coord:{lon: number, lat: number};
};

type ForecastItem = {
    day: string;
    month: string;
    dayNum: number;
    time: number;
    temp: number;
    weather: string;
    icon: string;
};

const useGetWeather = () => {
    let tempWeather:WeatherData;
    //const [weather, setWeather] = useState<WeatherData | null>(null);
    const [Today, setToday] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCityCoordinates = async (loc: string | null) => {
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
        if (!apiKey) {
            setError("API Key is missing.");
            return;
        }

        try {
            setLoading(true);
            const resp = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=${apiKey}`
            );
            if (resp.status === 200) {
                const { lat, lon, name, country, state } = resp.data[0];
                let weatherDetails=await getWeatherDetails(lat, lon, name, country, state);

                return {weatherDetails};
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
            
        }
    };

    const getWeatherDetails = async (lat: string, lon: string, name: string, country: string, state: string) => {
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        try {
            const weatherResp = await axios.get(weatherUrl);
            if (weatherResp.status === 200) {
                tempWeather={ ...weatherResp.data, name, country, state };

                const forecastResp = await axios.get(forecastUrl);
                if (forecastResp.status === 200) {
                    const forecastData = forecastResp.data.list;
                    const forecast = forecastData.map((item: any) => {
                        const date = new Date(item.dt_txt);
                        return {
                            day: days[date.getDay()],
                            month: months[date.getMonth()],
                            dayNum: date.getDate(),
                            time: date.getHours(),
                            temp: item.main.temp,
                            weather: item.weather[0].description,
                            icon: item.weather[0].icon,
                        };
                    });

                    setToday(forecast.filter((item:any) => item.dayNum === new Date().getDate()));
                    const groupedForecast = forecast.reduce((acc: any, item: any) => {
                        const key = `${item.dayNum}-${item.month}`;
                        if (!acc[key]) {
                            acc[key] = { day: item.day, month: item.month, temps: [], weather: item.weather, icon: item.icon };
                        }
                        acc[key].temps.push(item.temp);
                        return acc;
                    }, {});

                    const next5DaysForecast = Object.values(groupedForecast).slice(0, 5).map((item: any) => {
                        const minTemp = Math.min(...item.temps);
                        const maxTemp = Math.max(...item.temps);
                        return { ...item, minTemp, maxTemp };
                    });
                    return { ...tempWeather, forecast: next5DaysForecast };
                    
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return { loading, error, getCityCoordinates, Today };
};

export default useGetWeather;
