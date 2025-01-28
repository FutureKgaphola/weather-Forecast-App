//this code is not used yet. I just defined the implementation. therefore it is not called anywhere
const useTempChanger=()=>{
     function convertTemperature(value:number, unit:string) {
        if (unit === "C") {
          return (value * 9) / 5 + 32;
        } else if (unit === "F") {
          return ((value - 32) * 5) / 9;
        } else {
          throw new Error("Invalid unit. Use 'C' for Celsius or 'F' for Fahrenheit.");
        }
      }

      return {convertTemperature}
}