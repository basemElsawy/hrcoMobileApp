import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { environment } from "../GlobalData/ApiNames";
import { ApiName } from "../GlobalData/ApiNames";
// import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
export default function Comments(props: any) {
  const [userCommentData, setUserCommentData] = useState<any>();
  const [moderatorImage, setModeratorImage] = useState<string[]>([]);
  useEffect(() => {
    console.log(props.user.employeeCode);
    if (props.user.employeeCode) {
      fetch(
        `${environment.baseUrl}${ApiName.getEmplpoyeeComments}${props.user.employeeCode}`
      )
        .then((res) => res.json())
        .then((res: any) => {
          // console.log(res);
          if (res.length && res) {
            setUserCommentData(res && res);

            // setModeratorImage(
            //   res.map(({ user }: any) => ({ image: user.image }))
            // );
          } else {
            console.log("not working");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(
      `${environment.baseUrl}${ApiName.getEmplpoyeeComments}${props.user.employeeCode}`
    );
  }, [props.user.employeeCode]);

  return (
    <View style={styles.allComments}>
      <Text style={{ color: "#0083DB", fontWeight: "bold", marginBottom: 10 }}>
        Comments From Officials
      </Text>
      <View style={styles.commentListContainer}>
        {userCommentData ? (
          <FlatList
            data={userCommentData}
            renderItem={(item: any) => (
              <CommentList
                commentList={item}
                //  image={moderatorImage}
              />
            )}
            keyExtractor={(item: any) => item.id}
          />
        ) : (
          <ActivityIndicator size={"small"} color={"#0083db"} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentListContainer: {
    height: 200,
    paddingBottom: 35,
  },
  allComments: {},
});
