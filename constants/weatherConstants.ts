//This constants have not been used yet. thier purpose is to dynamically change images based on weather conditions per place.
const Thunderstorm = [
    {
        condition: 'thunderstorm with light rain',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'thunderstorm with rain',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'light thunderstorm',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Drizzle = [
    {
        condition: 'light intensity drizzle',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'drizzle',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'heavy intensity drizzle',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Rain = [
    {
        condition: 'light rain',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'moderate rain',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'heavy intensity rain',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Snow = [
    {
        condition: 'light snow',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'snow',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'heavy snow',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Atmosphere = [
    {
        condition: 'mist',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'smoke',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'haze',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Clear = [
    {
        condition: 'clear sky',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more
];
const Clouds = [
    {
        condition: 'few clouds: 11-25%',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'scattered clouds: 25-50%',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'broken clouds: 51-84%',
        image: '../assets/clouds.jpg'
    },
    {
        condition: 'overcast clouds: 85-100%',
        image: '../assets/clouds.jpg'
    },
    //the list is long based on documentation https://openweathermap.org/weather-conditions
    //you may add more

];

export { Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clear, Clouds }