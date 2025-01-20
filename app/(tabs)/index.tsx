import { useAtomValue } from "jotai";

import PlayerScreen from "@/components/paladines/PlayerScreen";
import { gameAtom } from "@/state/atoms/game";

export default function Player1Screen() {
  const game = useAtomValue(gameAtom);

  if (game.players.length === 0) {
    return null;
  }

  return <PlayerScreen player={game.players[0]} ordenesDelRey={game.ordenesDelRey} />;
}
