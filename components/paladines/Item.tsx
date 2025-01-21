import { View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type Props = {
  children: React.ReactNode;
};

export default function Item({ children }: Props) {
  const colorScheme = useColorScheme();
  return (
    <View
      className="flex-row justify-between items-center py-1 px-2 border"
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
        borderColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      {children}
    </View>
  );
}
