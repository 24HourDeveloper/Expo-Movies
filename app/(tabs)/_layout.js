import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#AA4A44',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 30
      },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#000'
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44'
          },
          tabBarIcon: ({ color }) => <Fontisto size={28} name="film" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44'
          },
          tabBarIcon: ({ color }) => <Fontisto size={28} name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}
