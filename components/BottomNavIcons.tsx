import { TouchableOpacity } from "react-native";
import { TailwindSstyles } from "../style/appStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/appTypes";
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={TailwindSstyles.bottomView}>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Ionicons name="map-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cities')}>
                <Ionicons name="list" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default BottomNav;