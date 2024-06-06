import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get("window").width;
export default function Profile() {
  const [userData, setUserData]: any = useState();
  const [userID, setUserID] = useState();
  const navigator: any = useNavigation();
  useEffect(() => {
    console.log("working");
    AsyncStorage.getItem("user").then((res) => {
      setUserData(JSON.parse(res || "{}"));
      setUserID(JSON.parse(res || "{}").id);
      // console.log(userData);
      // console.log(JSON.parse(res || "").employeeCode);
    });
    console.log(userData?.email);
  }, []);

  return (
    <View>
      <View
        style={{ ...styles.headerContent, width: width, height: width * 0.7 }}
      >
        {userData && <HeaderComponent userData={userData} />}
      </View>
      <View style={styles.profileContent}>
        <View>
          <Pressable
            style={styles.profileButtons}
            onPress={() => {
              navigator.navigate("Profile", { screen: "EditProfile" });
            }}
          >
            <View style={styles.buttonDetails}>
              <MaterialCommunityIcons
                name={"account-edit"}
                color={"#0083db"}
                size={21}
              />
              <Text style={{ color: "#0083db" }}>Edit Profile</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name={"arrow-right-thick"}
                color={"#0083db"}
                size={21}
              />
            </View>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.profileButtons}
            onPress={() => {
              navigator.navigate("Profile", { screen: "MyRequests" });
            }}
          >
            <View style={styles.buttonDetails}>
              <MaterialCommunityIcons
                name={"send"}
                color={"#0083db"}
                size={18}
                style={{ transform: [{ rotate: "-45deg" }] }}
              />
              <Text style={{ color: "#0083db" }}>My Requests</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name={"arrow-right-thick"}
                color={"#0083db"}
                size={21}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    // flex: 0.25,

    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    // height: 120,
  },
  buttonDetails: {
    flexDirection: "row",
    gap: 10,
  },
  profileContent: {
    paddingVertical: 45,
    paddingHorizontal: 30,
    gap: 15,
  },
  profileButtons: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F1FAFF",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
});
