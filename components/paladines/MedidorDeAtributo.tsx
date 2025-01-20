import { Pressable, Text, View } from "react-native";

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
        style={{
          fontSize: 20,
          color: Colors[colorScheme ?? "light"].text,
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
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
      style={{
        backgroundColor: value != null ? color : "transparent",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: value != null ? 1 : 0,
        borderColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      {value != null && (
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );

  if (onPressValue != null) {
    return <Pressable onPress={onPressValue}>{content}</Pressable>;
  }

  return content;
}
