import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { UserDetailContext } from '../../context/UserDetailContext';
import { auth, db } from './../../config/firebaseConfig';
import Colors from './../../constants/Colors';

export default function signUp() {
    const router=useRouter();
    const [fullName, setFullName]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const {userDetail, setUserDetail}=useContext(UserDetailContext)
    const CreateNewAccount=()=> {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (resp)=>{
            const user=resp.user;
            console.log(user);
            await SaveUser(user);
            // Luu user vao database
        })
        .catch(e=>{
            console.log(e.message)
        })
    }

    const SaveUser=async (user)=>{
        const data={
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid
        }
        await setDoc(doc(db, 'users', email),data)
        setUserDetail(data);
        // Chuyen sang man hinh moi
    }

  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 50,
        flex: 1,
        padding: 25,
        backgroundColor: 'white'
    }}>
      <Image 
        source={require('./../../assets/images/logo.png')}
        style={{
            width: 180, height: 180
        }}
      />
      <Text style={{
        fontSize: 30, fontWeight: 'bold'
      }}>Create New Account</Text>

      <TextInput placeholder='Full name' onChangeText={(value)=>setFullName(value)} style={styles.textInput}/>
      <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput}/>
      <TextInput placeholder='Password'  onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}/>
      <TouchableOpacity
      onPress={(CreateNewAccount)}
      style={{
        padding: 15, backgroundColor: Colors.PRIMARY,
        width: '100%', marginTop: 25,
        borderRadius: 10
      }}>
        <Text style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center'
        }}>Create account</Text>
      </TouchableOpacity>
        <View
        style={{
            display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20
        }}>
            <Text>Already have an account?
            </Text>
            <Pressable
                onPress={()=> router.push('/auth/signIn')}>
                <Text style={{
                    color: Colors.PRIMARY, fontWeight: 'bold'
                }}>Sign in here!</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius:8
    }
})