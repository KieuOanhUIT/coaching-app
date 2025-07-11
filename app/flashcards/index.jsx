import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
export default function Flashcards() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const [currentPage, setCurrentPage] = useState(0);
    const flashcard = course?.flashcards;
    const width = Dimensions.get('screen').width;
    const router = useRouter();
    const onScroll = (event) => {
        const index = Math.round(event?.nativeEvent?.contentOffset.x / width)
        console.log(index);
        setCurrentPage(index);
    }
    const GetProgress = (currentPage) => {
        const perc = (currentPage / flashcard?.length);
        return perc;
    }
    return (
        <View>
            <Image style={{
                height: 950,
                width: '100%'
            }} source={require('./../../assets/images/flashcard.png')} />
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
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        color: 'white'
                    }}>{currentPage + 1} of {flashcard?.length}</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Progress.Bar color={Colors.WHITE} height={10}
                        progress={GetProgress(currentPage)} width={Dimensions.get('window').width * 0.85} />
                </View>
                <FlatList
                    data={flashcard}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    renderItem={({ item, index }) => (
                        <View key={index}
                            style={{
                                height: 500,
                                width: width * 0.9,
                                marginTop: 60
                                // backgroundColor: 'white',
                            }}>
                            <FlipCard style={styles.flipCard}>
                                {/* Face Side */}
                                <View style={styles.frontCard}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 28, color: Colors.PRIMARY }}>{item?.front}</Text>
                                </View>
                                {/* Back Side */}
                                <View style={styles.backCard}>
                                    <Text style={{ color: 'white', width: Dimensions.get('screen').width * 0.78, fontSize: 28, padding: 20, alignItems: 'center' }}>{item?.back}</Text>
                                </View>
                            </FlipCard>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flipCard: {
        width: Dimensions.get('screen').width * 0.78,
        height: 400,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: Dimensions.get('screen').width * 0.05,
        borderRadius: 20
    },
    frontCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    backCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20
    }

})