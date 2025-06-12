import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Text,
} from "react-native";
import { Stack } from "expo-router";

interface MediaContainerProps {
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
  title?: string;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
}

export default function MediaContainer({
  children,
  loading = false,
  error = null,
  style,
  contentStyle,
  backgroundColor = "#1B1212",
  title,
  headerRight,
  headerLeft,
}: MediaContainerProps) {
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }, style]}>
      <Stack.Screen
        options={{
          title: title ?? "",
          headerRight: () => headerRight,
          headerLeft: () => headerLeft,
          headerStyle: {
            backgroundColor,
          },
          headerTintColor: "#fff",
        }}
      />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
