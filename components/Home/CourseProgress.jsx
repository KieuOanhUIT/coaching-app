import { FlatList, Image, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';

export default function CourseProgress({ courseList }) {
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold'
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
                        backgroundColor: Colors.BG_GRAY,
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
                            <Progress.Bar progress={0} width={250} />
                            <Text style={{
                                marginTop: 2
                            }}>3 Out of 5 Chapter completed</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}