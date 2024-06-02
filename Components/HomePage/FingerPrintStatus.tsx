import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
const width = Dimensions.get("window").width;
export default function FingerPrintStatus() {
  return (
    <View style={styles.statusContainer}>
      <Text style={{ color: "#0083DB", fontWeight: "700" }}>
        Location Status
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, color: "#005B98", fontWeight: "300" }}>
          Away From Company
        </Text>
        <Image
          style={{ width: 35, height: 40 }}
          source={require("../../assets/fingerPrint.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    width: width * 0.92,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 10,
  },
});
