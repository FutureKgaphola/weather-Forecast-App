import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from "react-native-paper";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

const Cities = () => {
    const [text, setText] = useState("");
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    {/*paddingTop:45 is for getting out of the safe areaview without wrapping the screen with <safeAreaView> because we want to color that part with black as background*/ }
    return (
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, paddingTop: 45, backgroundColor: 'black', padding: 5,gap:5 }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Cities')}>
                <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }}>Weather</Text>
            <TextInput
            theme={{ roundness: 15,colors:{background:'#4A4947'} }}
            style={{opacity:.5}} 
            outlineColor="transparent"
            activeOutlineColor="transparent"
                value={text}
                mode="outlined"
                placeholder="Search for a city or airport"
                placeholderTextColor={'white'}
                textColor="white"
                onChangeText={text => setText(text)}
                left={<TextInput.Icon icon={()=><Ionicons name="search" size={20} color="white" />} />}
            />
            <View style={{backgroundColor:'white',position:'relative',borderRadius:15,margin:5,padding:10}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Johannesburg</Text>
                <Text>08:48</Text>
                <Text style={{fontSize:35,position:'absolute',zIndex:5,right:0,marginRight:10}}>21&deg;</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                    <Text>sunny</Text>
                    <View style={{flexDirection:'row',gap:5}}>
                    <Text>H:13&deg;</Text>
                    <Text>L:43&deg;</Text>
                    </View>
                </View>
            </View>
            
            <Text style={{color:'#D8D2C2',textAlign:'center'}}>Learn more about <Text style={{textDecorationLine:'underline'}}>weather data</Text> and <Text style={{textDecorationLine:'underline'}}>map data</Text> </Text>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Cities;