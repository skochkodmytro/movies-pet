import {
  Image,
  ImageSourcePropType,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { useBoolean } from "@/hooks";

type AsyncImageProps = {
  source: ImageSourcePropType | null;
  placeholder?: ImageSourcePropType;
  style?: ViewStyle;
};

const AsyncImage = ({ source, placeholder, style }: AsyncImageProps) => {
  const { value: loading, setFalse: finishLoading } = useBoolean(true);

  return (
    <View style={[styles.container, style]}>
      {loading && <ActivityIndicator style={styles.loader} />}
      <Image
        source={
          source || placeholder || require("@/assets/images/placeholder.jpg")
        }
        style={[styles.image, loading && { opacity: 0 }]}
        onLoad={finishLoading}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loader: {
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AsyncImage;
