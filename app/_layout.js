import { Stack } from 'expo-router/stack';
import { headerOptions } from './headerOptions';

export default function AppLayout() {
  return (
    <Stack screenOptions={headerOptions}>
      <Stack.Screen name="(tab-manager)" options={{ headerShown: true, headerTitle: "Movies", headerShadowVisible: false }} />
    </Stack>
  );
}
