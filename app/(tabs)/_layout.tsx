import { Fontisto } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import WebNav from "../../components/WebNav";
import { useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  if (Platform.OS === "web" && !isMobile) {
    return <WebNav />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 16, textTransform: "capitalize" },
        tabBarStyle: { backgroundColor: "#AA4A44" },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto size={28} name="film" color={focused ? "white" : color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="now-playing"
        options={{
          title: "Now Playing",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto size={28} name="film" color={focused ? "white" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="up-coming"
        options={{
          title: "Up Coming",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto size={28} name="film" color={focused ? "white" : color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="tv"
        options={{
          title: "TV",
          tabBarIcon: ({ color, focused }) => (
            <Feather size={28} name="tv" color={focused ? "white" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              size={28}
              name="search"
              color={focused ? "white" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
