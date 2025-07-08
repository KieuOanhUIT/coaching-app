import { useLocalSearchParams, useRouter } from 'expo-router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Button from '../../components/Shared/Button';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';

export default function ChapterView() {
    const { chapterParams, docId, chapterIndex, courseParams } = useLocalSearchParams();
    const chapters = JSON.parse(chapterParams);
    const [currentPage, setCurrentPage] = useState(0);
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const GetProgress = (currentPage) => {
        const perc = (currentPage / chapters?.content.length);
        return perc;
    }
    const onChapterComplete = async () => {
        // Luu chapter complete
        setLoader(true)
        await updateDoc(doc(db, 'Courses', docId), {
            completedChapter: arrayUnion(chapterIndex)
        })
        setLoader(false)
        // router.replace({
        //     pathname: '/courseView/'+docId,
        //     params: {
        //         courseParams: courseParams
        //     }
        // });
        router.replace('/courseView/'+docId)
        // router.back();
        // Back
    }
    return (
        <View style={{
            padding: 25,
            backgroundColor: 'white',
            flex: 1
        }}>
            <Progress.Bar progress={GetProgress(currentPage)}
                width={Dimensions.get('screen').width * 0.85} />
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25
                }}>{chapters?.content[currentPage]?.topic}</Text>
                <Text style={{
                    fontSize: 20,
                    marginTop: 7
                }}>{chapters?.content[currentPage]?.explain}</Text>
                {chapters?.content[currentPage]?.code && <Text style={[styles.codeExampleText, { backgroundColor: Colors.BLACK, color: 'white' }]}>{chapters?.content[currentPage]?.code}</Text>}
                {chapters?.content[currentPage]?.example && <Text style={styles.codeExampleText}>{chapters?.content[currentPage]?.example}</Text>}
            </View>
            <View style={{
                position: 'absolute',
                bottom: 10,
                width: '100%',

            }}>
                {chapters?.content?.length - 1 != currentPage ?
                    <Button text={'Next'} onPress={() => setCurrentPage(currentPage + 1)}></Button>
                    : <Button text={'Finish'} onPress={() => onChapterComplete()} loading={loader}></Button>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        fontSize: 18,
        marginTop: 10
    }
})