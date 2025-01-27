
import { makeObservable, observable, action } from "mobx";

class WeatherConditions {
    weatherData: any;
    TodayTempChanges: any;

    constructor(weatherData: any, TodayTempChanges: any) {
        this.weatherData = weatherData;
        this.TodayTempChanges = TodayTempChanges;

        makeObservable(this, {
            weatherData: observable,
            TodayTempChanges: observable,
        });
    }
   
}

export default WeatherConditions;
