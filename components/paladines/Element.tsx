import { Image, ImageSource } from "expo-image";
import { useAtomValue } from "jotai";
import React from "react";
import { Text, View } from "react-native";

import type { Attributes, Game, KingsOrderActions } from "@/lib/type";
import {
  getActionVictoryPoints,
  getAttributesTotals,
  getAttributeVictoryPoints,
  getKingsOrderVictoryPoints,
} from "@/lib/utils";
import { kingsOrdersAtom } from "@/state/atoms/game";

import { HapticButton } from "../HapticButton";
import Counter from "./Counter";
import { VictoryPoint } from "./VictoryPointsItem";

export type EditionConfig = {
  title: string;
  image: ImageSource | ImageSource[];
  values: number[];
  maxValues: number[];
  onChangeValues: ((player: Game["players"][number], value: number) => Game["players"][number])[];
  inputBackgroundColors?: (Attributes | "yellow" | undefined)[];
  icons?: React.ReactNode[];
  children?: React.ReactNode;
};

type Props = {
  player: Game["players"][number];
  onEditPressed: (props: EditionConfig) => void;
};

export function CurrencyElement({ player: currentPlayer, onEditPressed }: Props) {
  const elements = [
    { image: require("@/images/silver.png"), title: "Silver", value: currentPlayer.silver, key: "silver" },
    {
      image: require("@/images/provision.png"),
      title: "Provisions",
      value: currentPlayer.provisions,
      key: "provisions",
    },
  ];

  return (
    <DoubleElement
      values={[currentPlayer.silver, currentPlayer.provisions]}
      victoryPoints={Math.floor((currentPlayer.silver + currentPlayer.provisions) / 3)}
      images={[elements[0].image, elements[1].image]}
      onPress={elements.map((element, i) => () => {
        onEditPressed({
          title: element.title,
          image: element.image,
          values: [element.value],
          maxValues: [100],
          onChangeValues: [
            (player, value) => ({
              ...player,
              [element.key]: value,
            }),
          ],
        });
      })}
    />
  );
}

export function DebtElement({ player: currentPlayer, onEditPressed }: Props) {
  const elements = [
    { image: require("@/images/debt.png"), title: "Debt", value: currentPlayer.pendingDebts, key: "pendingDebts" },
    { image: require("@/images/debt_paid.png"), title: "Paid Debts", value: currentPlayer.paidDebts, key: "paidDebts" },
  ];

  return (
    <DoubleElement
      values={[currentPlayer.pendingDebts, currentPlayer.paidDebts]}
      victoryPoints={-3 * currentPlayer.pendingDebts + currentPlayer.paidDebts}
      images={[elements[0].image, elements[1].image]}
      onPress={elements.map((element, i) => () => {
        onEditPressed({
          title: element.title,
          image: element.image,
          values: [element.value],
          maxValues: [100],
          onChangeValues: [
            (player, value) => ({
              ...player,
              [element.key]: value,
            }),
          ],
        });
      })}
    />
  );
}

export function DevelopElement({ player: currentPlayer, onEditPressed }: Props) {
  return (
    <Element
      value={currentPlayer.actions.develop}
      victoryPoints={getActionVictoryPoints(currentPlayer, "develop")}
      image={require("@/images/develop.png")}
      onPress={() => {
        onEditPressed({
          title: "Develop",
          image: require("@/images/develop.png"),
          values: [currentPlayer.actions.develop],
          maxValues: [8],
          onChangeValues: [
            (player, value) => ({
              ...player,
              actions: {
                ...player.actions,
                develop: value,
              },
            }),
          ],
        });
      }}
    />
  );
}

export function ResourcesMarkerElement({ player: currentPlayer, onEditPressed }: Props) {
  const attributes: Attributes[] = ["red", "black", "blue"];

  return (
    <HapticButton
      onPress={() => {
        onEditPressed({
          title: "Resources Marker",
          image: require("@/images/resources-marker.png"),
          values: attributes.map((attribute) => currentPlayer.resourcesMarker[attribute]),
          maxValues: [100],
          inputBackgroundColors: attributes,
          onChangeValues: attributes.map((attribute) => (player, value) => ({
            ...player,
            resourcesMarker: {
              ...player.resourcesMarker,
              [attribute]: value,
            },
          })),
        });
      }}
    >
      <View className="bg-black rounded-md p-2">
        <View className="justify-center items-center bg-white">
          <Image source={require("@/images/resources-marker.png")} style={{ width: 35, height: 40 }} />
        </View>
      </View>
    </HapticButton>
  );
}

