export type KingsOrderActions = "convert" | "fortify" | "garrison" | "absolve" | "attack" | "commission";
export type Actions = KingsOrderActions | "develop";

type KingsOrders = {
  lower: KingsOrderActions | undefined;
  medium: KingsOrderActions | undefined;
  upper: KingsOrderActions | undefined;
};

export type Attributes = "red" | "blue" | "black";
export type AttributeTracks = {
  red: number;
  blue: number;
  black: number;
};

type Player = {
  id: number;
  isHuman: boolean;
  name: string | undefined;
  resourcesMarker: AttributeTracks;
  silver: number;
  provisions: number;
  paidDebts: number;
  pendingDebts: number;
  actions: {
    develop: number;
    commission: number;
    absolve: number;
    fortify: number;
    attack: number;
    garrison: number;
    convert: (number | undefined)[];
  };
  fortifyPV: number;
  extraAttributes: {
    townsfolks: AttributeTracks;
    outsiders: Omit<AttributeTracks, "black">;
    fortify: Omit<AttributeTracks, "blue" | "black">;
    absolve: Omit<AttributeTracks, "red" | "blue">;
  };
};

export type Game = {
  players: Player[];
  kingsOrders: KingsOrders;
};
