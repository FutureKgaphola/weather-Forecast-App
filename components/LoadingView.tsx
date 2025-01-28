import { ActivityIndicator, MD2Colors } from "react-native-paper";

const LoadingView = ({sizeIcon}:{sizeIcon:string}) => {
    return ( 
        <ActivityIndicator style={{alignSelf:'center',flex:1}} size={sizeIcon== "large" ? "large":"small"} animating={true} color={MD2Colors.red800} />
     );
}
 
export default LoadingView;