export function TownsfolkElement({ player: currentPlayer, onEditPressed }: Props) {
  const attributes: Attributes[] = ["red", "black", "blue"];

  return (
    <HapticButton
      onPress={() => {
        onEditPressed({
          title: "Townsfolk",
          image: [require("@/images/recruit.png"), require("@/images/recruit-2.png")],
          values: attributes.map((attribute) => currentPlayer.extraAttributes.townsfolks[attribute]),
          maxValues: [100],
          inputBackgroundColors: attributes,
          onChangeValues: attributes.map((attribute) => (player, value) => ({
            ...player,
            extraAttributes: {
              ...player.extraAttributes,
              townsfolks: {
                ...player.extraAttributes.townsfolks,
                [attribute]: value,
              },
            },
          })),
        });
      }}
    >
      <View className="bg-black rounded-md p-2">
        <View className="flex-row gap-2">
          <View className="justify-center items-center bg-white">
            <Image source={require("@/images/recruit.png")} style={{ width: 35, height: 40 }} />
          </View>
          <View className="justify-center items-center bg-white">
            <Image source={require("@/images/recruit-2.png")} style={{ width: 35, height: 40 }} />
          </View>
        </View>
      </View>
    </HapticButton>
  );
}

export function CommissionElement({ player: currentPlayer, onEditPressed }: Props) {
  return (
    <Element
      value={currentPlayer.actions.commission}
      victoryPoints={getActionVictoryPoints(currentPlayer, "commission")}
      image={ActionIcons["commission"]}
      onPress={() => {
        onEditPressed({
          title: "Commission",
          image: ActionIcons["commission"],
          values: [currentPlayer.actions.commission],
          maxValues: [7],
          onChangeValues: [
            (player, value) => ({
              ...player,
              actions: {
                ...player.actions,
                commission: value,
              },
            }),
          ],
        });
      }}
    />
  );
}

export function FortifyElement({ player: currentPlayer, onEditPressed }: Props) {
  const items = [
    {
      value: currentPlayer.actions.fortify,
      maxValue: 7,
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        actions: {
          ...player.actions,
          fortify: value,
        },
      }),
    },
    {
      value: currentPlayer.extraAttributes.fortify.red,
      maxValue: 100,
      icon: (
        <View className="flex-row">
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="red" value={undefined} />
          </View>
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="red" value={undefined} />
          </View>
        </View>
      ),
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        extraAttributes: {
          ...player.extraAttributes,
          fortify: {
            red: value,
          },
        },
      }),
    },
    {
      value: currentPlayer.fortifyPV,
      maxValue: 100,
      inputBackgroundColor: "yellow" as "yellow",
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        fortifyPV: value,
      }),
    },
  ];

  return (
    <Element
      value={currentPlayer.actions.fortify}
      victoryPoints={getActionVictoryPoints(currentPlayer, "fortify") + currentPlayer.fortifyPV}
      image={ActionIcons["fortify"]}
      onPress={() => {
        onEditPressed({
          title: "Fortify",
          image: ActionIcons["fortify"],
          values: items.map((item) => item.value),
          maxValues: items.map((item) => item.maxValue),
          inputBackgroundColors: items.map((item) => item.inputBackgroundColor),
          onChangeValues: items.map((item) => (player, value) => item.getUpdatedPlayer(player, value)),
          icons: items.map((item) => item.icon),
        });
      }}
    />
  );
}

export function GarrisonElement({ player: currentPlayer, onEditPressed }: Props) {
  return (
    <Element
      value={currentPlayer.actions.garrison}
      victoryPoints={getActionVictoryPoints(currentPlayer, "garrison")}
      image={ActionIcons["garrison"]}
      onPress={() => {
        onEditPressed({
          title: "Garrison",
          image: ActionIcons["garrison"],
          values: [currentPlayer.actions.garrison],
          maxValues: [7],
          onChangeValues: [
            (player, value) => ({
              ...player,
              actions: {
                ...player.actions,
                garrison: value,
              },
            }),
          ],
        });
      }}
    />
  );
}

