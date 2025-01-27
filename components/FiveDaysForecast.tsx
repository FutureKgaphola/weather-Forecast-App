import { View } from "react-native";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { TailwindSstyles } from "../style/appStyles";
import { Text } from "react-native";
import { Image } from "react-native";
import { Fragment } from "react";


const FiveDaysForeCast = ({ forecast }: { forecast: any[] }) => {
    //since the list is static or defined to a max of 5 days,
    //  map() would be fine but for larger list Flatlist would be the best choice since it is optimized
    return (
        <View>
            {
                forecast?.map((item, index) => (
                    <View key={item.day}>
                        <Divider style={{ marginTop: 5 }} />
                        <View style={TailwindSstyles.dayContainer}>
                            <Text style={TailwindSstyles.day}>
                                {index === 0 ? 'Today' : item.day}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Image
                                    source={{
                                        uri: `http://openweathermap.org/img/wn/${item.icon}.png`,
                                    }}
                                    style={TailwindSstyles.watherIcon}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={TailwindSstyles.dayTemp}>
                                        {((item.minTemp ?? 0) - 273.15).toFixed(0)}
                                        <Text>&#8451;</Text>
                                    </Text>
                                    <View style={{ width: 70, height: 5, backgroundColor: '#fbf004' }} />
                                    <Text style={TailwindSstyles.dayTemp}>
                                        {((item.maxTemp ?? 0) - 273.15).toFixed(0)}
                                        <Text>&#8451;</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>
    );
}

export default FiveDaysForeCast;