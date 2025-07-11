import React from 'react';
import { FlatList, Text, View } from 'react-native';
import CourseListByCategory from './../../components/Explore/CourseListByCategory';
import { CourseCategory } from './../../constants/Option';
export default function Explore() {

  return (
    <FlatList style={{
      backgroundColor: 'white', height: '100%', flex: 1
    }}
      data={[]}
      ListHeaderComponent={<View style={{
        padding: 25
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 30
        }}>Explore more course</Text>
        {CourseCategory.map((item, index) => (
          <View key={index} style={{
            marginTop: 10
          }}>
            {/* <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold'
                }}>{item}</Text> */}
            <CourseListByCategory category={item} />
          </View>
        ))}
      </View>} renderItem={undefined} />
  )
}