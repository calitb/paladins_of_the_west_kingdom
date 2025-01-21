import type { Game } from "./type";
import { createIA, createPlayer } from "./utils";

export const dummyPlayer = createPlayer();
dummyPlayer.name = "Carlos";
dummyPlayer.atributosExtras.aldeanos.red = 4;
dummyPlayer.atributosExtras.aldeanos.blue = 5;
dummyPlayer.atributosExtras.aldeanos.black = 5;
dummyPlayer.atributosExtras.forasteros.red = 1;
dummyPlayer.atributosExtras.forasteros.blue = 0;
dummyPlayer.atributosExtras.fortificaciones.red = 0;
dummyPlayer.atributosExtras.absolver.black = 0;
dummyPlayer.plata = 2;
dummyPlayer.provisiones = 4;
dummyPlayer.deudasPagadas = 2;
dummyPlayer.deudasPendientes = 0;
dummyPlayer.acciones.desarrollar = 6;
dummyPlayer.acciones.comisionar = 0;
dummyPlayer.acciones.absolver = 4;
dummyPlayer.acciones.fortificar = 5;
dummyPlayer.fortificarPV = 1;
dummyPlayer.acciones.atacar = 6;
dummyPlayer.acciones.guarnecer = 1;
dummyPlayer.acciones.convertir[0] = 2;
dummyPlayer.acciones.convertir[1] = 4;
dummyPlayer.acciones.convertir[2] = 4;
dummyPlayer.acciones.convertir[3] = 2;
dummyPlayer.acciones.convertir[4] = 4;
dummyPlayer.acciones.convertir[5] = 3;
dummyPlayer.acciones.convertir[6] = undefined;

export const dummyIA = createIA();
dummyIA.marcadorDeRecursos.red = 0;
dummyIA.marcadorDeRecursos.blue = 2;
dummyIA.marcadorDeRecursos.black = 5;
dummyIA.atributosExtras.forasteros.red = 1;
dummyIA.atributosExtras.forasteros.blue = 1;
dummyIA.atributosExtras.fortificaciones.red = 0;
dummyIA.deudasPagadas = 3;
dummyIA.deudasPendientes = 0;
dummyIA.acciones.comisionar = 3;
dummyIA.acciones.absolver = 2;
dummyIA.acciones.fortificar = 7;
dummyIA.fortificarPV = 3;
dummyIA.acciones.atacar = 6;
dummyIA.acciones.guarnecer = 4;
dummyIA.acciones.convertir[0] = 3;
dummyIA.acciones.convertir[1] = 4;
dummyIA.acciones.convertir[2] = 3;
dummyIA.acciones.convertir[3] = 1;
dummyIA.acciones.convertir[4] = undefined;
dummyIA.acciones.convertir[5] = undefined;
dummyIA.acciones.convertir[6] = undefined;

export const dummyKingsOrders: Game["kingsOrders"] = {
  lower: "convertir",
  medium: "fortificar",
  upper: "atacar",
};
