import "./global.css";

import { registerRootComponent } from "expo";
import { Image } from "expo-image";
import { ExpoRoot } from "expo-router";
import { cssInterop } from "nativewind";

cssInterop(Image, { className: "style" });

export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
