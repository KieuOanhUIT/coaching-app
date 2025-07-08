import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';
import { db } from '../../../config/firebaseConfig';
import Colors from '../../../constants/Colors';
import { PraticeOption } from '../../../constants/Option';
import { UserDetailContext } from '../../../context/UserDetailContext';

export default function PracticeTypeHomeScreen() {
    const { type } = useLocalSearchParams();
    const router = useRouter();
    const [courseList, setCourseList] = useState([]);
    const option = PraticeOption.find(item => item.name == type);
    console.log(option)
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        userDetail && GetCourseList();
    }, [userDetail])
    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        try {
            const q = query(collection(db, 'Courses'), 
            where('createdBy', '==', userDetail?.email),
        );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setCourseList(prev => [...prev, doc.data()])
            })
            setLoading(false);
        }
        catch (e) {
            console.log(e)
            setLoading(false);
        }
    }
    return (
        <View>
            <Image source={option.image} style={{
                height: 240, width: '100%'
            }} />
            <View style={{
                position: 'absolute',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons style={{
                        backgroundColor: 'white', padding: 8, borderRadius: 10
                    }} name="arrow-back" size={24} color="black" />
                </Pressable>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 35,
                    color: 'white'
                }}>{type}</Text>
            </View>
            {loading && <ActivityIndicator
                style={{
                    marginTop: 150
                }}
                size={'large'} color={Colors.PRIMARY}></ActivityIndicator>}
            <CourseListGrid courseList={courseList}
            option={option}/>
        </View>
    )
}