import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";

import RequestList from "./RequestList";

let icons = [
  { icon: require("../../assets/Money.png") },
  { icon: require("../../assets/Vacation.png") },
  {
    icon: require("../../assets/Car.png"),
  },
  { icon: require("../../assets/Overtime.png") },
];
export default function RequestsList(props: any) {
  useEffect(() => {}, []);
  function requestHandler(requestTypeId: number) {
    props.handler(requestTypeId);
  }
  return (
    <>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          style={{
            color: "#0083DB",
            fontWeight: "bold",
            marginBottom: 10,

            // paddingHorizontal: 10,
            // paddingBottom: 2,
          }}
        >
          Requests
        </Text>
        <Pressable>
          <Text
            style={{
              color: "#0083DB",
              fontWeight: "bold",
              marginBottom: 10,
              fontSize: 12,
            }}
          >
            Track Requests
          </Text>
        </Pressable>
      </View>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        {props.requests ? (
          <FlatList
            data={props.requests}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={(item: any) => (
              <RequestList data={item} image={icons} handler={requestHandler} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <ActivityIndicator size={"small"} color={"#0083db"} />
        )}
      </View>
    </>
  );
}
