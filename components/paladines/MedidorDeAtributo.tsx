import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Item from "./Item";

type Props = {
  title: string;
  red: number | undefined;
  black: number | undefined;
  blue: number | undefined;
  onPressValue?: (index: number) => void;
};

export default function MedidorAtributos({ title, red, black, blue, onPressValue }: Props) {
  const colorScheme = useColorScheme();
  return (
    <Item>
      <Text
        className="text-xl"
        style={{
          color: Colors[colorScheme ?? "light"].text,
        }}
      >
        {title}
      </Text>
      <View className="flex-row gap-1">
        <ValueBox value={red} color="red" onPressValue={onPressValue ? () => onPressValue(0) : undefined} />
        <ValueBox value={black} color="black" onPressValue={onPressValue ? () => onPressValue(1) : undefined} />
        <ValueBox value={blue} color="blue" onPressValue={onPressValue ? () => onPressValue(2) : undefined} />
      </View>
    </Item>
  );
}

type MedidorDeAtributoProps = {
  value: number | undefined;
  color: "red" | "blue" | "black" | "gray";
  onPressValue: (() => void) | undefined;
};

export function ValueBox({ value, color, onPressValue }: MedidorDeAtributoProps) {
  const colorScheme = useColorScheme();

  const content = (
    <View
      className={twMerge("w-10 h-10 justify-center items-center", value != null ? "border" : "")}
      style={{
        backgroundColor: value != null ? color : "transparent",
        borderColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      {value != null && <Text className="text-white font-bold text-base">{value}</Text>}
    </View>
  );

  if (onPressValue != null) {
    return <Pressable onPress={onPressValue}>{content}</Pressable>;
  }

  return content;
}
