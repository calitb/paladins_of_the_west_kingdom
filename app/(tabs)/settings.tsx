import { useAtom, useSetAtom } from "jotai";
import { Button, SafeAreaView, Text, View } from "react-native";

import { VictoryPoint } from "@/components/paladines/VictoryPointsItem";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import type { Actions } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";
import { kingsOrdersAtom, playersAtom } from "@/state/atoms/game";

export default function Player4Screen() {
  const setPlayers = useSetAtom(playersAtom);

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 gap-10">
      <View className="flex-row justify-between px-5 py-2">
        <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
          Número de Jugadores
        </Text>
        <View className="flex-row gap-7">
          <Button title="1" onPress={() => setPlayers([createPlayer(), createIA()])} />
          <Button title="2" onPress={() => setPlayers([createPlayer(), createPlayer()])} />
          <Button title="3" onPress={() => setPlayers([createPlayer(), createPlayer(), createPlayer()])} />
          <Button
            title="4"
            onPress={() => setPlayers([createPlayer(), createPlayer(), createPlayer(), createPlayer()])}
          />
        </View>
      </View>
      <View className="py-2 px-5 gap-7">
        <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
          Órdenes del Rey
        </Text>
        <KingsOrders pv={4} level="lower" />
        <KingsOrders pv={6} level="medium" />
        <KingsOrders pv={8} level="upper" />
      </View>
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
          <KingsOrdersButton level={level} action="comisionar" />
          <KingsOrdersButton level={level} action="absolver" />
        </View>
        <View className="gap-2">
          <KingsOrdersButton level={level} action="fortificar" />
          <KingsOrdersButton level={level} action="atacar" />
        </View>
        <View className="gap-2">
          <KingsOrdersButton level={level} action="convertir" />
          <KingsOrdersButton level={level} action="guarnecer" />
        </View>
      </View>
    </View>
  );
}

type KingsOrderButtonProps = {
  level: "lower" | "medium" | "upper";
  action: Actions;
};

function KingsOrdersButton({ level, action }: KingsOrderButtonProps) {
  const [kingsOrders, setKingsOrders] = useAtom(kingsOrdersAtom);

  return (
    <Button
      title={action}
      color={kingsOrders[level] === action ? "green" : "gray"}
      onPress={() =>
        setKingsOrders({
          ...kingsOrders,
          [level]: action,
        })
      }
    />
  );
}
