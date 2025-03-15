import { Tabs } from "expo-router";
import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="movie" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites-movies"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
