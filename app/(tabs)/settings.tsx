import { Image } from "expo-image";
import { useAtom, useSetAtom } from "jotai";
import { Button, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { ActionIcons } from "@/components/paladines/Element";
import { VictoryPoint } from "@/components/paladines/VictoryPointsItem";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { KingsOrderActions } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";
import { kingsOrdersAtom, playersAtom } from "@/state/atoms/game";

export default function Player4Screen() {
  const setPlayers = useSetAtom(playersAtom);

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 gap-4">
      <ScrollView className="flex-1 px-10 py-5 gap-10">
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
            Number of Players
          </Text>
          <View className="flex-row gap-7">
            <Button title="1" onPress={() => setPlayers([createPlayer(1), createIA(2)])} />
            <Button title="2" onPress={() => setPlayers([createPlayer(1), createPlayer(2)])} />
            <Button title="3" onPress={() => setPlayers([createPlayer(1), createPlayer(2), createPlayer(3)])} />
            <Button
              title="4"
              onPress={() => setPlayers([createPlayer(1), createPlayer(2), createPlayer(3), createPlayer(4)])}
            />
          </View>
        </View>
        <View className="py-2 px-5 gap-7">
          <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
            King's Orders
          </Text>
          <KingsOrders pv={4} level="lower" />
          <KingsOrders pv={6} level="medium" />
          <KingsOrders pv={8} level="upper" />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    <Pressable
      onPress={() =>
        setKingsOrders({
          ...kingsOrders,
          [level]: action,
        })
      }
    >
      <View className={twMerge("p-2", kingsOrders[level] === action ? "bg-green-700" : "bg-gray-200")}>
        <Image source={ActionIcons[action]} style={{ width: 70, height: 80 }} />
      </View>
    </Pressable>
  );
}
