import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const width = Dimensions.get("window");
export default function HeaderComponent({ userData, navigation }: any) {
  const navigator: any = useNavigation();
  const { width } = useWindowDimensions();

  useEffect(() => {}, []);

  return (
    <ImageBackground
      style={styles.headerImage}
      source={require("../../assets/HomePageHeader.png")}
    >
      <View style={{ ...styles.headerOptions, width }}>
        <View style={styles.searchContainer}>
          <Pressable
            onPress={() => {
              navigator.navigate("Profile", { screen: "ProfileMain" });
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={21}
              color={"#0038bd"}
            />
          </Pressable>
        </View>
        <View style={styles.options}>
          <TouchableOpacity activeOpacity={0.8} style={styles.option}>
            <View style={[styles.notificationCount]}>
              <Text
                style={{
                  backgroundColor: "red",
                  color: "white",

                  borderRadius: 200,
                  fontSize: 10,
                  textAlign: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  // textAlign: "center",
                }}
              >
                0
              </Text>
            </View>
            <MaterialCommunityIcons name={"bell"} color={"#0083db"} size={21} />
          </TouchableOpacity>
          <Pressable
            style={styles.option}
            onPress={() => {
              navigator.openDrawer();
            }}
          >
            <MaterialCommunityIcons name={"menu"} color={"#0083db"} size={21} />
          </Pressable>
          <Pressable></Pressable>
        </View>
      </View>
      <View style={styles.headerText}>
        <View
          style={{
            shadowColor: "black",
            shadowOpacity: 1,
            shadowOffset: { height: 2, width: 2 },
            elevation: 5,
            shadowRadius: 0,
            borderRadius: 200,
            height: 75,
            width: 75,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Image
            style={{
              ...styles.personImage,
            }}
            source={
              userData.image
                ? { uri: userData.image }
                : require("../../assets/Unknown_person.jpg")
            }
          />
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text style={[styles.nameText, { textTransform: "capitalize" }]}>
            {(userData.fullName as string)?.length
              ? userData.fullName
                  .split(" ")
                  .map((name: string, idx: number) => (idx < 2 ? name : ""))
                  .join(" ")
              : ""}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16, opacity: 0.4 }}>
            Code {userData.employeeCode}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  headerText: {
    width: width as any,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  headerContent: {
    // flex: 0.25,

    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    // height: 120,
  },
  headerImage: {
    flex: 1,
    paddingTop: 38,
    // height: 300,
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  headerOptions: {
    flex: 0.75,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 15,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 0.6,
    shadowOffset: { height: 2, width: 2 },
    elevation: 5,

    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  personImage: {
    // flex: 0.9,
    height: 75,
    width: 75,
    borderRadius: 300,
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    gap: 7,
  },
  option: {
    borderRadius: 100,
    backgroundColor: "white",
    padding: 8,
    position: "relative",

    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0083DB",
    paddingHorizontal: 20,
  },
  nameText: {
    color: "#0083bd",
    fontSize: 24,
    fontWeight: "500",
    opacity: 1,
  },
  notificationCount: {
    // backgroundColor: "red",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: -12,
    backgroundColor: "red",
    right: -7,
    overflow: "visible",
    position: "absolute",
    padding: 2,
    width: 25,

    aspectRatio: 1,
    zIndex: 100,
    borderRadius: 100,
  },
  headerContainer: {},
});
