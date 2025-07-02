import { Image, Text, View } from "react-native";
import Colors from './../constants/Colors';

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: 'white'
            }}
        >
            <Image
                source={require('./../assets/images/landing.png')}
                style={{
                    width: '100%',
                    height: 300,
                    marginTop: 70
                }}
            />

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    padding: 25,
                    backgroundColor: Colors.PRIMARY,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35
                }}
            >
                <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
                    Welcome to Coaching App
                </Text>
                <Text style={{
                    fontSize: 16, color: 'white', marginTop: 20, textAlign:'center'
                }}>Transform your ideas into engaging educational content, effortlessly with AI!</Text>
                <View>
                    <Text>Get started</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.name({
    button:{
        padding: 15, backgroundColor: Colors.PRIMARY
    }
})