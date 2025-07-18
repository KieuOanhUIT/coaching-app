import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      {/* icon link: https://icons.expo.fyi/Index */}
      <Tabs.Screen name="home"
      options={{
        tabBarIcon: ({color, size})=><Ionicons name="home-outline" size={size} color={color} />,
        tabBarLabel: 'Home'
      }}
      />
      <Tabs.Screen name="explore"
      options={{
        tabBarIcon: ({color, size})=><Ionicons name="search-outline" size={size} color={color} />,
        tabBarLabel: 'Explore'
      }}/>
      <Tabs.Screen name="progress"
      options={{
        tabBarIcon: ({color, size})=><Ionicons name="analytics-outline" size={size} color={color} />,
        tabBarLabel: 'Progress'
      }}/>
      <Tabs.Screen name="profile"
      options={{
        tabBarIcon: ({color, size})=><Ionicons name="person-circle-outline" size={size} color={color} />,
        tabBarLabel: 'Profile'
      }}/>
    </Tabs>
  )
}