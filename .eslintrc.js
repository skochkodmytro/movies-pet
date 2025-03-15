// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "react-hooks/exhaustive-deps": "off", // Disable the exhaustive-deps rule
  },
};
