import type { Game } from "./type";
import { createIA, createPlayer } from "./utils";

export const jugador1 = createPlayer();
jugador1.name = "Carlos";
jugador1.atributosExtras.aldeanos.red = 4;
jugador1.atributosExtras.aldeanos.blue = 5;
jugador1.atributosExtras.aldeanos.black = 5;
jugador1.atributosExtras.forasteros.red = 1;
jugador1.atributosExtras.forasteros.blue = 0;
jugador1.atributosExtras.fortificaciones.red = 0;
jugador1.atributosExtras.absolver.black = 0;
jugador1.plata = 2;
jugador1.provisiones = 4;
jugador1.deudasPagadas = 2;
jugador1.deudasPendientes = 0;
jugador1.acciones.desarrollar = 6;
jugador1.acciones.comisionar = 0;
jugador1.acciones.absolver = 4;
jugador1.acciones.fortificar = 5;
jugador1.fortificarPV = 1;
jugador1.acciones.atacar = 6;
jugador1.acciones.guarnecer = 1;
jugador1.acciones.convertir[0] = 2;
jugador1.acciones.convertir[1] = 4;
jugador1.acciones.convertir[2] = 4;
jugador1.acciones.convertir[3] = 2;
jugador1.acciones.convertir[4] = 4;
jugador1.acciones.convertir[5] = 3;
jugador1.acciones.convertir[6] = undefined;

export const jugadorIA = createIA();
jugadorIA.marcadorDeRecursos.red = 0;
jugadorIA.marcadorDeRecursos.blue = 2;
jugadorIA.marcadorDeRecursos.black = 5;
jugadorIA.atributosExtras.forasteros.red = 1;
jugadorIA.atributosExtras.forasteros.blue = 1;
jugadorIA.atributosExtras.fortificaciones.red = 0;
jugadorIA.deudasPagadas = 3;
jugadorIA.deudasPendientes = 0;
jugadorIA.acciones.comisionar = 3;
jugadorIA.acciones.absolver = 2;
jugadorIA.acciones.fortificar = 7;
jugadorIA.fortificarPV = 3;
jugadorIA.acciones.atacar = 6;
jugadorIA.acciones.guarnecer = 4;
jugadorIA.acciones.convertir[0] = 3;
jugadorIA.acciones.convertir[1] = 4;
jugadorIA.acciones.convertir[2] = 3;
jugadorIA.acciones.convertir[3] = 1;
jugadorIA.acciones.convertir[4] = undefined;
jugadorIA.acciones.convertir[5] = undefined;
jugadorIA.acciones.convertir[6] = undefined;

export const ordenesDelRey: Game["ordenesDelRey"] = {
  lower: "convertir",
  medium: "fortificar",
  upper: "atacar",
};
