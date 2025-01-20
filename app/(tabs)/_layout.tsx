import { Image, ImageSource } from "expo-image";
import { Tabs } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { gameAtom } from "@/state/atoms/game";

export default function TabLayout() {
  const game = useAtomValue(gameAtom);

  const colorScheme = useColorScheme();

  const renderIcon = (params: { color: string }, source: ImageSource) => {
    return (
      <Image
        className="h-7 w-7"
        style={{
          width: 28,
          height: 28,
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: game.players[0].name ?? "Jugador 1",
          tabBarIcon: (color) =>
            renderIcon(color, require("@/images/icons/user.svg")),
        }}
      />
      <Tabs.Screen
        name="player2"
        options={{
          title: game.players[1].name ?? "Jugador 2",
          tabBarIcon: (color) =>
            renderIcon(color, require("@/images/icons/user.svg")),
        }}
      />
      <Tabs.Screen
        name="player3"
        options={{
          title: game.players[2]?.name ?? "Jugador 3",
          tabBarIcon: (color) =>
            renderIcon(color, require("@/images/icons/user.svg")),
          href: game.players.length > 2 ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="player4"
        options={{
          title: game.players[3]?.name ?? "Jugador 4",
          tabBarIcon: (color) =>
            renderIcon(color, require("@/images/icons/user.svg")),
          href: game.players.length === 4 ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: (color) =>
            renderIcon(color, require("@/images/icons/cog-8-tooth.svg")),
        }}
      />
    </Tabs>
  );
}
