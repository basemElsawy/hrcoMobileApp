import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MyRequests() {
  const [userData, setUserData]: any = useState();
  const [userID, setUserID] = useState();
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
      <Text>MyRequests</Text>
    </View>
  );
}