export function AbsolveElement({ player: currentPlayer, onEditPressed }: Props) {
  const items = [
    {
      value: currentPlayer.actions.absolve,
      maxValue: 7,
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        actions: {
          ...player.actions,
          absolve: value,
        },
      }),
    },
    {
      value: currentPlayer.extraAttributes.absolve.black,
      maxValue: 1,
      inputBackgroundColor: "black" as Attributes,
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        extraAttributes: {
          ...player.extraAttributes,
          absolve: {
            black: value,
          },
        },
      }),
    },
  ];

  return (
    <Element
      value={currentPlayer.actions.absolve}
      victoryPoints={getActionVictoryPoints(currentPlayer, "absolve")}
      image={ActionIcons["absolve"]}
      onPress={() => {
        onEditPressed({
          title: "Absolve",
          image: ActionIcons["absolve"],
          values: items.map((item) => item.value),
          maxValues: items.map((item) => item.maxValue),
          inputBackgroundColors: items.map((item) => item.inputBackgroundColor),
          onChangeValues: items.map((item) => (player, value) => item.getUpdatedPlayer(player, value)),
        });
      }}
    />
  );
}

export function AttackElement({ player: currentPlayer, onEditPressed }: Props) {
  const items = [
    {
      value: currentPlayer.actions.attack,
      maxValue: 100,
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        actions: {
          ...player.actions,
          attack: value,
        },
      }),
    },
    {
      value: currentPlayer.extraAttributes.outsiders.blue,
      maxValue: 100,
      icon: (
        <View className="flex-row">
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="blue" value={undefined} />
          </View>
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="blue" value={undefined} />
          </View>
        </View>
      ),
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        extraAttributes: {
          ...player.extraAttributes,
          outsiders: {
            ...player.extraAttributes.outsiders,
            blue: value,
          },
        },
      }),
    },
  ];

  return (
    <Element
      value={currentPlayer.actions.attack}
      victoryPoints={undefined}
      image={ActionIcons["attack"]}
      onPress={() => {
        onEditPressed({
          title: "Attack",
          image: ActionIcons["attack"],
          values: items.map((item) => item.value),
          maxValues: items.map((item) => item.maxValue),
          onChangeValues: items.map((item) => (player, value) => item.getUpdatedPlayer(player, value)),
          icons: items.map((item) => item.icon),
        });
      }}
    />
  );
}

export function ConvertElement({ player: currentPlayer, onEditPressed }: Props) {
  const items = [
    {
      value: currentPlayer.extraAttributes.outsiders.red,
      maxValue: 100,
      icon: (
        <View className="flex-row">
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="red" value={undefined} />
          </View>
          <View className="justify-center items-center bg-white p-1">
            <VictoryPoint size="small" color="red" value={undefined} />
          </View>
        </View>
      ),
      getUpdatedPlayer: (player: Game["players"][number], value: number) => ({
        ...player,
        extraAttributes: {
          ...player.extraAttributes,
          outsiders: {
            ...player.extraAttributes.outsiders,
            red: value,
          },
        },
      }),
    },
  ];

  return (
    <Element
      value={currentPlayer.actions.convert.filter((v) => v != null).length}
      victoryPoints={getActionVictoryPoints(currentPlayer, "convert")}
      image={ActionIcons["convert"]}
      onPress={() => {
        onEditPressed({
          title: "Convert",
          image: ActionIcons["convert"],
          values: items.map((item) => item.value),
          maxValues: items.map((item) => item.maxValue),
          onChangeValues: items.map((item) => (player, value) => item.getUpdatedPlayer(player, value)),
          icons: items.map((item) => item.icon),
          children: (
            <View className="flex-row gap-2 mt-6">
              {currentPlayer.actions.convert.map((v, i) => (
                <Counter
                  key={i}
                  playerId={currentPlayer.id}
                  orientation="vertical"
                  value={v}
                  minValue={-1}
                  maxValue={100}
                  inputBackgroundColor="yellow"
                  onChangeValue={(player, value) => {
                    const convert = [...player.actions.convert];
                    convert[i] = value === -1 ? undefined : value;
                    return {
                      ...player,
                      actions: {
                        ...player.actions,
                        convert,
                      },
                    };
                  }}
                />
              ))}
            </View>
          ),
        });
      }}
    />
  );
}

