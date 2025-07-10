import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';
import Button from './../../components/Shared/Button';
export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const [currentPage, setCurrentPage] = useState(0);
    const quiz = course?.quiz;
    const [selectedOption, setSelectedOption] = useState();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const router=useRouter();
    const GetProgress = (currentPage) => {
        const perc = (currentPage / quiz?.length);
        return perc;
    }

    const OnOptionSelect = (selectedChoice) => {
        setResult(prev => ({
            ...prev,
            [currentPage]: {
                userChoice: selectedChoice,
                isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
                question: quiz[currentPage]?.question,
                correctAns: quiz[currentPage]?.correctAns
            }
        }));
        console.log('ket qua:', result);
    }

    const onQuizFinish = async () => {
        setLoading(true);
        // luu result vao db
        try {
            await updateDoc(doc(db, 'Courses', course?.docId), {
                quizResult: result
            })
            setLoading(false);
            router.replace({
                pathname: '/quiz/summary',
                params: {
                    quizResultParam: JSON.stringify(result)
                }
            })
        }
        catch (e) {
            setLoading(false);
        }
        // chuyen huong toi quiz sumary
    }

    return (
        <View>
            <Image style={{
                height: 800,
                width: '100%'
            }} source={require('./../../assets/images/wave.png')} />
            <View style={{
                position: 'absolute',
                padding: 25,
                width: '100%'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Pressable>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        color: 'white'
                    }}>{currentPage + 1} of {quiz?.length}</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Progress.Bar color={Colors.WHITE} height={10}
                        progress={GetProgress(currentPage)} width={Dimensions.get('window').width * 0.85} />
                </View>
                <View style={{
                    padding: 25,
                    backgroundColor: 'white',
                    marginTop: 30,
                    height: Dimensions.get('screen').height * 0.65,
                    elevation: 1,
                    borderRadius: 20
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>{quiz[currentPage]?.question}</Text>
                    {quiz[currentPage]?.options.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedOption(index);
                                OnOptionSelect(item)
                            }}
                            key={index} style={{
                                padding: 20,
                                borderWidth: 1,
                                borderRadius: 15,
                                marginTop: 8,
                                backgroundColor: selectedOption == index ? Colors.LIGHT_GREEN : null,
                                borderColor: selectedOption == index ? Colors.GREEN : null
                            }}>
                            <Text style={{ fontSize: 20 }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {(selectedOption?.toString() && quiz?.length - 1 > currentPage) && <Button text={'Next'}
                    onPress={() => { setCurrentPage(currentPage + 1); setSelectedOption(null) }}
                />}
                {(selectedOption?.toString() && quiz?.length - 1 == currentPage) &&
                    <Button loading={loading}
                        onPress={() => onQuizFinish()}
                        text={'Finish'} />}
            </View>
        </View>
    )
}