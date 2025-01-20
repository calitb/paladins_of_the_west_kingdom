import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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
          style={{
            fontSize: 20,
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
        <View style={{ flexDirection: "row" }}>
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
    <View
      style={{
        position: "relative",
        width: size === "small" ? 30 : 50,
        height: size === "small" ? 30 : 50,
      }}
    >
      <Image
        style={{
          position: "absolute",
          inset: 0,
          tintColor: "yellow",
        }}
        tintColor="yellow"
        source={require("@/images/icons/bookmark.svg")}
      />
      <View
        style={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: size === "small" ? 12 : 16,
            fontWeight: "bold",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
