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
      <View className="flex-row items-center gap-4">
        {values != null && (
          <>
            {values.map((value, index) => (
              <Pressable key={index} onPress={() => onPressValue?.(index)}>
                <ValueBox value={value} color="gray" onPressValue={undefined} />
              </Pressable>
            ))}
          </>
        )}
        <Text
          className="text-xl"
          style={{
            color: Colors[colorScheme ?? "light"].text,
          }}
        >
          {title}
        </Text>
        {vpDetails != null && (
          <>
            {vpDetails.map((value, index) => (
              <Pressable key={index} onPress={() => onPressVPDetails?.(index)}>
                <VictoryPoint key={index} value={value} size="small" />
              </Pressable>
            ))}
          </>
        )}
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
  size?: "small" | "normal";
};

export function VictoryPoint({ value, size = "normal" }: VictoryPointProps) {
  return (
    <View className={twMerge("relative", size === "small" ? "w-8 h-8" : "w-12 h-12")}>
      <Image
        className="absolute inset-0"
        style={{
          tintColor: "yellow",
        }}
        tintColor="yellow"
        source={require("@/images/icons/bookmark.svg")}
      />
      <View className="absolute inset-0 items-center justify-center">
        <Text className={twMerge("font-bold", size === "small" ? "text-xs" : "text-base")}>{value}</Text>
      </View>
    </View>
  );
}
