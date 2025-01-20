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
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      {children}
    </View>
  );
}
