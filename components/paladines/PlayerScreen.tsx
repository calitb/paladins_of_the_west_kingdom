import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { Game } from "@/lib/type";
import {
  getActionVictoryPoints,
  getAttributeVictoryPoints,
  getAttributesTotals,
  getKingsOrderVictoryPoints,
  getNumberOfConversions,
  getVictoryPoints,
} from "@/lib/utils";
import { kingsOrdersAtom, playersAtom } from "@/state/atoms/game";

import MedidorAtributos from "./MedidorDeAtributo";
import VictoryPointsItem from "./VictoryPointsItem";

type Props = {
  playerIndex: number;
};

export default function PlayerScreen({ playerIndex }: Props) {
  const [players, setPlayers] = useAtom(playersAtom);
  const kingsOrders = useAtomValue(kingsOrdersAtom);

  const player = players[playerIndex];

  const setPlayer = (newPlayer: Game["players"][number]) => {
    setPlayers(players.map((p, i) => (i === playerIndex ? newPlayer : p)));
  };

  const [modalProps, setModalProps] = useState<{
    handler: (value: number) => void;
    value: number;
    title: string;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 gap-2 bg-gray-400">
        {!player.isHuman && (
          <MedidorAtributos
            title="Marcador de Recursos"
            red={player.marcadorDeRecursos.red}
            black={player.marcadorDeRecursos.black}
            blue={player.marcadorDeRecursos.blue}
            onPressValue={(index: number) => {
              setModalProps({
                title:
                  index === 0
                    ? "Marcador de Recursos (Fuerza)"
                    : index === 1
                      ? "Marcador de Recursos (Fe)"
                      : "Marcador de Recursos (Influencia)",
                value:
                  index === 0
                    ? player.marcadorDeRecursos.red
                    : index === 1
                      ? player.marcadorDeRecursos.black
                      : player.marcadorDeRecursos.blue,
                handler: (value: number) => {
                  if (index === 0) {
                    setPlayer({
                      ...player,
                      marcadorDeRecursos: {
                        ...player.marcadorDeRecursos,
                        red: value,
                      },
                    });
                  } else if (index === 1) {
                    setPlayer({
                      ...player,
                      marcadorDeRecursos: {
                        ...player.marcadorDeRecursos,
                        black: value,
                      },
                    });
                  } else {
                    setPlayer({
                      ...player,
                      marcadorDeRecursos: {
                        ...player.marcadorDeRecursos,
                        blue: value,
                      },
                    });
                  }
                },
              });
            }}
          />
        )}
        {player.isHuman && (
          <MedidorAtributos
            title="Aldeanos"
            red={player.atributosExtras.aldeanos.red}
            black={player.atributosExtras.aldeanos.black}
            blue={player.atributosExtras.aldeanos.blue}
            onPressValue={(index: number) => {
              setModalProps({
                title: index === 0 ? "Aldeanos (Fuerza)" : index === 1 ? "Aldeanos (Fe)" : "Aldeanos (Influencia)",
                value:
                  index === 0
                    ? player.atributosExtras.aldeanos.red
                    : index === 1
                      ? player.atributosExtras.aldeanos.black
                      : player.atributosExtras.aldeanos.blue,
                handler: (value: number) => {
                  if (index === 0) {
                    setPlayer({
                      ...player,
                      atributosExtras: {
                        ...player.atributosExtras,
                        aldeanos: {
                          ...player.atributosExtras.aldeanos,
                          red: value,
                        },
                      },
                    });
                  } else if (index === 1) {
                    setPlayer({
                      ...player,
                      atributosExtras: {
                        ...player.atributosExtras,
                        aldeanos: {
                          ...player.atributosExtras.aldeanos,
                          black: value,
                        },
                      },
                    });
                  } else {
                    setPlayer({
                      ...player,
                      atributosExtras: {
                        ...player.atributosExtras,
                        aldeanos: {
                          ...player.atributosExtras.aldeanos,
                          blue: value,
                        },
                      },
                    });
                  }
                },
              });
            }}
          />
        )}
        <MedidorAtributos
          title="Forasteros"
          red={player.atributosExtras.forasteros.red}
          black={undefined}
          blue={player.atributosExtras.forasteros.blue}
          onPressValue={(index: number) => {
            setModalProps({
              title: index === 0 ? "Forasteros (Fuerza)" : "Forasteros (Influencia)",
              value: index === 0 ? player.atributosExtras.forasteros.red : player.atributosExtras.forasteros.blue,
              handler: (value: number) => {
                if (index === 0) {
                  setPlayer({
                    ...player,
                    atributosExtras: {
                      ...player.atributosExtras,
                      forasteros: {
                        ...player.atributosExtras.forasteros,
                        red: value,
                      },
                    },
                  });
                } else {
                  setPlayer({
                    ...player,
                    atributosExtras: {
                      ...player.atributosExtras,
                      forasteros: {
                        ...player.atributosExtras.forasteros,
                        blue: value,
                      },
                    },
                  });
                }
              },
            });
          }}
        />
        <MedidorAtributos
          title="Fortificar"
          red={player.atributosExtras.fortificaciones.red}
          black={undefined}
          blue={undefined}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Fortificaciones (Fuerza)",
              value: player.atributosExtras.fortificaciones.red,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  atributosExtras: {
                    ...player.atributosExtras,
                    fortificaciones: {
                      ...player.atributosExtras.fortificaciones,
                      red: value,
                    },
                  },
                });
              },
            });
          }}
        />
        {player.isHuman && (
          <MedidorAtributos
            title="Absolver"
            red={undefined}
            black={player.atributosExtras.absolver.black}
            blue={undefined}
            onPressValue={(index: number) => {
              setModalProps({
                title: "Absolver (Fe)",
                value: player.atributosExtras.absolver.black,
                handler: (value: number) => {
                  setPlayer({
                    ...player,
                    atributosExtras: {
                      ...player.atributosExtras,
                      absolver: {
                        ...player.atributosExtras.absolver,
                        black: value,
                      },
                    },
                  });
                },
              });
            }}
          />
        )}
        <MedidorAtributos
          title="Tablero de Acciones"
          red={player.acciones.fortificar + getNumberOfConversions(player)}
          black={player.acciones.absolver + player.acciones.guarnecer}
          blue={player.acciones.comisionar + player.acciones.atacar}
        />
        <View className="bg-gray-400 h-2" />
        <VictoryPointsItem
          title="Medidor de Atributos"
          vp={[
            getAttributeVictoryPoints(getAttributesTotals(player).red),
            getAttributeVictoryPoints(getAttributesTotals(player).black),
            getAttributeVictoryPoints(getAttributesTotals(player).blue),
          ]}
        />
        <VictoryPointsItem
          title="Órdenes del Rey"
          vp={[
            getKingsOrderVictoryPoints(player, kingsOrders.lower, 4),
            getKingsOrderVictoryPoints(player, kingsOrders.medium, 6),
            getKingsOrderVictoryPoints(player, kingsOrders.upper, 8),
          ]}
        />
        <VictoryPointsItem
          title="Deudas"
          values={[player.deudasPagadas, player.deudasPendientes]}
          onPressValue={(index: number) => {
            setModalProps({
              title: index === 0 ? "Deudas Pagadas" : "Deudas Pendientes",
              value: index === 0 ? player.deudasPagadas : player.deudasPendientes,
              handler: (value: number) => {
                if (index === 0) {
                  setPlayer({
                    ...player,
                    deudasPagadas: value,
                  });
                } else {
                  setPlayer({
                    ...player,
                    deudasPendientes: value,
                  });
                }
              },
            });
          }}
          vp={[player.deudasPagadas, -player.deudasPendientes * 3]}
        />
        <VictoryPointsItem
          title="Comisionar"
          values={[player.acciones.comisionar]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Comisionar",
              value: player.acciones.comisionar,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    comisionar: value,
                  },
                });
              },
            });
          }}
          vp={[getActionVictoryPoints(player, "comisionar")]}
        />
        <VictoryPointsItem
          title="Absolver"
          values={[player.acciones.absolver]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Absolver",
              value: player.acciones.absolver,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    absolver: value,
                  },
                });
              },
            });
          }}
          vp={[getActionVictoryPoints(player, "absolver")]}
        />
        <VictoryPointsItem
          title="Fortificar"
          values={[player.acciones.fortificar]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Fortificar",
              value: player.acciones.fortificar,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    fortificar: value,
                  },
                });
              },
            });
          }}
          vp={[getActionVictoryPoints(player, "fortificar")]}
        />
        <VictoryPointsItem
          title="Fortificar (PV Extras)"
          onPressVPDetails={(index: number) => {
            setModalProps({
              title: "Fortificar (PV Extras)",
              value: player.fortificarPV,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  fortificarPV: value,
                });
              },
            });
          }}
          vpDetails={[player.fortificarPV]}
          vp={[player.fortificarPV]}
        />
        <VictoryPointsItem
          title="Atacar"
          values={[player.acciones.atacar]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Atacar",
              value: player.acciones.atacar,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    atacar: value,
                  },
                });
              },
            });
          }}
        />
        <VictoryPointsItem
          title="Guarnecer"
          values={[player.acciones.guarnecer]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Guarnecer",
              value: player.acciones.guarnecer,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    guarnecer: value,
                  },
                });
              },
            });
          }}
          vp={[getActionVictoryPoints(player, "guarnecer")]}
        />
        <VictoryPointsItem
          title="Convertir"
          vp={[getActionVictoryPoints(player, "convertir")]}
          vpDetails={player.acciones.convertir}
          onPressVPDetails={(index: number) => {
            setModalProps({
              title: "Convertir",
              value: player.acciones.convertir[index] != null ? player.acciones.convertir[index] : -1,
              handler: (value: number) => {
                setPlayer({
                  ...player,
                  acciones: {
                    ...player.acciones,
                    convertir: player.acciones.convertir.map((c, i) => {
                      if (i === index) {
                        return value < 0 ? undefined : value;
                      }
                      return c;
                    }),
                  },
                });
              },
            });
          }}
        />
        {player.isHuman && (
          <VictoryPointsItem
            title="Desarrollar"
            values={[player.acciones.desarrollar]}
            onPressValue={(index: number) => {
              setModalProps({
                title: "Desarrollar",
                value: player.acciones.desarrollar,
                handler: (value: number) => {
                  setPlayer({
                    ...player,
                    acciones: {
                      ...player.acciones,
                      desarrollar: value,
                    },
                  });
                },
              });
            }}
            vp={[getActionVictoryPoints(player, "desarrollar")]}
          />
        )}
        {player.isHuman && (
          <VictoryPointsItem
            title="Plata y Provisiones"
            values={[player.plata, player.provisiones]}
            onPressValue={(index: number) => {
              setModalProps({
                title: index === 0 ? "Plata" : "Provisiones",
                value: index === 0 ? player.plata : player.provisiones,
                handler: (value: number) => {
                  if (index === 0) {
                    setPlayer({
                      ...player,
                      plata: value,
                    });
                  } else {
                    setPlayer({
                      ...player,
                      provisiones: value,
                    });
                  }
                },
              });
            }}
            vp={[Math.floor((player.plata + player.provisiones) / 3)]}
          />
        )}
      </ScrollView>
      <View>
        <View className="bg-gray-400 h-2" />
        <MedidorAtributos
          title="Medidor de Atributos"
          red={getAttributesTotals(player).red}
          black={getAttributesTotals(player).black}
          blue={getAttributesTotals(player).blue}
        />
        <VictoryPointsItem title="Puntos de Victoria" vp={[getVictoryPoints(player, kingsOrders)]} />
      </View>
      {modalProps && (
        <ModalSingleValue
          value={modalProps.value}
          title={modalProps.title}
          onSave={(value) => {
            modalProps.handler(value);
            setModalProps(undefined);
          }}
        />
      )}
    </SafeAreaView>
  );
}

type ModalProps = {
  title: string;
  value: number;
  onSave: (value: number) => void;
};

function ModalSingleValue({ title, value: inputValue, onSave }: ModalProps) {
  const [value, setValue] = useState(inputValue);

  const colorScheme = useColorScheme();

  return (
    <View className="absolute inset-0 justify-center items-center bg-black/65">
      <View
        className="p-5 gap-2 border"
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderColor: Colors[colorScheme ?? "light"].text,
        }}
      >
        <Text className="text-xl" style={{ color: Colors[colorScheme ?? "light"].text }}>
          {title}: {value}
        </Text>
        <View className="flex-row gap-2">
          <Button title="Remove" onPress={() => setValue((value) => value - 1)} />
          <Button title="Add" onPress={() => setValue((value) => value + 1)} />
          <Button
            title="Done"
            onPress={() => {
              onSave(value);
            }}
          />
        </View>
      </View>
    </View>
  );
}
