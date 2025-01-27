import { Image, View } from "react-native";
import { TailwindSstyles, white } from "../style/appStyles";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/appTypes";
import { useNavigation } from "@react-navigation/native";

const WelcomeView = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={TailwindSstyles.contWelcome}>
            <Image source={require('../assets/weather.png')} style={{ width: 90, height: 90, alignSelf: 'center', zIndex: 5 }} />
            <Text style={{ color: white }}>Let's add a city first</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cities')}
                style={{ backgroundColor: '#D8D2C2', padding: 15, borderRadius: 15 }}>
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeView;