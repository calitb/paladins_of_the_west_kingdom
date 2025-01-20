import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { Game } from "@/lib/type";
import {
  getActionPV,
  getAttributePV,
  getMedidorAtributos,
  getNumeroConversiones,
  getOrdenDelReyPV,
  getVictoryPoints,
} from "@/lib/utils";

import MedidorAtributos from "./MedidorDeAtributo";
import VictoryPointsItem from "./VictoryPointsItem";

type Props = {
  player: Game["players"][number];
  ordenesDelRey: Game["ordenesDelRey"];
};

export default function PlayerScreen(props: Props) {
  const [player, setPlayer] = useState(props.player);
  const { ordenesDelRey } = props;

  const [modalProps, setModalProps] = useState<{
    handler: (value: number) => void;
    value: number;
    title: string;
  }>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "gray", gap: 10 }}>
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
                    setPlayer((prev) => ({
                      ...prev,
                      marcadorDeRecursos: {
                        ...prev.marcadorDeRecursos,
                        red: value,
                      },
                    }));
                  } else if (index === 1) {
                    setPlayer((prev) => ({
                      ...prev,
                      marcadorDeRecursos: {
                        ...prev.marcadorDeRecursos,
                        black: value,
                      },
                    }));
                  } else {
                    setPlayer((prev) => ({
                      ...prev,
                      marcadorDeRecursos: {
                        ...prev.marcadorDeRecursos,
                        blue: value,
                      },
                    }));
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
                    setPlayer((prev) => ({
                      ...prev,
                      atributosExtras: {
                        ...prev.atributosExtras,
                        aldeanos: {
                          ...prev.atributosExtras.aldeanos,
                          red: value,
                        },
                      },
                    }));
                  } else if (index === 1) {
                    setPlayer((prev) => ({
                      ...prev,
                      atributosExtras: {
                        ...prev.atributosExtras,
                        aldeanos: {
                          ...prev.atributosExtras.aldeanos,
                          black: value,
                        },
                      },
                    }));
                  } else {
                    setPlayer((prev) => ({
                      ...prev,
                      atributosExtras: {
                        ...prev.atributosExtras,
                        aldeanos: {
                          ...prev.atributosExtras.aldeanos,
                          blue: value,
                        },
                      },
                    }));
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
                  setPlayer((prev) => ({
                    ...prev,
                    atributosExtras: {
                      ...prev.atributosExtras,
                      forasteros: {
                        ...prev.atributosExtras.forasteros,
                        red: value,
                      },
                    },
                  }));
                } else {
                  setPlayer((prev) => ({
                    ...prev,
                    atributosExtras: {
                      ...prev.atributosExtras,
                      forasteros: {
                        ...prev.atributosExtras.forasteros,
                        blue: value,
                      },
                    },
                  }));
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
                setPlayer((prev) => ({
                  ...prev,
                  atributosExtras: {
                    ...prev.atributosExtras,
                    fortificaciones: {
                      ...prev.atributosExtras.fortificaciones,
                      red: value,
                    },
                  },
                }));
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
                  setPlayer((prev) => ({
                    ...prev,
                    atributosExtras: {
                      ...prev.atributosExtras,
                      absolver: {
                        ...prev.atributosExtras.absolver,
                        black: value,
                      },
                    },
                  }));
                },
              });
            }}
          />
        )}
        <MedidorAtributos
          title="Tablero de Acciones"
          red={player.acciones.fortificar + getNumeroConversiones(player)}
          black={player.acciones.absolver + player.acciones.guarnecer}
          blue={player.acciones.comisionar + player.acciones.atacar}
        />
        <View style={{ backgroundColor: "gray", height: 10 }} />

        <VictoryPointsItem
          title="Medidor de Atributos"
          vp={[
            getAttributePV(getMedidorAtributos(player).red),
            getAttributePV(getMedidorAtributos(player).black),
            getAttributePV(getMedidorAtributos(player).blue),
          ]}
        />
        <VictoryPointsItem
          title="Órdenes del Rey"
          vp={[
            getOrdenDelReyPV(player, ordenesDelRey.lower, 4),
            getOrdenDelReyPV(player, ordenesDelRey.medium, 6),
            getOrdenDelReyPV(player, ordenesDelRey.upper, 8),
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
                  setPlayer((prev) => ({
                    ...prev,
                    deudasPagadas: value,
                  }));
                } else {
                  setPlayer((prev) => ({
                    ...prev,
                    deudasPendientes: value,
                  }));
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
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    comisionar: value,
                  },
                }));
              },
            });
          }}
          vp={[getActionPV(player, "comisionar")]}
        />
        <VictoryPointsItem
          title="Absolver"
          values={[player.acciones.absolver]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Absolver",
              value: player.acciones.absolver,
              handler: (value: number) => {
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    absolver: value,
                  },
                }));
              },
            });
          }}
          vp={[getActionPV(player, "absolver")]}
        />
        <VictoryPointsItem
          title="Fortificar"
          values={[player.acciones.fortificar]}
          onPressValue={(index: number) => {
            setModalProps({
              title: "Fortificar",
              value: player.acciones.fortificar,
              handler: (value: number) => {
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    fortificar: value,
                  },
                }));
              },
            });
          }}
          vp={[getActionPV(player, "fortificar")]}
        />
        <VictoryPointsItem
          title="Fortificar (PV Extras)"
          onPressVPDetails={(index: number) => {
            setModalProps({
              title: "Fortificar (PV Extras)",
              value: player.fortificarPV,
              handler: (value: number) => {
                setPlayer((prev) => ({
                  ...prev,
                  fortificarPV: value,
                }));
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
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    atacar: value,
                  },
                }));
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
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    guarnecer: value,
                  },
                }));
              },
            });
          }}
          vp={[getActionPV(player, "guarnecer")]}
        />
        <VictoryPointsItem
          title="Convertir"
          vp={[getActionPV(player, "convertir")]}
          vpDetails={player.acciones.convertir}
          onPressVPDetails={(index: number) => {
            setModalProps({
              title: "Convertir",
              value: player.acciones.convertir[index] != null ? player.acciones.convertir[index] : -1,
              handler: (value: number) => {
                setPlayer((prev) => ({
                  ...prev,
                  acciones: {
                    ...prev.acciones,
                    convertir: prev.acciones.convertir.map((c, i) => {
                      if (i === index) {
                        return value < 0 ? undefined : value;
                      }
                      return c;
                    }),
                  },
                }));
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
                  setPlayer((prev) => ({
                    ...prev,
                    acciones: {
                      ...prev.acciones,
                      desarrollar: value,
                    },
                  }));
                },
              });
            }}
            vp={[getActionPV(player, "desarrollar")]}
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
                    setPlayer((prev) => ({
                      ...prev,
                      plata: value,
                    }));
                  } else {
                    setPlayer((prev) => ({
                      ...prev,
                      provisiones: value,
                    }));
                  }
                },
              });
            }}
            vp={[Math.floor((player.plata + player.provisiones) / 3)]}
          />
        )}
      </ScrollView>
      <View>
        <View style={{ backgroundColor: "gray", height: 10 }} />
        <MedidorAtributos
          title="Medidor de Atributos"
          red={getMedidorAtributos(player).red}
          black={getMedidorAtributos(player).black}
          blue={getMedidorAtributos(player).blue}
        />
        <VictoryPointsItem title="Puntos de Victoria" vp={[getVictoryPoints(player, ordenesDelRey)]} />
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
    <View
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          padding: 20,
          gap: 10,
          borderWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].text,
        }}
      >
        <Text style={{ fontSize: 20, color: Colors[colorScheme ?? "light"].text }}>
          {title}: {value}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
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
