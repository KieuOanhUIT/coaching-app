import { FlatList, Image, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';

export default function CourseProgress({ courseList }) {
    const GetCompletedChapters = (course) => {
        const completedChapter = course?.completedChapter?.length;
        const perc = completedChapter / course?.chapters?.length;
        return perc;
    }
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white'
            }}>Progress</Text>
            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{
                        flex: 1,
                        margin: 7,
                        padding: 7,
                        backgroundColor: Colors.WHITE,
                        borderRadius: 8,
                        width: 280
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 8
                        }}>
                            <Image source={imageAssets[item?.banner_image]} style={{
                                width: 80,
                                height: 80,
                                borderRadius: 8
                            }} />
                            <View style={{
                                flex: 1
                            }}><Text
                                numberOfLines={2}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 19,
                                    flexWrap: 'wrap'
                                }}>{item?.courseTitle}</Text>
                                <Text style={{
                                    fontSize: 16
                                }}>{item?.chapters.length} Chapter</Text></View>
                        </View>
                        <View style={{
                            marginTop: 10
                        }}>
                            <Progress.Bar progress={GetCompletedChapters(item)} width={250} />
                            <Text style={{
                                marginTop: 2
                            }}>{item?.completedChapter.length??0} Out of {item?.chapters.length} Chapter completed</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}