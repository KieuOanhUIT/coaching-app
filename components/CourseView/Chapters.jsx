import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
export default function Chapters({ course }) {
  const router = useRouter();
  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter.find(item => item == index)
    return isCompleted ? true : false
  }
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
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            router.push({
              pathname: '/chapterView',
              params: {
                chapterParams: item ? JSON.stringify(item) : {},
                docId: course?.docId,
                chapterIndex: index,
                courseParams: JSON.stringify(course)
              }
            })
          }} style={{
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
            <Text numberOfLines={1} style={[styles.chapterText, { flex: 1 }]}>{item.chapterName}</Text>
            {/* </View> */}
            {isChapterCompleted(index) ? <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} /> : <FontAwesome name="play" size={24} color={Colors.PRIMARY} />
            }
          </TouchableOpacity>
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  chapterText: {
    fontSize: 20,
  }
})