import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from "./../../context/UserDetailContext";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View>
        <Text style={{
          fontSize: 25, fontWeight: 'bold'
        }}>Hello, {userDetail?.name}</Text>
        <Text style={{
          fontSize: 17
        }}>Let's get started!
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={35} color="black" />
      </TouchableOpacity>
    </View>
  )
}