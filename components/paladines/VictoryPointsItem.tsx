import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Item from "./Item";
import { ValueBox } from "./MedidorDeAtributo";

type Props = {
  title: string;
  values?: number[];
  vp?: number[];
  vpDetails?: (number | undefined)[];
  onPressValue?: (index: number) => void;
  onPressVPDetails?: (index: number) => void;
};

export default function VictoryPointsItem({ title, values, vp, vpDetails, onPressValue, onPressVPDetails }: Props) {
  const colorScheme = useColorScheme();

  return (
    <Item>
      <View className={"flex-row items-center gap-2"}>
        {values != null && (
          <View className="flex-row gap-2">
            {values.map((value, index) => (
              <Pressable key={index} onPress={() => onPressValue?.(index)}>
                <ValueBox value={value} color="gray" onPressValue={undefined} />
              </Pressable>
            ))}
          </View>
        )}
        <View className={(vpDetails?.length ?? 0) > 2 ? "justify-center" : "flex-row items-center gap-2"}>
          <Text
            className="text-xl"
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            {title}
          </Text>
          {vpDetails != null && (
            <View className="flex-row gap-4">
              {vpDetails.map((value, index) => (
                <Pressable key={index} onPress={() => onPressVPDetails?.(index)}>
                  <VictoryPoint key={index} value={value} size="small" />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      {vp != null && (
        <View className="flex-row">
          {vp.map((value, index) => (
            <VictoryPoint key={index} value={value} />
          ))}
        </View>
      )}
    </Item>
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
