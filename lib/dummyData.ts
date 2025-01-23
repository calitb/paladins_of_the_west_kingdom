import type { Game } from "./type";
import { createIA, createPlayer } from "./utils";

export const dummyPlayer = createPlayer(1);
dummyPlayer.name = "Carlos";
dummyPlayer.extraAttributes.townsfolks.red = 4;
dummyPlayer.extraAttributes.townsfolks.blue = 5;
dummyPlayer.extraAttributes.townsfolks.black = 5;
dummyPlayer.extraAttributes.outsiders.red = 1;
dummyPlayer.extraAttributes.outsiders.blue = 0;
dummyPlayer.extraAttributes.fortify.red = 0;
dummyPlayer.extraAttributes.absolve.black = 0;
dummyPlayer.silver = 2;
dummyPlayer.provisions = 4;
dummyPlayer.paidDebts = 2;
dummyPlayer.pendingDebts = 0;
dummyPlayer.actions.develop = 6;
dummyPlayer.actions.commission = 0;
dummyPlayer.actions.absolve = 4;
dummyPlayer.actions.fortify = 5;
dummyPlayer.fortifyPV = 1;
dummyPlayer.actions.attack = 6;
dummyPlayer.actions.garrison = 1;
dummyPlayer.actions.convert[0] = 2;
dummyPlayer.actions.convert[1] = 4;
dummyPlayer.actions.convert[2] = 4;
dummyPlayer.actions.convert[3] = 2;
dummyPlayer.actions.convert[4] = 4;
dummyPlayer.actions.convert[5] = 3;
dummyPlayer.actions.convert[6] = undefined;

export const dummyIA = createIA(2);
dummyIA.resourcesMarker.red = 0;
dummyIA.resourcesMarker.blue = 2;
dummyIA.resourcesMarker.black = 5;
dummyIA.extraAttributes.outsiders.red = 1;
dummyIA.extraAttributes.outsiders.blue = 1;
dummyIA.extraAttributes.fortify.red = 0;
dummyIA.paidDebts = 3;
dummyIA.pendingDebts = 0;
dummyIA.actions.commission = 3;
dummyIA.actions.absolve = 2;
dummyIA.actions.fortify = 7;
dummyIA.fortifyPV = 3;
dummyIA.actions.attack = 6;
dummyIA.actions.garrison = 4;
dummyIA.actions.convert[0] = 3;
dummyIA.actions.convert[1] = 4;
dummyIA.actions.convert[2] = 3;
dummyIA.actions.convert[3] = 1;
dummyIA.actions.convert[4] = undefined;
dummyIA.actions.convert[5] = undefined;
dummyIA.actions.convert[6] = undefined;

export const dummyKingsOrders: Game["kingsOrders"] = {
  lower: "convert",
  medium: "fortify",
  upper: "attack",
};
