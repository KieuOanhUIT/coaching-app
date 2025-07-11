import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import CourseList from '../Home/CourseList';
import { db } from './../../config/firebaseConfig';
export default function CourseListByCategory({ category }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetCourseListByCategory();
  }, [])
  const GetCourseListByCategory = async () => {
    setCourseList([]);
    setLoading(true);
    const q = query(collection(db, 'Courses'),
      where('category', '==', category),
      orderBy('createdOn', 'desc'))
    const querySnapshot = await getDocs(q);
    querySnapshot?.forEach((doc) => {
      console.log(doc.data());
      setCourseList(prev => [...prev, doc.data()])
    })
    setLoading(false);
  }
  return (
    <View>
      {courseList?.length > 0 && <CourseList courseList={courseList} heading={category} 
      enroll = {true}/>}
    </View>
  )
}