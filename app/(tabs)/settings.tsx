import { Image } from "expo-image";
import { useAtom } from "jotai";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { HapticButton } from "@/components/HapticButton";
import { ActionIcons } from "@/components/paladines/Element";
import { VictoryPoint } from "@/components/paladines/VictoryPointsItem";
import type { KingsOrderActions } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";
import { kingsOrdersAtom, playersAtom } from "@/state/atoms/game";

export default function SettingsScreen() {
  const [players, setPlayers] = useAtom(playersAtom);

  return (
    <SafeAreaView className="flex-1 gap-4">
      <ScrollView className="flex-1 items-center bg-[#B7C4D6] px-10 py-5">
        <View className="flex-1 gap-10">
          <View className="items-center justify-between gap-4 px-5 py-2">
            <Text className="text-xl">Number of Players</Text>
            <View className="flex-row gap-7">
              <PlayerButton
                selected={players.length === 2 && !players[1].isHuman}
                onPress={() => setPlayers([createPlayer(1), createIA(2)])}
              >
                1
              </PlayerButton>
              <PlayerButton
                selected={players.length === 2 && players[1].isHuman}
                onPress={() => setPlayers([createPlayer(1), createPlayer(2)])}
              >
                2
              </PlayerButton>
              <PlayerButton
                selected={players.length === 3}
                onPress={() => setPlayers([createPlayer(1), createPlayer(2), createPlayer(3)])}
              >
                3
              </PlayerButton>
              <PlayerButton
                selected={players.length === 4}
                onPress={() => setPlayers([createPlayer(1), createPlayer(2), createPlayer(3), createPlayer(4)])}
              >
                4
              </PlayerButton>
            </View>
          </View>
          <View className="gap-4 px-5 py-2">
            <Text className="text-xl">King's Orders</Text>
            <KingsOrders pv={4} level="lower" />
            <KingsOrders pv={6} level="medium" />
            <KingsOrders pv={8} level="upper" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type PlayerButtonProps = {
  selected: boolean;
  onPress: () => void;
  children: string;
};

function PlayerButton({ selected, onPress, children }: PlayerButtonProps) {
  return (
    <View className={twMerge("rounded-md p-2", selected ? "bg-green-700" : "bg-black")}>
      <HapticButton onPress={onPress}>
        <View className="bg-white px-3 py-2">
          <Text className="text-xl text-black">{children}</Text>
        </View>
      </HapticButton>
    </View>
  );
}

type KingsOrderProps = {
  pv: number;
  level: "lower" | "medium" | "upper";
};

function KingsOrders({ pv, level }: KingsOrderProps) {
  return (
    <View className="flex-row items-center gap-5">
      <VictoryPoint value={pv} />
      <View className="flex-row gap-2">
        <View className="gap-2">
          <KingsOrdersButton level={level} action="commission" />
          <KingsOrdersButton level={level} action="absolve" />
        </View>
        <View className="gap-2">
          <KingsOrdersButton level={level} action="fortify" />
          <KingsOrdersButton level={level} action="attack" />
        </View>
        <View className="gap-2">
          <KingsOrdersButton level={level} action="garrison" />
          <KingsOrdersButton level={level} action="convert" />
        </View>
      </View>
    </View>
  );
}

type KingsOrderButtonProps = {
  level: "lower" | "medium" | "upper";
  action: KingsOrderActions;
};

function KingsOrdersButton({ level, action }: KingsOrderButtonProps) {
  const [kingsOrders, setKingsOrders] = useAtom(kingsOrdersAtom);

  return (
    <HapticButton
      onPress={() =>
        setKingsOrders({
          ...kingsOrders,
          [level]: action,
        })
      }
    >
      <View className={twMerge("rounded-md p-2", kingsOrders[level] === action ? "bg-green-700" : "bg-black")}>
        <Image source={ActionIcons[action]} style={{ width: (70 / 3.0) * 2, height: (80 / 3.0) * 2 }} />
      </View>
    </HapticButton>
  );
}
