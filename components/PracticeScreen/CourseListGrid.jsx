import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
export default function CourseListGrid({ courseList, option }) {
    const router = useRouter();
    const onPress = (course) => {
        router.push({
            pathname: option.path,
            params: {
                courseParams: JSON.stringify(course)
            }
        })
    }
    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => onPress(item)} key={index} style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        backgroundColor: 'white',
                        margin: 7,
                        borderRadius: 15,
                        elevation: 1
                    }}>
                        <Ionicons style={{ position: 'absolute', top: 10, right: 20 }}
                            name="checkmark-circle" size={24} color={Colors.GRAY} />
                        <Image
                            source={option?.icon}
                            style={{
                                width: '100%',
                                height: 90,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={{
                            textAlign: 'center',
                            marginTop: 8
                        }}>{item.courseTitle}</Text>
                    </TouchableOpacity>
                )}
            ></FlatList>
        </View>
    )
}