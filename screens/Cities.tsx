import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, ImageBackground, Keyboard, Linking, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamList } from "../types/appTypes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from "react-native-paper";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const Cities = () => {
    const [text, setText] = useState("");
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>
    const navigation = useNavigation<NavigationProp>();
    {/*paddingTop:45 is for getting out of the safe areaview without wrapping the screen with <safeAreaView> because we want to color that part with black as background*/ }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, paddingTop: 45, backgroundColor: 'black', padding: 5, gap: 5 }}>
                <Menu>
                    <MenuTrigger style={{zIndex:10,width:60,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',padding:15}}>
                       
                    </MenuTrigger>
                    <TouchableOpacity style={{position:'absolute',zIndex:-10,alignSelf:'flex-end'}}>
                            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={24} color="white" />
                        </TouchableOpacity>

                    <MenuOptions customStyles={{
                        optionsWrapper: {
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? -60 : -68,
                            right: 0,
                            top:20,
                            left:Dimensions.get('window').width/2,
                            height: 100,
                            backgroundColor:'rgba(255, 255, 255, 0.18)',
                            borderRadius: 8,
                            padding: 8,
                            width: 150,
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                        },
                    }}>
                        <MenuOption onSelect={() => {}}>
                            <Text style={{ color: 'white' }}>Edit List</Text>
                        </MenuOption>  
                        <MenuOption onSelect={() => {}}>
                            <Text style={{ color: 'white' }}>Celsius</Text>
                        </MenuOption>
                        <MenuOption onSelect={() =>{}}>
                            <Text style={{ color: 'white' }}>Fahrenheit</Text> 
                        </MenuOption>
                    </MenuOptions>
                </Menu>

                <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }}>Weather</Text>
                <View>
                    <TextInput
                        theme={{ roundness: 15, colors: { background: '#4A4947' } }}
                        style={{ opacity: .5 }}
                        outlineColor="transparent"
                        activeOutlineColor="transparent"
                        value={text}
                        cursorColor="white"
                        mode="outlined"
                        placeholder="Search for a city or airport"
                        placeholderTextColor={'white'}
                        textColor="white"
                        onChangeText={text => setText(text)}
                        right={<TextInput.Icon icon={() => text ? <MaterialIcons onPress={() => setText("")} name="cancel" size={20} color="white" /> : null} />}
                        left={<TextInput.Icon icon={() => <Ionicons name="search" size={20} color="white" />} />}
                    />
                    {
                        text && text !== "" ? (
                            <View style={{ flexDirection: "row", gap: 5, margin: 5 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: '#4A4947', padding: 5, borderRadius: 15 }}>
                                    <Text style={{ color: 'white' }}>Search</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setText("")} style={{ backgroundColor: 'white', padding: 5, borderRadius: 15 }}>
                                    <Text style={{ color: 'black' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                </View>

                <ImageBackground
                    source={require('../assets/clouds.jpg')}
                    style={{ backgroundColor: 'transparent', position: 'relative', borderRadius: 15, overflow: 'hidden', margin: 5, padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Johannesburg</Text>
                    <Text style={{ color: 'white' }}>08:48</Text>
                    <Text style={{ fontSize: 35, position: 'absolute', color: 'white', zIndex: 5, right: 0, marginRight: 10 }}>21&deg;</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        <Text style={{ color: 'white' }}>sunny</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ color: 'white' }}>H:13&deg;</Text>
                            <Text style={{ color: 'white' }}>L:43&deg;</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Text style={{ color: '#D8D2C2', textAlign: 'center' }}>Learn more about <Text onPress={()=>Linking?.openURL(Platform.OS=='ios' ? 'https://support.apple.com/en-gb/105038' :"https://support.google.com/websearch/answer/13692898?hl=en")} style={{ textDecorationLine: 'underline' }}>weather data</Text> and <Text onPress={()=>Linking?.openURL(Platform.OS=='ios' ?  'https://gspe21-ssl.ls.apple.com/html/attribution.html' :'#')} style={{ textDecorationLine: 'underline' }}>map data</Text> </Text>
            </View>

        </TouchableWithoutFeedback>
    );
}

export default Cities;