import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';
export default function CourseList({ courseList, heading="Courses" }) {
    const router = useRouter();
    return (
        <View style={{
            marginTop: 15
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold'
            }}>{heading}</Text>
            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/courseView/' + item?.docId,
                            params: {
                                courseParams: JSON.stringify(item)
                            }
                        })}
                        key={index} style={styles.courseContainer}>
                        <Image source={imageAssets[item.banner_image]}
                            style={{
                                width: '100%',
                                height: 150,
                                borderRadius: 15
                            }} />
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginTop: 10
                        }}>{item?.courseTitle}</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Ionicons name="book-outline" size={24} color="black" />
                            <Text>{item?.chapters?.length} Chapters</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    courseContainer: {
        padding: 10,
        backgroundColor: Colors.BG_GRAY,
        margin: 6,
        borderRadius: 15,
        width: 260
    }
})