type ElementProps = {
  value: number;
  victoryPoints: number | undefined;
  image: ImageSource;
  onPress: () => void;
};

function Element({ value, victoryPoints, image, onPress }: ElementProps) {
  return (
    <HapticButton onPress={onPress}>
      <View className="bg-black p-2 rounded-md">
        <View className="flex-row">
          <View
            className="justify-center items-center bg-white"
            style={{
              width: 35,
              height: 40,
            }}
          >
            <Text className="font-bold text-xl">{value}</Text>
          </View>
          <Image source={image} style={{ width: 35, height: 40 }} />
        </View>
        <View className="items-center">{victoryPoints != null && <VictoryPoint value={victoryPoints} />}</View>
      </View>
    </HapticButton>
  );
}

type DoubleElementProps = {
  values: number[];
  victoryPoints: number;
  images: ImageSource[];
  onPress: (() => void)[];
};

function DoubleElement({ values, victoryPoints, images, onPress }: DoubleElementProps) {
  return (
    <View className="bg-black rounded-md">
      <View className="flex-row">
        <Element value={values[0]} victoryPoints={undefined} image={images[0]} onPress={onPress[0]} />
        <Element value={values[1]} victoryPoints={undefined} image={images[1]} onPress={onPress[1]} />
      </View>
      <View className="items-center">{victoryPoints != null && <VictoryPoint value={victoryPoints} />}</View>
    </View>
  );
}

type GenericProps = {
  player: Game["players"][number];
};

export function KingsOrderElement({ player }: GenericProps) {
  const kingsOrders = useAtomValue(kingsOrdersAtom);

  const elements = [
    { image: kingsOrders.lower ? ActionIcons[kingsOrders.lower] : undefined, value: kingsOrders.lower, vp: 4 },
    { image: kingsOrders.medium ? ActionIcons[kingsOrders.medium] : undefined, value: kingsOrders.medium, vp: 6 },
    { image: kingsOrders.upper ? ActionIcons[kingsOrders.upper] : undefined, value: kingsOrders.upper, vp: 8 },
  ];

  return (
    <View className="bg-black rounded-md p-2">
      <View className="flex-row gap-2">
        {elements.map((element, i) => (
          <View
            key={i}
            className="justify-center items-center bg-white"
            style={{
              width: 35,
              height: 40,
            }}
          >
            {element.image && <Image source={element.image} style={{ width: 35, height: 40 }} />}
          </View>
        ))}
      </View>
      <View className="items-center">
        {
          <VictoryPoint
            value={elements.reduce(
              (acc, element) => acc + getKingsOrderVictoryPoints(player, element.value, element.vp),
              0,
            )}
          />
        }
      </View>
    </View>
  );
}

export const ActionIcons: Record<KingsOrderActions, ImageSource> = {
  commission: require("@/images/commission.png"),
  fortify: require("@/images/fortify.png"),
  garrison: require("@/images/garrison.png"),
  absolve: require("@/images/absolve.png"),
  attack: require("@/images/attack.png"),
  convert: require("@/images/convert.png"),
};

export function AttributesTrackerElement({ player }: GenericProps) {
  const attributes = getAttributesTotals(player);

  return (
    <View className="bg-black rounded-md p-2">
      <View className="flex-row gap-2">
        {["red", "black", "blue"].map((attribute, i) => (
          <View key={attribute} className="justify-center items-center bg-white">
            <VictoryPoint color={attribute as Attributes} value={attributes[attribute as Attributes]} />
          </View>
        ))}
      </View>
      <View className="items-center">
        {
          <VictoryPoint
            value={["red", "black", "blue"].reduce(
              (acc, attribute) => acc + getAttributeVictoryPoints(attributes[attribute as Attributes]),
              0,
            )}
          />
        }
      </View>
    </View>
  );
}
