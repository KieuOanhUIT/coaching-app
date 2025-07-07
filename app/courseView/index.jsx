import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';
import Chapters from './../../components/CourseView/Chapters';
import Intro from './../../components/CourseView/Intro';
export default function CourseView() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                    <Intro course={course} />
                    <Chapters course={course} />
                </View>} />
    )
}