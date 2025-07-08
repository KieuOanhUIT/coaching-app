import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import Button from '../../components/Shared/Button';
import { generateContentFromPrompt, generateCourseAIModel } from '../../config/AiModel';
import Colors from '../../constants/Colors';
import Prompt from '../../constants/Prompt';
import { db } from './../../config/firebaseConfig';
import { UserDetailContext } from './../../context/UserDetailContext';
export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [userInput, setUserInput] = useState();
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const router = useRouter();
    const onGenerateTopic = async () => {
        setLoading(true);
        try {
            const PROMPT = userInput + Prompt.IDEA;
            const aiResp = await generateContentFromPrompt(PROMPT);

            let rawText = aiResp.response.text();
            console.log("Raw from AI:", rawText);

            // Loại bỏ markdown code fences
            rawText = rawText.replace(/```json|```/g, '').trim();

            // Parse JSON
            const topicIdea = JSON.parse(rawText);
            console.log("Parsed JSON:", topicIdea);

            setTopics(topicIdea?.course_titles || topicIdea);
        } catch (err) {
            console.error("JSON parsing failed:", err);
        }
        setLoading(false);
    }

    const onTopicSelect = (topic) => {
        const isAlreadyExist = selectedTopic.find((item) => item === topic);
        if (!isAlreadyExist) {
            setSelectedTopics(prev => [...selectedTopic, topic]);
        } else {
            const topics = selectedTopic.filter((item) => item !== topic);
            setSelectedTopics(topics);
        }
    }

    const isTopicSelected = (topic) => {
        const selection = selectedTopic.find(item => item == topic);
        return selection ? true : false
    }

    // dung AI model de dung generate course
    //     const onGenerateCourse = async () => {
    //     setLoading(true);
    //     try {
    //         const PROMPT = selectedTopic + Prompt.COURSE;
    //         const aiResp = await generateCourseFromPrompt(PROMPT);

    //         let rawText = await aiResp.response.text(); 
    //         console.log("Raw AI Course:", rawText);

    //         rawText = rawText.replace(/```json|```/g, '').trim();

    //         const parsed = JSON.parse(rawText);
    //         console.log("Parsed JSON:", parsed);

    //         const courses = parsed?.courses || [];
    //         console.log("Courses array:", courses);

    //         // Lưu vào database
    //         for (const course of courses) {
    //             await setDoc(doc(db, 'Courses', Date.now().toString()), {
    //                 ...course,
    //                 createdOn: new Date(),
    //                 createdBy: userDetail?.email,
    //             });
    //         }

    //         router.push('/(tabs)/home');
    //     } catch (e) {
    //         console.error("Error generating course:", e);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const onGenerateCourse = async () => {
        setLoading(true);
        try {
            const PROMPT = selectedTopic + Prompt.COURSE;
            const aiResp = await generateCourseAIModel.sendMessage(PROMPT);

            let rawText = await aiResp.response.text(); // ✅ thêm await
            console.log("Raw AI Course:", rawText);

            // clean JSON output
            rawText = rawText.replace(/```json|```/g, '').trim();

            const parsed = JSON.parse(rawText);
            console.log("Parsed JSON:", parsed);

            const courses = parsed?.courses || [];
            console.log("Courses array:", courses);

            const docId = Date.now().toString();
            // lưu vào Firestore
            for (const course of courses) {
                await setDoc(doc(db, 'Courses', docId), {
                    ...course,
                    createdOn: new Date(),
                    createdBy: userDetail?.email,
                    docId: docId
                });
            }

            router.push('/(tabs)/home');
        } catch (e) {
            console.error("Error generating course:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={{
            padding: 25,
            backgroundColor: 'white',
            flex: 1
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30
            }}>Create new course</Text>
            <Text style={{
                fontSize: 30
            }}>What you want to learn?</Text>
            <Text style={{
                fontSize: 18,
                marginTop: 10,
                color: Colors.GRAY
            }}>What course you want to learn? (ex.Learn Python, Learn SQL, Learn Data, etc...)</Text>
            <TextInput placeholder='ex.Learn Python, Learn SQL, Learn Data'
                style={styles.textInput}
                numberOfLines={3}
                multiline={true}
                onChangeText={(value) => setUserInput(value)}
            ></TextInput>
            <Button text={'Generate topic'} type='outline'
                onPress={() => onGenerateTopic()} loading={loading}></Button>
            <View style={{
                marginTop: 15,
                marginBottom: 15
            }}>
                <Text style={{
                    fontSize: 20
                }}>Select all topics which you want to learn</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginTop: 6
                }}>
                    {topics.map((item, index) => (
                        <Pressable key={index} onPress={() => onTopicSelect(item)}>
                            <Text style={{
                                padding: 7,
                                borderWidth: 0.4,
                                borderRadius: 99,
                                paddingHorizontal: 15,
                                backgroundColor: isTopicSelected(item) ? Colors.PRIMARY : null,
                                color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY
                            }}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            {selectedTopic?.length > 0 && <Button text='Generate Course'
                onPress={() => onGenerateCourse()}
                loading={loading}
            />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        borderRadius: 15,
        marginTop: 10,
        height: 100,
        alignItems: 'flex-start'
    }
})