import { Stack } from "expo-router/stack";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function WebNav() {
  const router = useRouter();
  const pathname = usePathname();
  const navConfig: { label: string; icon: "film" | "search"; path: string }[] =
    [
      {
        label: "Movies",
        icon: "film",
        path: "/",
      },
      {
        label: "Search",
        icon: "search",
        path: "/search",
      },
    ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.navTitleContainer}>
          <Text style={styles.navTitle}>Social Entertainment</Text>
        </View>
        {navConfig.map((item) => (
          <Pressable
            style={[
              styles.navItem,
              pathname === item.path && styles.activeNavItem,
            ]}
            onPress={() => router.push(item.path)}
          >
            <Fontisto size={24} name={item.icon} color="white" />
            <Text
              style={[
                styles.navText,
                pathname === item.path && styles.activeNavText,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="search" />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#AA4A44",
    padding: 8,
    gap: 24,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  navText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  activeNavText: {
    color: "white",
  },
  navTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  navTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
