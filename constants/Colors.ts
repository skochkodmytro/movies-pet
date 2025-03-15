/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primary = "#63A1F2";
const secondary = "#F2A163";
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const white = "#ffffff";
const black = "#000000";

const blue07 = "#0B1426";

const gray05 = "#888";
const gray03 = "#ccc";
const gray07 = "gray";

export const Colors = {
  light: {
    primary,
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary,
    secondary,
    white,
    black,
    text: "#ECEDEE",
    secondaryText: gray07,
    placeholderText: gray05,
    disabledText: gray03,
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    cardBackground: blue07,
  },
};
