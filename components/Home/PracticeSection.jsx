import { FlatList, Image, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import { PraticeOption } from '../../constants/Option'

export default function PracticeSection() {
  return (
    <View style={{
        marginTop: 10
    }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 25
      }}>Practice</Text>
      <View>
        <FlatList
        data={PraticeOption}
        numColumns={3}
        renderItem={({item,index})=>(
            <View style={{
                flex: 1,
                margin:5,
                aspectRatio:1
            }}>
                <Image source={item?.image} style={{
                width: '100%',
                height: '100%',
                maxHeight: 160,
                borderRadius: 15,
                }}/>
                <Text style={{
                    position: 'absolute',
                    padding: 15,
                    fontSize: 15,
                    color: Colors.WHITE
                }}>{item.name}</Text>
                </View>
        )}
        />
      </View>
    </View>
  )
}