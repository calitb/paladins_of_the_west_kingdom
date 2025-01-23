import type { Actions, Game, KingsOrderActions } from "./type";

export function getNumberOfConversions(player: Game["players"][number]) {
  return player.actions.convert.reduce((acc: number, item) => (item == null ? acc : acc + 1), 0);
}

export function getAttributesTotals(player: Game["players"][number]) {
  return {
    red:
      player.actions.fortify +
      getNumberOfConversions(player) +
      player.extraAttributes.townsfolks.red +
      player.extraAttributes.outsiders.red +
      player.extraAttributes.fortify.red +
      player.resourcesMarker.red,
    blue:
      player.actions.commission +
      player.actions.attack +
      player.extraAttributes.townsfolks.blue +
      player.extraAttributes.outsiders.blue +
      player.resourcesMarker.blue,
    black:
      player.actions.absolve +
      player.actions.garrison +
      player.extraAttributes.townsfolks.black +
      player.extraAttributes.absolve.black +
      player.resourcesMarker.black,
  };
}

export function getKingsOrderVictoryPoints(
  player: Game["players"][number],
  orden: KingsOrderActions | undefined,
  pv: number,
) {
  return (orden === "convert" && getNumberOfConversions(player) >= 5) ||
    (orden === "fortify" && player.actions.fortify >= 5) ||
    (orden === "garrison" && player.actions.garrison >= 5) ||
    (orden === "absolve" && player.actions.absolve >= 5) ||
    (orden === "attack" && player.actions.attack >= 5) ||
    (orden === "commission" && player.actions.commission >= 5)
    ? pv
    : 0;
}

export function getAttributeVictoryPoints(value: number) {
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

export function getActionVictoryPoints(player: Game["players"][number], action: Actions) {
  if (action === "commission") {
    return player.actions.commission === 5
      ? 2
      : player.actions.commission === 6
        ? 5
        : player.actions.commission === 7
          ? 9
          : 0;
  } else if (action === "garrison") {
    return player.actions.garrison === 5
      ? 2
      : player.actions.garrison === 6
        ? 5
        : player.actions.garrison === 7
          ? 9
          : 0;
  } else if (action === "absolve") {
    return player.actions.absolve === 5 ? 1 : player.actions.absolve === 6 ? 3 : player.actions.absolve === 7 ? 6 : 0;
  } else if (action === "fortify") {
    return player.actions.fortify === 5 ? 1 : player.actions.fortify === 6 ? 3 : player.actions.fortify === 7 ? 6 : 0;
  } else if (action === "develop") {
    return player.actions.develop === 6 ? 1 : player.actions.develop === 7 ? 3 : player.actions.develop === 8 ? 6 : 0;
  } else if (action === "convert") {
    return player.actions.convert.reduce((acc: number, item) => acc + (item ?? 0), 0);
  }

  return 0;
}

export function getVictoryPoints(player: Game["players"][number], ordenes: Game["kingsOrders"]): number {
  const kingsOrders =
    getKingsOrderVictoryPoints(player, ordenes.lower, 4) +
    getKingsOrderVictoryPoints(player, ordenes.medium, 6) +
    getKingsOrderVictoryPoints(player, ordenes.upper, 8);

  const deudas = player.paidDebts - player.pendingDebts * 3;
  const plataProvisiones = Math.floor((player.silver + player.provisions) / 3);

  const attributes = getAttributesTotals(player);
  const red = getAttributeVictoryPoints(attributes.red);
  const blue = getAttributeVictoryPoints(attributes.blue);
  const black = getAttributeVictoryPoints(attributes.black);

  const commission = getActionVictoryPoints(player, "commission");
  const garrison = getActionVictoryPoints(player, "garrison");
  const absolve = getActionVictoryPoints(player, "absolve");
  const fortify = getActionVictoryPoints(player, "fortify");
  const develop = getActionVictoryPoints(player, "develop");
  const convert = getActionVictoryPoints(player, "convert");

  return (
    red +
    blue +
    black +
    kingsOrders +
    deudas +
    commission +
    absolve +
    fortify +
    player.fortifyPV +
    garrison +
    convert +
    develop +
    plataProvisiones
  );
}

export function createPlayer(id: number): Game["players"][number] {
  return {
    id,
    isHuman: true,
    name: undefined,
    resourcesMarker: {
      red: 0,
      blue: 0,
      black: 0,
    },
    silver: 3,
    provisions: 1,
    paidDebts: 0,
    pendingDebts: 0,
    actions: {
      develop: 0,
      commission: 0,
      absolve: 0,
      fortify: 0,
      attack: 0,
      garrison: 0,
      convert: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    },
    fortifyPV: 0,
    extraAttributes: {
      townsfolks: {
        red: 0,
        blue: 0,
        black: 0,
      },
      outsiders: {
        red: 0,
        blue: 0,
      },
      fortify: {
        red: 0,
      },
      absolve: {
        black: 0,
      },
    },
  };
}

export function createIA(id: number): Game["players"][number] {
  return {
    id,
    isHuman: false,
    name: "IA",
    resourcesMarker: {
      red: 0,
      blue: 0,
      black: 0,
    },
    silver: 0,
    provisions: 0,
    paidDebts: 0,
    pendingDebts: 0,
    actions: {
      develop: 0,
      commission: 0,
      absolve: 0,
      fortify: 0,
      attack: 0,
      garrison: 0,
      convert: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    },
    fortifyPV: 0,
    extraAttributes: {
      townsfolks: {
        red: 0,
        blue: 0,
        black: 0,
      },
      outsiders: {
        red: 0,
        blue: 0,
      },
      fortify: {
        red: 0,
      },
      absolve: {
        black: 0,
      },
    },
  };
}
