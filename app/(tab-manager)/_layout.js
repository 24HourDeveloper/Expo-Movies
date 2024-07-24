import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Trailers from '../../components/Trailer';
import Search from './search'
import NowPlaying from '../../components/NowPlaying';
import UpComing from '../../components/UpComing';

const Top = createMaterialTopTabNavigator();
const Bottom = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Bottom.Navigator
      activeColor='white'
      barStyle={{ backgroundColor: '#AA4A44', height: 60 }}
      activeIndicatorStyle={{backgroundColor: null}}
    >
      <Bottom.Screen
        name="Home"
        component={Trailers}
        options={{
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44',
          },
          title: null,
          tabBarIcon: ({ color }) => <Fontisto size={28} name="film" color={color} />
        }}
      />
      <Bottom.Screen
        name="Settings"
        component={Search}
        options={{
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44'
          },
          title: null,
          tabBarIcon: ({ color }) => <Fontisto size={28} name="search" color={color} />
        }}
      />
    </Bottom.Navigator>
  )
}

export default function TabLayout() {
  return (
    <>
      <Top.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: {fontSize: 16},
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
          },
        }}
      >
        <Top.Screen
          name="home"
          component={BottomTab}
          options={{
            title: 'Home',
            tabBarStyle: {backgroundColor: '#AA4A44'}
          }}
        />
        <Top.Screen
          name="now playing"
          component={NowPlaying}
          options={{
            title: 'now playing',
            tabBarStyle: {backgroundColor: '#AA4A44'}
          }}
        />
        <Top.Screen
          name="up coming"
          component={UpComing}
          options={{
            title: 'up coming',
            tabBarStyle: {backgroundColor: '#AA4A44'}
          }}
        />
      </Top.Navigator>
    </>
  );
}
