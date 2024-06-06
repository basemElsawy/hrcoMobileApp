import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width;
export default function MyRequests() {
  const [userData, setUserData]: any = useState();
  const [userID, setUserID] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

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
      <View
        style={{
          paddingVertical: 45,

          paddingHorizontal: 25,
          gap: 30,
        }}
      >
        <View style={{ borderBottomColor: "#0038bd", borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 12 }}>Full Name</Text>
          <View
            style={{
              paddingHorizontal: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput placeholder="Full Name" />
            <Pressable style={{ padding: 10 }}>
              <MaterialCommunityIcons
                name="account-edit"
                color={"#0083db"}
                size={21}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ borderBottomColor: "#0038bd", borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 12 }}>Email</Text>
          <View
            style={{
              paddingHorizontal: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput placeholder="Email" />
            <Pressable style={{ padding: 10 }}>
              <MaterialCommunityIcons
                name="account-edit"
                color={"#0083db"}
                size={21}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ borderBottomColor: "#0038bd", borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 12 }}>Title</Text>
          <View
            style={{
              paddingHorizontal: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput placeholder="Title" />
            <Pressable style={{ padding: 10 }}>
              <MaterialCommunityIcons
                name="account-edit"
                color={"#0083db"}
                size={21}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ borderBottomColor: "#0038bd", borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 12 }}>Password</Text>
          <View
            style={{
              paddingHorizontal: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput textContentType="password" placeholder="Password" />
            <Pressable onPress={() => {}} style={{ padding: 10 }}>
              {!isEditing ? (
                <MaterialCommunityIcons
                  name="account-edit"
                  color={"#0083db"}
                  size={21}
                />
              ) : (
                <Text>Submit</Text>
              )}
            </Pressable>
          </View>
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

    elevation: 5,
    // height: 120,
  },
});
