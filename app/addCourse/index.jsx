import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Shared/Button';
import { generateContentFromPrompt } from '../../config/AiModel';
import Colors from '../../constants/Colors';
import Prompt from '../../constants/Prompt';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState();
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
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

    const onSelectTopic = (topic) => {
        const isAlreadyExist = selectedTopic.find((item) => item === topic);
        if(!isAlreadyExist) {
            setSelectedTopics(prev=>[...selectedTopic, topic]);
        } else{
            const topics=selectedTopic.filter((item) => item !== topic);
            setSelectedTopics(topics);
        }
    }
    return (
        <View style={{
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
            <View style ={{
                marginTop: 15
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
                    {topics.map((item,index)=>(
                        <Pressable key={index}>
                            <Text style={{
                                padding: 7,
                                borderWidth: 0.4,
                                borderRadius: 99,
                                paddingHorizontal: 15
                            }}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
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