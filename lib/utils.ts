import type { Actions, Game } from "./type";

export function getNumeroConversiones(player: Game["players"][number]) {
  return player.acciones.convertir.reduce((acc: number, item) => (item == null ? acc : acc + 1), 0);
}

export function getMedidorAtributos(player: Game["players"][number]) {
  return {
    red:
      player.acciones.fortificar +
      getNumeroConversiones(player) +
      player.atributosExtras.aldeanos.red +
      player.atributosExtras.forasteros.red +
      player.atributosExtras.fortificaciones.red +
      player.marcadorDeRecursos.red,
    blue:
      player.acciones.comisionar +
      player.acciones.atacar +
      player.atributosExtras.aldeanos.blue +
      player.atributosExtras.forasteros.blue +
      player.marcadorDeRecursos.blue,
    black:
      player.acciones.absolver +
      player.acciones.guarnecer +
      player.atributosExtras.aldeanos.black +
      player.atributosExtras.absolver.black +
      player.marcadorDeRecursos.black,
  };
}

export function getOrdenDelReyPV(player: Game["players"][number], orden: Actions | undefined, pv: number) {
  return (orden === "convertir" && getNumeroConversiones(player) >= 5) ||
    (orden === "fortificar" && player.acciones.fortificar >= 5) ||
    (orden === "guarnecer" && player.acciones.guarnecer >= 5) ||
    (orden === "absolver" && player.acciones.absolver >= 5) ||
    (orden === "atacar" && player.acciones.atacar >= 5) ||
    (orden === "comisionar" && player.acciones.comisionar >= 5)
    ? pv
    : 0;
}

export function getAttributePV(value: number) {
  return value >= 12
    ? 20
    : value === 11
      ? 16
      : value === 10
        ? 13
        : value === 9
          ? 11
          : value === 8
            ? 9
            : value > 5
              ? 6
              : value > 3
                ? 3
                : value > 1
                  ? 1
                  : 0;
}

export function getActionPV(player: Game["players"][number], action: Actions) {
  if (action === "comisionar") {
    return player.acciones.comisionar === 5
      ? 2
      : player.acciones.comisionar === 6
        ? 5
        : player.acciones.comisionar === 7
          ? 9
          : 0;
  } else if (action === "guarnecer") {
    return player.acciones.guarnecer === 5
      ? 2
      : player.acciones.guarnecer === 6
        ? 5
        : player.acciones.guarnecer === 7
          ? 9
          : 0;
  } else if (action === "absolver") {
    return player.acciones.absolver === 5
      ? 1
      : player.acciones.absolver === 6
        ? 3
        : player.acciones.absolver === 7
          ? 6
          : 0;
  } else if (action === "fortificar") {
    return player.acciones.fortificar === 5
      ? 1
      : player.acciones.fortificar === 6
        ? 3
        : player.acciones.fortificar === 7
          ? 6
          : 0;
  } else if (action === "desarrollar") {
    return player.acciones.desarrollar === 6
      ? 1
      : player.acciones.desarrollar === 7
        ? 3
        : player.acciones.desarrollar === 8
          ? 6
          : 0;
  } else if (action === "convertir") {
    return player.acciones.convertir.reduce((acc: number, item) => acc + (item ?? 0), 0);
  }

  return 0;
}

export function getVictoryPoints(player: Game["players"][number], ordenes: Game["ordenesDelRey"]): number {
  const ordenesDelRey =
    getOrdenDelReyPV(player, ordenes.lower, 4) +
    getOrdenDelReyPV(player, ordenes.medium, 6) +
    getOrdenDelReyPV(player, ordenes.upper, 8);

  const deudas = player.deudasPagadas - player.deudasPendientes * 3;
  const plataProvisiones = Math.floor((player.plata + player.provisiones) / 3);

  const attributes = getMedidorAtributos(player);
  const red = getAttributePV(attributes.red);
  const blue = getAttributePV(attributes.blue);
  const black = getAttributePV(attributes.black);

  const comisionar = getActionPV(player, "comisionar");
  const guarnecer = getActionPV(player, "guarnecer");
  const absolver = getActionPV(player, "absolver");
  const fortificar = getActionPV(player, "fortificar");
  const desarrollar = getActionPV(player, "desarrollar");
  const convertir = getActionPV(player, "convertir");

  return (
    red +
    blue +
    black +
    ordenesDelRey +
    deudas +
    comisionar +
    absolver +
    fortificar +
    player.fortificarPV +
    guarnecer +
    convertir +
    desarrollar +
    plataProvisiones
  );
}

export function createPlayer(): Game["players"][number] {
  return {
    isHuman: true,
    name: undefined,
    marcadorDeRecursos: {
      red: 0,
      blue: 0,
      black: 0,
    },
    plata: 3,
    provisiones: 1,
    deudasPagadas: 0,
    deudasPendientes: 0,
    acciones: {
      desarrollar: 0,
      comisionar: 0,
      absolver: 0,
      fortificar: 0,
      atacar: 0,
      guarnecer: 0,
      convertir: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    },
    fortificarPV: 0,
    atributosExtras: {
      aldeanos: {
        red: 0,
        blue: 0,
        black: 0,
      },
      forasteros: {
        red: 0,
        blue: 0,
      },
      fortificaciones: {
        red: 0,
      },
      absolver: {
        black: 0,
      },
    },
  };
}

export function createIA(): Game["players"][number] {
  return {
    isHuman: false,
    name: "IA",
    marcadorDeRecursos: {
      red: 0,
      blue: 0,
      black: 0,
    },
    plata: 0,
    provisiones: 0,
    deudasPagadas: 0,
    deudasPendientes: 0,
    acciones: {
      desarrollar: 0,
      comisionar: 0,
      absolver: 0,
      fortificar: 0,
      atacar: 0,
      guarnecer: 0,
      convertir: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    },
    fortificarPV: 0,
    atributosExtras: {
      aldeanos: {
        red: 0,
        blue: 0,
        black: 0,
      },
      forasteros: {
        red: 0,
        blue: 0,
      },
      fortificaciones: {
        red: 0,
      },
      absolver: {
        black: 0,
      },
    },
  };
}
