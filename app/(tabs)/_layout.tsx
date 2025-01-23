import { Image, ImageSource } from "expo-image";
import { Tabs } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { playersAtom } from "@/state/atoms/game";

export default function TabLayout() {
  const players = useAtomValue(playersAtom);

  const colorScheme = useColorScheme();

  const renderIcon = (params: { color: string }, source: ImageSource) => {
    return (
      <Image
        className="h-7 w-7"
        style={{
          tintColor: params.color,
        }}
        tintColor={params.color}
        source={source}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          marginBottom: Platform.OS === "web" ? 20 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: players[0].name ?? "Jugador 1",
          tabBarIcon: (color) => renderIcon(color, require("@/images/icons/user.svg")),
        }}
      />
      <Tabs.Screen
        name="player2"
        options={{
          title: players[1].name ?? "Jugador 2",
          tabBarIcon: (color) => renderIcon(color, require("@/images/icons/user.svg")),
        }}
      />
      <Tabs.Screen
        name="player3"
        options={{
          title: players[2]?.name ?? "Jugador 3",
          tabBarIcon: (color) => renderIcon(color, require("@/images/icons/user.svg")),
          href: players.length > 2 ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="player4"
        options={{
          title: players[3]?.name ?? "Jugador 4",
          tabBarIcon: (color) => renderIcon(color, require("@/images/icons/user.svg")),
          href: players.length === 4 ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: (color) => renderIcon(color, require("@/images/icons/cog-8-tooth.svg")),
        }}
      />
    </Tabs>
  );
}
