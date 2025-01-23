import { Image } from "expo-image";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

import { getVictoryPoints } from "@/lib/utils";
import { kingsOrdersAtom, playersAtom } from "@/state/atoms/game";
import Counter from "./Counter";
import {
  AbsolveElement,
  AttackElement,
  AttributesTrackerElement,
  CommissionElement,
  ConvertElement,
  CurrencyElement,
  DebtElement,
  DevelopElement,
  EditionConfig,
  FortifyElement,
  GarrisonElement,
  KingsOrderElement,
  ResourcesMarkerElement,
  TownsfolkElement,
} from "./Element";
import VictoryPointsItem from "./VictoryPointsItem";

type Props = {
  playerIndex: number;
};

export default function PlayerScreen({ playerIndex }: Props) {
  const players = useAtomValue(playersAtom);
  const kingsOrders = useAtomValue(kingsOrdersAtom);

  const player = players[playerIndex];

  const [modalProps, setModalProps] = useState<EditionConfig>();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-400 px-10 py-5 gap-10">
        <View className="gap-10">
          <View className="flex-row justify-between">
            {player.isHuman ? (
              <CurrencyElement player={player} onEditPressed={setModalProps} />
            ) : (
              <ResourcesMarkerElement player={player} onEditPressed={setModalProps} />
            )}
            <DebtElement player={player} onEditPressed={setModalProps} />
          </View>
          <View className="flex-row justify-between">
            {player.isHuman && <DevelopElement player={player} onEditPressed={setModalProps} />}
            <TownsfolkElement player={player} onEditPressed={setModalProps} />
          </View>
          <View className="flex-row justify-between">
            <CommissionElement player={player} onEditPressed={setModalProps} />
            <FortifyElement player={player} onEditPressed={setModalProps} />
            <GarrisonElement player={player} onEditPressed={setModalProps} />
          </View>
          <View className="flex-row justify-between">
            <AbsolveElement player={player} onEditPressed={setModalProps} />
            <AttackElement player={player} onEditPressed={setModalProps} />
            <ConvertElement player={player} onEditPressed={setModalProps} />
          </View>
          <View className="flex-row justify-between">
            <AttributesTrackerElement player={player} />
            <KingsOrderElement player={player} />
          </View>
        </View>
      </ScrollView>
      <View>
        <VictoryPointsItem title="Victory Points" vp={[getVictoryPoints(player, kingsOrders)]} />
      </View>
      {modalProps != null && (
        <ModalContainer
          {...modalProps}
          onDone={() => {
            setModalProps(undefined);
          }}
          children={modalProps.children}
        />
      )}
    </SafeAreaView>
  );
}

type ModalProps = {
  onDone: () => void;
} & EditionConfig;

function ModalContainer({
  title,
  image,
  values,
  maxValues,
  onChangeValues,
  onDone,
  children,
  inputBackgroundColors,
  icons,
}: ModalProps) {
  return (
    <View className="absolute inset-0 justify-center items-center bg-black/65 z-10">
      <View
        className="p-5 gap-6 border"
        style={{
          backgroundColor: "#005936",
          borderColor: "white",
        }}
      >
        <View className="flex-row gap-4 items-center">
          {Array.isArray(image) ? (
            <View className="flex-row gap-2">
              {image.map((img, index) => (
                <Image key={index} source={img} style={{ width: 35, height: 40 }} />
              ))}
            </View>
          ) : (
            <Image source={image} style={{ width: 35, height: 40 }} />
          )}
          <Text className="text-xl text-white">{title}</Text>
        </View>
        {onChangeValues.map((onChangeValue, index) => (
          <Counter
            key={index}
            value={values[index]}
            maxValue={maxValues[index]}
            onChangeValue={onChangeValue}
            inputBackgroundColor={inputBackgroundColors && inputBackgroundColors[index]}
            icon={icons && icons[index]}
          />
        ))}
        {children}
        <Button color="white" title="Done" onPress={onDone} />
      </View>
    </View>
  );
}
