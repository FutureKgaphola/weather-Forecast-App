const useTempChanger=()=>{
     function convertTemperature(value:number, unit:string) {
        if (unit === "C") {
          // Convert Celsius to Fahrenheit
          return (value * 9) / 5 + 32;
        } else if (unit === "F") {
          // Convert Fahrenheit to Celsius
          return ((value - 32) * 5) / 9;
        } else {
          throw new Error("Invalid unit. Use 'C' for Celsius or 'F' for Fahrenheit.");
        }
      }

      return {convertTemperature}
}