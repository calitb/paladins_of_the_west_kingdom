import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";

type PressableProps = React.ComponentProps<typeof Pressable>;
type Props = Omit<PressableProps, "children"> & { children: React.ReactNode };

export function HapticButton(props: Props) {
  const { children, onPressIn, onPress } = props;

  return (
    <PlatformPressable
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(ev);
      }}
      onPress={onPress}
    >
      {children}
    </PlatformPressable>
  );
}
