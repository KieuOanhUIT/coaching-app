import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function QuestionAnswer() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa;
    const router = useRouter();
    const [selectedQuestion, setSelectedQuestion] = useState();

    const OnQuestionSelect = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    }

    return (
        <ImageBackground 
            style={{ flex: 1, width: '100%' }}
            source={require('./../../assets/images/notes.png')}
        >
            <View style={{ flex: 1, padding: 20, marginTop: 15 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 28,
                        color: 'white',
                        marginLeft: 7
                    }}>Question & Answer</Text>
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    marginBottom: 10
                }}>{course?.courseTitle}</Text>

                <FlatList
                    data={qaList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Pressable 
                            style={styles.card}
                            onPress={() => OnQuestionSelect(index)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                {item?.question}
                            </Text>

                            {selectedQuestion === index && (
                                <View style={{ borderTopWidth: 0.4, marginTop: 10, paddingTop: 10 }}>
                                    <Text style={{
                                        fontSize: 17,
                                        color: Colors.GREEN
                                    }}>
                                        Answer: {item?.answer}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    )}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        elevation: 1
    }
})
