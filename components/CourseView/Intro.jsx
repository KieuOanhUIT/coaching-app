import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';
import { UserDetailContext } from '../../context/UserDetailContext';
import Button from '../Shared/Button';

export default function Intro({ course, enroll }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const onEnrollCourse = async () => {
        const docId = Date.now().toString();
        setLoading(true);
        const data={
            ...course,
            createdBy: userDetail?.email,
            createdOn: new Date(),
            enrolled: true}
        await setDoc(doc(db, 'Courses', docId), data)
        router.push({
                            pathname: '/courseView/' + docId,
                            params: {
                                courseParams: JSON.stringify(data),
                                enroll: false
                            }
                        })
        setLoading(false);
    }
    return (
        <View>
            <Image source={imageAssets[course?.banner_image]}
                style={{
                    width: '100%',
                    height: 280
                }}
            />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>{course?.courseTitle}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    marginTop: 5
                }}>
                    <Ionicons name="book-outline" size={24} color={Colors.PRIMARY} />
                    <Text style={{ fontSize: 18, color: Colors.PRIMARY }}>{course?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: 10
                }}>Description:</Text>
                <Text style={{
                    fontSize: 18,
                    color: Colors.GRAY
                }}>{course?.description}</Text>
                {enroll == 'true' ? <Button text={'Enroll Now'}
                    loading={loading}
                    onPress={() => onEnrollCourse()} /> :
                    <Button text={'Start now'}
                        onPress={() => console.log('')} />}
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 10
            }}
                onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={34} color="black" />
            </Pressable>
        </View>
    )
}