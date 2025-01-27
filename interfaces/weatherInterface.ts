export interface IWeather {
    weather: {
        base: string;
        clouds: number;
        cod: number;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        dt: number;
        forecast: {
            day: string;
            month: string;
            temps: number[];
            weather: string;
            icon: string;
            minTemp: number;
            maxTemp: number;
        }[];
        id: number;
        main: {
            feels_like: number;
            humidity: number;
            pressure: number;
            temp: number;
            temp_max: number;
            temp_min: number;
        };
        name: string;
        state: string;
        sys: {
            country: string;
            id: number;
            sunrise: number;
            sunset: number;
            type: number;
        };
        timezone: number;
        visibility: number;
        weatherDetails: {
            description: string;
            icon: string;
            id: number;
            main: string;
        }[];
        wind: {
            deg: number;
            speed: number;
        };
    };
}

export let sampleData: IWeather = {
    weather: {
        base: '',
        clouds: 0,
        cod: 0,
        coord: {
            lat: 0,
            lon: 0,
        },
        country: '',
        dt: 0,
        forecast: [
            {
                day: '',
                month: '',
                temps: [],
                weather: '',
                icon: '',
                minTemp: 0,
                maxTemp: 0,
            },
        ],
        id: 0,
        main: {
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        },
        name: '',
        state: '',
        sys: {
            country: '',
            id: 0,
            sunrise: 0,
            sunset: 0,
            type: 0,
        },
        timezone: 0,
        visibility: 0,
        weatherDetails: [
            {
                description: '',
                icon: '',
                id: 0,
                main: '',
            },
        ],
        wind: {
            deg: 0,
            speed: 0,
        },
    },
};
