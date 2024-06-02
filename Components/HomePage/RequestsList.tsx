import { View, Text, FlatList, StyleSheet } from "react-native";
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
  useEffect(() => {
    console.log(props.requests);
  }, []);
  function requestHandler(requestTypeId: number) {
    props.handler(requestTypeId);
  }
  return (
    <>
      <View>
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
      </View>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <FlatList
          data={props.requests}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={(item: any) => (
            <RequestList data={item} image={icons} handler={requestHandler} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}
