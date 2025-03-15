import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";
import { QueryClientProvider } from "@tanstack/react-query";

import { useQueryClientProvider } from "@/libs/reactQuery";
import Providers from "@/providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = useQueryClientProvider();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <ThemeProvider value={DarkTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="movie/[id]"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </Providers>
  );
}
