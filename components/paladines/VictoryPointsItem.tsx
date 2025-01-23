import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type Props = {
  value: number;
};

export default function VictoryPointsItem({ value }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View
      className="flex-row justify-between items-center py-1 px-2 border"
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
        borderColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      <Text
        className="text-xl"
        style={{
          color: Colors[colorScheme ?? "light"].text,
        }}
      >
        Victory Points
      </Text>
      <VictoryPoint value={value} />
    </View>
  );
}

type VictoryPointProps = {
  value: number | undefined;
  size?: "small" | "normal" | "large";
  color?: "yellow" | "red" | "blue" | "black";
};

export function VictoryPoint({ value, size = "normal", color = "yellow" }: VictoryPointProps) {
  return (
    <View className={twMerge("relative", size === "small" ? "w-8 h-8" : size === "normal" ? "w-11 h-11" : "w-14 h-14")}>
      <Image
        className="absolute inset-0"
        style={{
          tintColor: color,
        }}
        tintColor={color}
        source={require("@/images/icons/bookmark.svg")}
      />
      <View className="absolute inset-0 items-center justify-center">
        <Text
          style={{
            color: color === "yellow" ? "black" : "white",
          }}
          className={twMerge("font-bold", size === "small" ? "text-xs" : size === "normal" ? "text-base" : "text-lg")}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
