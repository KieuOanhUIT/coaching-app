import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import { UserDetailContext } from '../../context/UserDetailContext';
import { db } from './../../config/firebaseConfig';

export default function Progress() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail])

  const GetCourseList = async () => {
    setLoading(true)
    setCourseList([])
    const q = query(collection(db, 'Courses'), where("createdBy", '==', userDetail?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log("--", doc.data());
      setCourseList(prev => [...prev, doc.data()])
    })
    setLoading(false);
  }
  return (
    <View>
      <Image style={{
        position: 'absolute',
        width: '100%',
        height: 700
      }}
        source={require('./../../assets/images/wave.png')} />
      <View style={{
        width: '100%',
        position: 'absolute',
        padding: 20,
        marginTop: 20
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 30,
          color: 'white',
          marginBlock: 10
        }}>Course Progress</Text>
        <FlatList
          data={courseList}
          onRefresh={() => GetCourseList()}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/courseView/' + item?.docId,
                params: {
                  courseParams: JSON.stringify(item)
                }
              })}>
              <CourseProgressCard item={item} width='96%' />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}