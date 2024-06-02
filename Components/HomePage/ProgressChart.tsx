import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function ProgressChart() {
  const { width } = useWindowDimensions();
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={{
        width: width,
        // paddingHorizontal: 10,
        marginVertical: 18,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderRadius: 10,
          width: width * 0.92,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          alignItems: "center",
          backgroundColor: "#0083db",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "400",
            // marginBottom: 10,
            fontSize: 18,
            // paddingHorizontal: 10,
            // paddingBottom: 7,
          }}
        >
          Quarter Evaluation
        </Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color={"#0083db"}
          style={{ backgroundColor: "white", padding: 5, borderRadius: 100 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
