import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Animated } from "react-native";

// ../../assets/blueLogo.png
export default function SplashScreen({
  logoFadeDuration = 700, // Duration of logo fade-out animation (ms)
  backgroundTransitionDuration = 1500, // Duration of background color transition (ms)
  initialBackgroundColor = "#0083DB", // Initial background color (default: blue)
  finalBackgroundColor = "#fff", // Final background color (default: white)
}) {
  const { width } = useWindowDimensions();
  const fadeOutAnimation: any = useRef(new Animated.Value(1)).current;
  const backgroundOpacity: any = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fadeOutHandler();
  }, []);

  const fadeOutHandler = () => {
    Animated.timing(fadeOutAnimation, {
      toValue: 0,
      duration: logoFadeDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: backgroundTransitionDuration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: 390,
          flex: 0.5,
          width,
          justifyContent: "center",
          alignItems: "center",
          opacity: backgroundOpacity,
        }}
      >
        <Image
          source={require("../../assets/blueLogo.png")}
          style={styles.blueLogo}
        />
      </Animated.View>

      <Animated.View
        style={{
          ...styles.container,
          opacity: fadeOutAnimation,
          backgroundColor: backgroundOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [initialBackgroundColor, finalBackgroundColor],
          }),
        }}
      >
        <Image
          source={require("../../assets/whiteLogo.png")}
          style={styles.Image}
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223341",
    padding: 60,
    width: "100%",
    position: "relative",

    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    justifyContent: "center",
    alignItems: "center",

    width: 200,
    height: 200,
  },
  Image: {
    width: 120,
    overflow: "visible",
    // aspectRatio: "1",
  },

  button: {
    backgroundColor: "black",

    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 64,

    color: "white",
    textTransform: "capitalize",
  },

  childContainer_1: {
    width: 200,
    height: 200,
    backgroundColor: "white",
  },

  childContainer_2: {
    width: 200,
    height: 200,
    backgroundColor: "lightblue",
  },
  blueLogo: {
    width: 200,
    height: 100,
    overflow: "visible",
  },
});
