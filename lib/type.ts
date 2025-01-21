export type Actions = "convertir" | "fortificar" | "guarnecer" | "absolver" | "atacar" | "comisionar" | "desarrollar";

type KingsOrders = {
  lower: Actions | undefined;
  medium: Actions | undefined;
  upper: Actions | undefined;
};

export type MedidorAtributos = {
  red: number;
  blue: number;
  black: number;
};

type Player = {
  isHuman: boolean;
  name: string | undefined;
  marcadorDeRecursos: MedidorAtributos;
  plata: number;
  provisiones: number;
  deudasPagadas: number;
  deudasPendientes: number;
  acciones: {
    desarrollar: number;
    comisionar: number;
    absolver: number;
    fortificar: number;
    atacar: number;
    guarnecer: number;
    convertir: (number | undefined)[];
  };
  fortificarPV: number;
  atributosExtras: {
    aldeanos: MedidorAtributos;
    forasteros: Omit<MedidorAtributos, "black">;
    fortificaciones: Omit<MedidorAtributos, "blue" | "black">;
    absolver: Omit<MedidorAtributos, "red" | "blue">;
  };
};

export type Game = {
  players: Player[];
  kingsOrders: KingsOrders;
};
