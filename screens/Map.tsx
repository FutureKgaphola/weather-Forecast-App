import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Map = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
         const navigation = useNavigation<NavigationProp>();
    return ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Map" onPress={() => navigation.navigate('Home')}>
        
      </Button>
            </View> );
}
 
export default Map;