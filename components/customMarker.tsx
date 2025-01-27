import { Image, Text, View } from "react-native";

const CMarker = ({ isNight, name, temp }: { isNight: boolean, name: string, temp: number }) => {
    return (
        <View>
            {isNight ? <View style={{ padding: 10 }}>
                <Text style={{ backgroundColor: 'white', fontSize: 12, borderRadius: 55, padding: 9, top: 15, position: 'absolute', zIndex: 5, alignSelf: 'center' }}>{temp}&deg;</Text>
                <Image source={require('../assets/marker_night.png')} style={{ width: 70, height: 70 }} />

                <View style={{ position: 'absolute', alignSelf: 'center', bottom: 0, marginTop: 10 }}>
                    <Image source={require('../assets/half-moon.png')} style={{ zIndex: 5, width: 15, alignSelf: 'center', height: 15 }} />
                    <Text style={{ zIndex: 5, marginTop: 8,color:isNight ? 'red' :'black' }}>{name}</Text>
                </View>
            </View> :
                <View style={{ padding: 10 }}>
                    <Text style={{ backgroundColor: 'white', fontSize: 12, borderRadius: 55, padding: 9, top: 15, position: 'absolute', zIndex: 5, alignSelf: 'center' }}>{temp}&deg;</Text>
                    <Image source={require('../assets/marker.png')} style={{ width: 70, height: 70 }} />
                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 0, marginTop: 10 }}>
                        <Image source={require('../assets/cloudy.png')} style={{ zIndex: 5, width: 15, alignSelf: 'center', height: 15 }} />
                        <Text style={{ zIndex: 5, marginTop: 8,color:isNight ? 'red' :'black' }}>{name}</Text>
                    </View>
                </View>}
        </View>

    );
}

export default CMarker;