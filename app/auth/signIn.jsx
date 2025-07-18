import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-web';
import { UserDetailContext } from '../../context/UserDetailContext';
import { auth, db } from './../../config/firebaseConfig';
import Colors from './../../constants/Colors';

export default function signIn() {
  const router = useRouter()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const onSignInClick = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user
        console.log(user)
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home')
      }).catch(e => {
        console.log(e)
        setLoading(false);
        ToastAndroid.show('Incorrect Email & password', ToastAndroid.BOTTOM)
      })
  }

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, 'users', email));
    console.log(result.data())
    setUserDetail(result.data())
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
      }}>Welcome back!</Text>

      <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} style={styles.textInput} />
      <TextInput placeholder='Password' onChangeText={(value) => setPassword(value)} secureTextEntry={true} style={styles.textInput} />
      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={{
          padding: 15, backgroundColor: Colors.PRIMARY,
          width: '100%', marginTop: 25,
          borderRadius: 10
        }}>
        {!loading ? <Text style={{
          fontSize: 20,
          color: 'white',
          textAlign: 'center'
        }}>Sign In</Text> :
          <ActivityIndicator size={'large'} color={Colors.WHITE} />
        }
      </TouchableOpacity>
      <View
        style={{
          display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20
        }}>
        <Text>Don't have an account?
        </Text>
        <Pressable
          onPress={() => router.push('/auth/signUp')}>
          <Text style={{
            color: Colors.PRIMARY, fontWeight: 'bold'
          }}>Create new here!</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8
  }
})