import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ApiName, environment } from "../GlobalData/ApiNames";
export default function CommentList(props: any) {
  const [commentList, setCommentsList] = useState<any>({});
  const [moderatorImage, setModerator] = useState<string>("");
  useEffect(() => {
    fetch(`${environment.baseUrl}${ApiName.getAllUsers}`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res?.data?.length) {
          let moderatorImage = res.data.find((mod: any) => {
            return mod.id == commentList.moderatorID;
          });

          setModerator(moderatorImage.image);
        }
      });

    if (props.commentList) {
      setCommentsList({
        id: props.commentList.item.id,
        commentText: props.commentList.item.commentText,
        moderatorName: props.commentList.item.moderatorName,
        moderatorID: props.commentList.item.moderatorID,
        createdAt: props.commentList.item.createdAt,
        image: props.commentList.item.user.image,
      });
    }
    // console.log(props.image[props.commentList.index]);
  }, [props.commentList]);

  if (props.commentList.item.length < 1) return <div>Loading</div>;
  return (
    <View style={styles.commentContainer}>
      <View>
        <Image
          style={{ width: 60, height: 60, borderRadius: 100 }}
          source={
            (moderatorImage as string)?.length
              ? { uri: moderatorImage }
              : require("../../assets/Unknown_person.jpg")
          }
        />
      </View>
      <View>
        <Text style={{ color: "#0083DB", fontWeight: "bold" }}>
          {commentList.moderatorName}
        </Text>
        <Text>{commentList.commentText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 16,
    borderRadius: 10,
    // height: 500,
    gap: 15,
    backgroundColor: "white",
    width: "100%",
    marginVertical: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
});
