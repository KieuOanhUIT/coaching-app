import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Shared/Button';
import Colors from '../../constants/Colors';

export default function QuizSummary() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParam);
    const [correctAns, setCorrectAns] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const router = useRouter();
    useEffect(() => {
        CalculateResult();
    }, [])
    const CalculateResult = () => {
        // const correctAns = quizResult.filter((item) => item?.isCorrect == true)
        // console.log(correctAns);
        if (quizResult !== undefined) {
            const correctAns_ = Object.entries(quizResult)
                ?.filter(([key, value]) => value?.isCorrect == true)
            console.log(correctAns);
            const totalQues_ = Object.keys(quizResult).length;

            setCorrectAns(correctAns_.length);
            setTotalQuestion(totalQues_);
        }
    }

    const GetPercMark = () => {
        return ((correctAns / totalQuestion * 100).toFixed(0))
    }
    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View>
                    <Image source={require('./../../assets/images/wave.png')}
                        style={{
                            width: '100%',
                            height: 700
                        }} />
                    <View style={{ position: 'absolute', width: '100%', padding: 35 }}>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold', fontSize: 30, color: 'white'
                        }}>Quiz Summary</Text>
                        <View style={{
                            backgroundColor: Colors.WHITE,
                            padding: 20,
                            borderRadius: 20,
                            marginTop: 60,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                width: 100, height: 100, marginTop: -60
                            }}
                                source={require('./../../assets/images/trophy.png')} />
                            <Text style={{
                                fontSize: 26, fontWeight: 'bold'
                            }}>{GetPercMark() > 60 ? 'Congratulations!' : 'Try again!'}</Text>

                            <Text style={{ color: Colors.GRAY, fontSize: 17 }}>
                                Your gave {GetPercMark()}% Correct answers
                            </Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10
                            }}>
                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultText}>❓{totalQuestion}</Text>
                                </View>
                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultText}>✅ {correctAns} Correct</Text>
                                </View>
                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultText}>❌ {totalQuestion - correctAns} Incorrect</Text>
                                </View>
                            </View>
                        </View>
                        <Button text={'Back to Home'} onPress={() => router.replace('/(tabs)/home')} />
                        <View style={{
                            marginTop: 25,
                            flex: 1
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 25
                            }}>Summary:</Text>
                            <FlatList
                                data={Object.entries(quizResult)}
                                renderItem={({ item, index }) => {
                                    const quizItem = item[1];
                                    return (
                                        <View style={{
                                            padding: 15,
                                            borderWidth: 1,
                                            marginTop: 5,
                                            borderRadius: 15,
                                            backgroundColor: quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                                            borderColor: quizItem?.isCorrect == true ? Colors.GREEN : Colors.RED
                                        }}>
                                            <Text style={{
                                                fontSize: 20
                                            }}>{quizItem.question}</Text>
                                            <Text style={{
                                                fontSize: 15,
                                            }}>Ans: {quizItem?.correctAns}</Text>
                                        </View>);
                                }}
                            ></FlatList></View>
                    </View>
                </View>}
        />
    )
}

const styles = StyleSheet.create({
    resultTextContainer: {
        padding: 7,
        backgroundColor: 'white',
        elevation: 1
    },
    resultText: {
        fontSize: 20
    }
})