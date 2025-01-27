import { ActivityIndicator, MD2Colors } from "react-native-paper";

const LoadingView = () => {
    return ( 
        <ActivityIndicator style={{alignSelf:'center',flex:1}} size={'large'} animating={true} color={MD2Colors.red800} />
     );
}
 
export default LoadingView;