import { s } from "react-native-wind";
const TailwindSstyles = {
    containTop:s`justify-center items-center mt-12`,
    background: s`flex-1 resize-cover flex-col`,
    bottomView: s`h-16 bg-Deepsecondshado absolute bottom-0 left-0 right-0 items-center px-5 pb-6 flex-row justify-between`,
    container: s`flex-1 p-5`,
    city: s`text-4xl font-bold text-white mb-2.5`,
    temperature: s`text-7xl font-thin text-white`,
    weatherType: s`text-xl text-white my-1.5`,
    highLow: s`text-base text-white mb-4`,
    forecastContainer: s`mb-4 border-borderColorShado bg-secondshado p-2.5 rounded-lg`,
    forecastText: s`text-base text-white mb-2.5`,
    hourlyForecast: s`flex-row`,
    hourContainer: s`items-center mr-3.5`,
    hour: s`text-base text-white`,
    hourTemp: s`text-lg text-white`,
    dailyForecast: s`mt-5 border-borderColorShado bg-secondshado p-2.5 rounded-2.5`,
    dayContainer: s`flex-row justify-between mb-2.5`,
    day: s`text-lg text-white`,
    dayTemp: s`text-lg text-white`,
    watherIcon:s`w-5 h-5 alignSelf-center`,
    contWelcome:s`flex-1 gap-4 justify-center items-center bg-black`,

    containerCity:s`flex-1 pt-11 bg-black p-1 gap-5`,
    MenuTrigger:s`z-10 w-64 justify-center, items-center self-center, p-3.5`,
    weatherlabel: s`text-white text-4xl font-bold pb-1.5`,

    map:s`w-full h-full`,
    titleText:s`text-white text-base font-bold`,


    HomeMap: s`mt-5 border-borderColorShado bg-secondshado p-2.5 rounded-2.5 h-52 mb-4`,


  };

   const white='white'
   const black='black'

  export {TailwindSstyles,white,black}


  