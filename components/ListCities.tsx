import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { ImageBackground } from "react-native";
import { Place, useSavedPlaces } from "../hooks/useSavedPlaces";
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/appTypes";
import AntDesign from '@expo/vector-icons/AntDesign';

const ListCities = ({ high, low, name, temp, desc,ShowDeleteIcons,setShowDeleteIcons,cities,setCities }:
    {high:string, low:string, name:string, temp:string, desc:string,ShowDeleteIcons:boolean,setShowDeleteIcons: React.Dispatch<React.SetStateAction<boolean>>,cities:Place[],setCities: React.Dispatch<React.SetStateAction<Place[]>>}) => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    const { setLastItemClicked,setStorageOnDelete } = useSavedPlaces();
    const getCurrentTime = (): string => {
        return moment().format('HH:mm');
    };

    const handleClickAction = () => {
        setLastItemClicked(name?.trim());
        navigation.navigate('Home');
    }
    const handledelete=(name:string)=>{
        setShowDeleteIcons(false);
        let temp:Place[];
        temp=cities.filter((itm)=>itm.name!==name);
        setCities(temp);
        setStorageOnDelete(temp);
        setLastItemClicked(temp[0]?.name ?? '');
        navigation.navigate('Home');
    }
    return (

        <View style={{flexDirection: 'row', alignItems:'center',justifyContent: 'space-between', paddingTop: 2, backgroundColor: 'black' }}>
            {ShowDeleteIcons ?<TouchableOpacity onPress={() => handledelete(name)}>
                <AntDesign name="minuscircle" size={24} color="red" />
            </TouchableOpacity> : null}
            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleClickAction()}>{/*name is the index of the city in the list*/}
                <ImageBackground
                    source={require('../assets/sun_clear.jpg')}
                    style={{ backgroundColor: 'transparent', position: 'relative', borderRadius: 15, overflow: 'hidden', margin: 5, padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{name}</Text>
                    <Text style={{ color: 'white' }}>{getCurrentTime() ?? '00h00'}</Text>
                    <Text style={{ fontSize: 35, position: 'absolute', color: 'white', zIndex: 5, right: 0, marginRight: 10 }}>{temp}&deg;</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: ShowDeleteIcons ? 3 :30 }}>
                        <Text style={{ color: 'white' }}>{desc}</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ color: 'white' }}>H:{high}&deg;</Text>
                            <Text style={{ color: 'white' }}>L:{low}&deg;</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

    );
}

export default ListCities;