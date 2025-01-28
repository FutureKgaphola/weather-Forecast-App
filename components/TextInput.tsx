import { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native-paper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const TextinputField = ({ text, setText }: { text: string, setText: Dispatch<SetStateAction<string>> }) => {
    return (
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
    );
}

export default TextinputField;