import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, Image, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
export default function CourseListGrid({ courseList, option }) {
    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({ item, index }) => (
                    <View key={index} style={{
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
                    </View>
                )}
            ></FlatList>
        </View>
    )
}