import { useAtom } from "jotai";
import { Button, SafeAreaView, Text, View } from "react-native";

import { VictoryPoint } from "@/components/paladines/VictoryPointsItem";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import type { Actions, Game } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";
import { gameAtom } from "@/state/atoms/game";

export default function Player4Screen() {
  const [game, setGame] = useAtom(gameAtom);

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 gap-10">
      <View className="flex-row justify-between px-5 py-2">
        <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
          Número de Jugadores
        </Text>
        <View className="flex-row gap-7">
          <Button title="1" onPress={() => setGame({ ...game, players: [createPlayer(), createIA()] })} />
          <Button title="2" onPress={() => setGame({ ...game, players: [createPlayer(), createPlayer()] })} />
          <Button
            title="3"
            onPress={() =>
              setGame({
                ...game,
                players: [createPlayer(), createPlayer(), createPlayer()],
              })
            }
          />
          <Button
            title="4"
            onPress={() =>
              setGame({
                ...game,
                players: [createPlayer(), createPlayer(), createPlayer(), createPlayer()],
              })
            }
          />
        </View>
      </View>
      <View className="py-2 px-5 gap-7">
        <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
          Órdenes del Rey
        </Text>
        <OrdenDelRey game={game} pv={4} level="lower" onPress={setGame} />
        <OrdenDelRey game={game} pv={6} level="medium" onPress={setGame} />
        <OrdenDelRey game={game} pv={8} level="upper" onPress={setGame} />
      </View>
    </SafeAreaView>
  );
}

type OrdenDelReyProps = {
  game: Game;
  pv: number;
  level: "lower" | "medium" | "upper";
  onPress: (updatedGame: Game) => void;
};

function OrdenDelRey({ game, pv, level, onPress }: OrdenDelReyProps) {
  return (
    <View className="flex-row items-center gap-5">
      <VictoryPoint value={pv} />
      <View className="flex-row gap-2">
        <View className="gap-2">
          <OrdenDelReyButton game={game} level={level} action="comisionar" onPress={onPress} />
          <OrdenDelReyButton game={game} level={level} action="absolver" onPress={onPress} />
        </View>
        <View className="gap-2">
          <OrdenDelReyButton game={game} level={level} action="fortificar" onPress={onPress} />
          <OrdenDelReyButton game={game} level={level} action="atacar" onPress={onPress} />
        </View>
        <View className="gap-2">
          <OrdenDelReyButton game={game} level={level} action="convertir" onPress={onPress} />
          <OrdenDelReyButton game={game} level={level} action="guarnecer" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

type OrdenDelReyButtonProps = {
  game: Game;
  level: "lower" | "medium" | "upper";
  action: Actions;
  onPress: (updatedGame: Game) => void;
};

function OrdenDelReyButton({ game, level, action, onPress }: OrdenDelReyButtonProps) {
  return (
    <Button
      title={action}
      color={game.ordenesDelRey[level] === action ? "green" : "gray"}
      onPress={() =>
        onPress({
          ...game,
          ordenesDelRey: {
            ...game.ordenesDelRey,
            [level]: action,
          },
        })
      }
    />
  );
}
