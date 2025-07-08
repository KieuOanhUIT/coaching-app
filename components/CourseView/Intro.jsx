import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';
import Button from '../Shared/Button';

export default function Intro({ course }) {
    const router = useRouter();
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
                    <Text style={{ fontSize: 18, color:Colors.PRIMARY}}>{course?.chapters?.length} Chapters</Text>
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
                <Button text={'Start now'}
                    onPress={() => console.log('')} />
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 10
            }}
            onPress={()=>router.back()}>
                <Ionicons name="arrow-back" size={34} color="black" />
            </Pressable>
        </View>
    )
}