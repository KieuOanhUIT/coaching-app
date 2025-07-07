import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import CourseList from '../../components/Home/CourseList';
import CourseProgress from '../../components/Home/CourseProgress';
import Header from '../../components/Home/Header';
import NoCourse from '../../components/Home/NoCourse';
import PracticeSection from '../../components/Home/PracticeSection';
import { UserDetailContext } from '../../context/UserDetailContext';
import { db } from './../../config/firebaseConfig';
export default function home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail])

  const GetCourseList = async () => {
    setCourseList([])
    const q = query(collection(db, 'Courses'), where("createdBy", '==', userDetail?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log("--", doc.data());
      setCourseList(prev => [...prev, doc.data()])
    })

  }

  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
    <View style={{
      padding: 25,
      paddingTop: Platform.OS == 'ios' && 45,
      flex: 1,
      backgroundColor: 'white'
    }}>
      <Header />
      {courseList?.length == 0 ?
        <NoCourse /> :
        <View>
          <CourseProgress courseList={courseList} />
          <PracticeSection />
          <CourseList courseList={courseList} />
        </View>
      }
    </View>
    }/>
  )
}