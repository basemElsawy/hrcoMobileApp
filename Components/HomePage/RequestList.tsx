import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function RequestList(props: any) {
  const [data, setData] = useState(props.data.item);
  // const [image, setImage] = useState(props.image.item);
  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      onPress={() => {
        props.handler(data.id);
      }}
    >
      <View
        style={{
          height: 75,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
          backgroundColor: "white",
          marginHorizontal: 5,
          gap: 15,
          width: 100,
          borderRadius: 10,
          shadowColor: "black",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 3,
        }}
      >
        <Image source={props.image[props.data.index].icon} />
        <Text
          style={{
            width: 100,
            textAlign: "center",
            fontSize: 12,
            color: "#0083DB",
            fontWeight: "bold",
          }}
        >
          {data.requestName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
