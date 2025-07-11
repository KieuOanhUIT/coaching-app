import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Chapters from '../../../components/CourseView/Chapters';
import Intro from '../../../components/CourseView/Intro';
import { db } from './../../../config/firebaseConfig';
export default function CourseView() {
    const { courseParams, courseId, enroll } = useLocalSearchParams();
    const [course, setCourse]=useState([]);
    // const course = JSON.parse(courseParams);
    // console.log(courseId);

    useEffect(()=>{
        if(!courseParams){
            GetCourseById();
        } else{
            setCourse(JSON.parse(courseParams));
        }
    },[courseId])

    const GetCourseById = async () => {
        const docRef = await getDoc(doc(db, 'Courses', courseId));
        const courseData = docRef.data();
        setCourse(courseData)
    }

    return course && (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                    <Intro course={course} enroll={enroll}/>
                    <Chapters course={course} />
                </View>} />
    )
}