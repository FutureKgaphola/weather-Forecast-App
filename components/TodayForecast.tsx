import { FlatList, View } from "react-native";
import { TailwindSstyles } from "../style/appStyles";
import { Image } from "react-native";
import { Text } from "react-native";

const HourlyForecast = ({ Today }: { Today: any[] }) => {

    const renderItem = ({ item, index }: { item: any; index: number }) => (
      <View
        style={TailwindSstyles.hourContainer}
        accessible={true}
        accessibilityLabel={`Weather forecast for ${
          index === 0 ? 'now' : item.time
        }, temperature: ${(item.temp - 273.15).toFixed(0)} &deg;`}
      >
        {index === 0 ? (
          <Text style={TailwindSstyles.hour}>Now</Text>
        ) : (
          <Text style={TailwindSstyles.hour}>{item.time}</Text>
        )}
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${item.icon}.png`,
          }}
          style={TailwindSstyles.watherIcon}
        />
        <Text style={TailwindSstyles.hourTemp}>
          {(item.temp - 273.15).toFixed(0)}
          <Text>&deg;</Text>
        </Text>
      </View>
    );

    return (
        <FlatList
          horizontal
          data={Today}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={TailwindSstyles.hourlyForecast}
        />
      );
    };

export default HourlyForecast;