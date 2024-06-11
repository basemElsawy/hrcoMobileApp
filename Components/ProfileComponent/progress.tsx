import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "./HeaderComponent";
import { ApiName, environment } from "../GlobalData/ApiNames";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
let width = Dimensions.get("window").width;
export default function Progress() {
  const [userData, setUserData]: any = useState();
  const [userID, setUserID] = useState();
  const [AllProgress, setAllProgress] = useState<any[]>([]);
  const [ProgressYears, setAllProgressYears]: any = useState<any[]>([]);
  const [userProgress, setUserProgess]: any = useState<any>([]);
  const [isLoading, setIsLoading]: any = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUserData(JSON.parse(res || "{}"));
      setUserID(JSON.parse(res || "{}").id);
      let userID = JSON.parse(res || "{}").id;
      getProgressForCurrentUser(userID);
    });
  }, []);

  function getProgressForCurrentUser(userID: string) {
    setIsLoading(true);
    fetch(environment.baseUrl + ApiName.getSpecificProgress + userID)
      .then((res) => res.json())
      .then((res: any) => {
        if (res.length) {
          setUserProgess(res.find((res: any) => res.currentYear === "2024"));
          console.log(res?.progress);
          setAllProgress(res);

          let allYears = res.map(({ currentYear }: any) => currentYear);
          setAllProgressYears(allYears);
          setIsLoading(false);
          console.log(allYears);
          console.log(userProgress);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function yearFilter(year: string) {
    let filterCurrentYears = AllProgress.find(
      ({ currentYear }) => currentYear == year
    );
    setUserProgess(filterCurrentYears);
  }
  return (
    <ScrollView>
      <View
        style={{ ...styles.headerContent, width: width, height: width * 0.7 }}
      >
        {userData && <HeaderComponent userData={userData} />}
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            color: "#0083bd",
            marginBottom: 10,
          }}
        >
          My Evaluation
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          {!isLoading ? (
            ProgressYears.length &&
            ProgressYears.map((years: any) => {
              return (
                <Pressable
                  style={[
                    {
                      backgroundColor: "#F1FAFF",
                      paddingHorizontal: 18,
                      paddingVertical: 7,
                      borderRadius: 50,
                      elevation: 2,
                    },
                    //   { opacity: activeState.pending ? 1 : 0.7 },
                  ]}
                  onPress={() => yearFilter(years)}
                >
                  <Text
                    style={{
                      color: "#0083bd",
                      fontSize: 10,
                      fontWeight: "800",
                    }}
                  >
                    {years}
                  </Text>
                </Pressable>
              );
            })
          ) : (
            <ActivityIndicator size={21} color="#0083bd" />
          )}
        </View>
        {!isLoading ? (
          <View style={{ gap: 30, paddingHorizontal: 5, marginVertical: 40 }}>
            <View>
              {userProgress?.progress?.length &&
                userProgress.progress.map((prog: any) => {
                  return (
                    <View style={styles.ProgressEvaluation}>
                      <Text>{prog.progressName}</Text>
                      <Text> {prog.progressValue}</Text>
                    </View>
                  );
                })}
            </View>
            <View style={styles.ProgressEvaluation}>
              <Text>Total</Text>
              <Text> {userProgress.total}</Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator size={21} color="#0083bd" />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: "hidden",
    shadowColor: "black",
    elevation: 5,
  },
  ProgressEvaluation: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,

    justifyContent: "space-between",
    borderBottomColor: "#0083bd",
    borderBottomWidth: 0.5,
  },
});
