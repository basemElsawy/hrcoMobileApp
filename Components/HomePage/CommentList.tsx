import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CommentList(props: any) {
  const [commentList, setCommentsList] = useState<any>({});
  useEffect(() => {
    setCommentsList(props.commentList.item);
    console.log(commentList);
  });
  return (
    <View style={styles.commentContainer}>
      <View>
        <Image
          style={{ width: 55, height: 55, borderRadius: 100 }}
          source={
            props.images[props.commentList.index]
              ? { uri: props.images[props.commentList.index].image }
              : require("../../assets/Unknown_person.jpg")
          }
        />
      </View>
      <View>
        <Text>{/* {commentList.commentText} */}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 5,
    // height: 500,
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
});
