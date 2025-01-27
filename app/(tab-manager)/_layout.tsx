import React from 'react';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trailers from '../../components/Trailer';
import Search from './search'
import NowPlaying from '../../components/NowPlaying';
import UpComing from '../../components/UpComing';
import Profile from '../profile';

const Top = createMaterialTopTabNavigator();
const Bottom = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Bottom.Navigator
      screenOptions={{headerShown: false}}
    >
      <Bottom.Screen
        name="Home"
        component={Trailers}
        options={{
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44',
          },
          tabBarIcon: ({ color, focused }) => <Fontisto size={28} name="film" color={focused ? 'white': color}/>,
          tabBarShowLabel: false
        }}
      />
      <Bottom.Screen
        name="Search"
        component={Search}
        options={{
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44'
          },
          tabBarIcon: ({ color, focused }) => <Fontisto size={28} name="search" color={focused ? 'white': color} />,
          tabBarShowLabel: false
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: {
            backgroundColor: '#AA4A44',
            borderColor: '#AA4A44'
          },
          tabBarIcon: ({ color, focused }) => <AntDesign size={28} name="user" color={focused ? 'white': color} />,
          tabBarShowLabel: false
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
          tabBarLabelStyle: {fontSize: 16, textTransform: 'capitalize'},
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
            tabBarStyle: {backgroundColor: '#AA4A44'},
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
