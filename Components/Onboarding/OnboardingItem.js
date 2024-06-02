import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View>
        <Text style={styles.description}>{item.item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: 1090,
  },
  image: {
    // flex: 0.2,
    justifyContent: "center",
  },
  description: {
    // fontFamily: "Cairo",
    fontWeight: "500",
    color: "#727272",
    textAlign: "center",
    paddingHorizontal: 84,
    paddingTop: 50,
  },
});
