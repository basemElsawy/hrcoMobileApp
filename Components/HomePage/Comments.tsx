import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { environment } from "../GlobalData/ApiNames";
import { ApiName } from "../GlobalData/ApiNames";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
export default function Comments(props: any) {
  const [userCommentData, setUserCommentData] = useState([]);
  const [moderatorImage, setModeratorImage] = useState<string[]>([]);
  useEffect(() => {
    // console.log(props.user.employeeCode);
    fetch(
      environment.baseUrl +
        ApiName.getEmplpoyeeComments +
        props.user.employeeCode
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          setUserCommentData(
            res.map(
              ({
                id,
                commentText,
                moderatorName,
                userID,
                moderatorID,
                createdAt,
              }: any) => ({
                id,
                commentText,
                moderatorName,
                userID,
                moderatorID,
                createdAt,
              })
            )
            // console.log(res.map(({user}:any)=>user.image))
          );
          setModeratorImage(
            res.map(({ user }: any) => ({ image: user.image }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.allComments}>
      <Text style={{ color: "#0083DB", fontWeight: "bold", marginBottom: 10 }}>
        Comments From Officials
      </Text>
      <View style={styles.commentListContainer}>
        <FlatList
          data={userCommentData}
          renderItem={(item: any) => (
            <CommentList commentList={item} images={moderatorImage} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentListContainer: {
    height: 200,
  },
  allComments: {},
});
