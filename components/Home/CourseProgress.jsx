import { FlatList, Text, View } from 'react-native';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({ courseList }) {
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white'
            }}>Progress</Text>
            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <CourseProgressCard item={item} />
                    </View>
                )}
            />
        </View>
    )
}