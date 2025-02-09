import { Image } from "expo-image";
import { useAtom } from "jotai";
import { useState } from "react";
import { Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { Game } from "@/lib/type";
import { playersAtom } from "@/state/atoms/game";

import { HapticButton } from "../HapticButton";
import { VictoryPoint } from "./VictoryPointsItem";

type Props = {
  playerId: number;
  value: number | undefined;
  minValue?: number;
  maxValue: number;
  icon?: React.ReactNode;
  onChangeValue: (player: Game["players"][number], value: number) => Game["players"][number];
  inputBackgroundColor?: "red" | "blue" | "black" | "yellow";
  orientation?: "horizontal" | "vertical";
};

export default function Counter({
  playerId,
  value: initialValue,
  onChangeValue,
  minValue = 0,
  maxValue,
  icon,
  inputBackgroundColor,
  orientation = "horizontal",
}: Props) {
  const [players, setPlayers] = useAtom(playersAtom);
  const [value, setValue] = useState(initialValue);

  const colorScheme = useColorScheme();

  return (
    <View className={orientation === "vertical" ? "flex-col gap-6" : "flex-row items-center gap-4"}>
      {inputBackgroundColor == null ? (
        <View
          className="items-center justify-center bg-white"
          style={{
            width: 35,
            height: 40,
            borderColor: Colors[colorScheme ?? "light"].text,
          }}
        >
          <Text className="text-xl font-bold">{value}</Text>
        </View>
      ) : (
        <View
          className="items-center justify-center"
          style={{
            width: 35,
            height: 40,
          }}
        >
          <VictoryPoint
            size="large"
            color={inputBackgroundColor}
            value={value == null ? undefined : value >= 0 ? value : undefined}
          />
        </View>
      )}
      {icon}
      <View className={orientation === "vertical" ? "flex-col-reverse gap-6" : "flex-row gap-4"}>
        <HapticButton
          onPress={() => {
            if (value == null || value === minValue) return;
            setValue(value - 1);

            const updatedPlayers = [...players];
            const playerIndex = updatedPlayers.findIndex((p) => p.id === playerId);
            const updatedPlayer = onChangeValue(updatedPlayers[playerIndex], value - 1);
            updatedPlayers[playerIndex] = updatedPlayer;
            setPlayers(updatedPlayers);
          }}
        >
          <Image
            style={{
              tintColor: "yellow",
            }}
            tintColor="yellow"
            className="h-11 w-11"
            source={require("@/images/icons/arrow-down-circle.svg")}
          />
        </HapticButton>
        <HapticButton
          onPress={() => {
            if (value === maxValue) return;
            setValue((value ?? -1) + 1);

            const updatedPlayers = [...players];
            const playerIndex = updatedPlayers.findIndex((p) => p.id === playerId);
            const updatedPlayer = onChangeValue(updatedPlayers[playerIndex], (value ?? -1) + 1);
            updatedPlayers[playerIndex] = updatedPlayer;
            setPlayers(updatedPlayers);
          }}
        >
          <Image
            style={{
              tintColor: "yellow",
            }}
            tintColor="yellow"
            className="h-11 w-11"
            source={require("@/images/icons/arrow-up-circle.svg")}
          />
        </HapticButton>
      </View>
    </View>
  );
}
