import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from './../config/firebaseConfig';
import Colors from './../constants/Colors';
export default function Index() {

    const router = useRouter();
    const [userDetail, setUserDetail] = useContext(UserDetailContext)
    onAuthStateChanged(auth,async(user)=>{
        if(user){
            console.log(user);
            const result=await getDoc(doc(db,'users',user?.email));
            setUserDetail(result.data())
            router.replace('/(tabs)/home')
        }
    })

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
                }}>
                    Transform your ideas into engaging educational content, effortlessly with AI!
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={() => router.push('/auth/signUp')}
                >
                    <Text style={[styles.buttonText, {color: Colors.PRIMARY }]}>Get started</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: Colors.PRIMARY, borderWidth: 2, borderColor: 'white'
                }]}
                onPress={()=>router.push('/auth/signIn')}
                >
                    <Text style={[styles.buttonText, {color: 'white'}]}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        padding: 15,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        width: '80%'
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 18,
    }
});
