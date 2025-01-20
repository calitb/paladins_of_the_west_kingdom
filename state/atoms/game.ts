import { atom } from "jotai";

import type { Game } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";

export const gameAtom = atom({
  players: [createPlayer(), createIA()],
  ordenesDelRey: {
    lower: undefined,
    medium: undefined,
    upper: undefined,
  },
} as Game);
