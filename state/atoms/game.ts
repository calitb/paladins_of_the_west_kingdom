import { atom } from "jotai";

import type { Game } from "@/lib/type";
import { createIA, createPlayer } from "@/lib/utils";

export const playersAtom = atom([createPlayer(), createIA()] as Game["players"]);

export const kingsOrdersAtom = atom({
  lower: undefined,
  medium: undefined,
  upper: undefined,
} as Game["kingsOrders"]);
