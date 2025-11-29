import { Stack } from "expo-router";
import './global.css';
import { StatusBar } from "react-native";
import { AuthProvider } from "@/services/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}
