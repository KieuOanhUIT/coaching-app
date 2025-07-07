import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
export default function Chapters({course}) {
  return (
    <View style={{
        padding: 20
      }}>
      <Text style={{
        fontSize: 25,
        fontWeight: 'bold'
      }}>Chapters</Text>
      <FlatList
      data={course?.chapters}
      renderItem={({item, index})=>(
        <View style={{
            padding: 15,
            borderWidth: 0.5,
            borderRadius: 15,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {/* <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}> */}
                {/* <Text style={styles.chapterText}>{index+1}.</Text> */}
                <Text numberOfLines={1} style={[styles.chapterText, {flex: 1}]}>{item.chapterName}</Text>
                {/* </View> */}
                <FontAwesome name="play" size={24} color={Colors.PRIMARY} />
        </View>
      )}/>
    </View>
  )
}

const styles= StyleSheet.create({
    chapterText:{
        fontSize: 20,
    }
})