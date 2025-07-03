import { useRouter } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Button from '../Shared/Button';

export default function NoCourse() {
    const router=useRouter();
  return (
    <View style={{
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
    }}>
      <Image source={require('./../../assets/images/book.png')} 
      style={{
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20
      }}/>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center'
      }}>You don't have any courses yet!</Text>
      <Button text={'+ Create New Course'} onPress={()=>router.push('/addCourse')}/>
      <Button text={'Explore existing courses'} type='outline'/>
    </View>
  )
}