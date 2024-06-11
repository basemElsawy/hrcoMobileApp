import {
  View,
  RefreshControl,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import HeaderComponent from "./HeaderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../GlobalData/ApiNames";
import { ApiName } from "../GlobalData/ApiNames";
import useSWR from "swr";
import { ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function MyRequests() {
  const [userData, setUserData]: any = useState();
  const [userID, setUserID] = useState();
  const [requests, setRequests]: any = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isRequestLoading, setRequestLoading] = useState(false);
  const [activeState, setActiveState] = useState({
    pending: false,
    approved: false,
    ignored: false,
  });
  const { data: Requests, error } = useSWR(
    environment.baseUrl + ApiName.requestTypes,
    fetcher
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    getNoActionRequestsHandler("pending");
    // Adjust the timeout to simulate network delay
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUserData(JSON.parse(res || "{}"));
      setUserID(JSON.parse(res || "{}").id);
    });

    // getRequestsHandler();
    // console.log();
    getNoActionRequestsHandler("pending");
  }, []);

  function getIgnoredRequestsHandler(stateChecker: string) {
    setRequestLoading(true);
    AsyncStorage.getItem("user").then((res) => {
      let userID = JSON.parse(res || "").id;
      fetch(
        `${environment.baseUrl}${ApiName.getIgnoredRequests}page=${page}&pageSize=${pageSize}&userID=${userID}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRefreshing(false);
          console.log(res);
          if (res?.data.length) {
            setRequestLoading(false);
            setRequests(res.data);
            console.log(res.data.length);

            Object.keys(activeState).forEach((key) => {
              if (key == stateChecker) {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: true,
                }));
              } else {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: false,
                }));
              }
            });
          }
        })
        .catch((err) => {
          setRequestLoading(false);
          setRefreshing(false);
          console.log(err);
        });
    });
  }

  function getSubmittedRequestHandler(stateChecker: string) {
    setRequestLoading(true);
    AsyncStorage.getItem("user").then((res) => {
      let userID = JSON.parse(res || "").id;
      fetch(
        `${environment.baseUrl}${ApiName.getSubmittedRequests}page=${page}&pageSize=${pageSize}&userID=${userID}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRefreshing(false);
          console.log(res);
          if (res?.data.length) {
            setRequestLoading(false);
            setRequests(res.data);
            console.log(res.data.length);

            Object.keys(activeState).forEach((key) => {
              if (key == stateChecker) {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: true,
                }));
              } else {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: false,
                }));
              }
            });
          }
        })
        .catch((err) => {
          setRequestLoading(false);
          setRefreshing(false);
          console.log(err);
        });
    });
  }

  function getNoActionRequestsHandler(stateChecker?: string) {
    setRequestLoading(true);
    AsyncStorage.getItem("user").then((res) => {
      let userID = JSON.parse(res || "").id;
      fetch(
        `${environment.baseUrl}${ApiName.specificUserRequests}page=${page}&pageSize=${pageSize}&userID=${userID}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRefreshing(false);
          console.log(res);
          if (res?.data.length) {
            setRequestLoading(false);
            setRequests(res.data);
            console.log(res.data.length);

            Object.keys(activeState).forEach((key) => {
              if (key == stateChecker) {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: true,
                }));
              } else {
                setActiveState((prev: any) => ({
                  ...prev,
                  [key]: false,
                }));
              }
            });
          }
        })
        .catch((err) => {
          setRequestLoading(false);
          setRefreshing(false);
          console.log(err);
        });
    });
  }

  function formatDate(dateString: string) {
    const options: any = {
      month: "long",
      day: "numeric",
      timeZone: "Africa/Cairo",
    };
    const date = new Date(dateString);
    // const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const options: any = {
      hour: "numeric",
      minute: "numeric",

      timeZone: "Africa/Cairo",
    };
    // const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString("en-US", options);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{ ...styles.headerContent, width: width, height: width * 0.7 }}
      >
        {userData && <HeaderComponent userData={userData} />}
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
        <View
          style={{
            marginBottom: 30,
            gap: 10,
          }}
        >
          <Text
            style={[
              {
                color: "#0083bd",
                fontSize: 16,
                fontWeight: "700",
              },
            ]}
          >
            My Requests
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            <Pressable
              style={[
                {
                  backgroundColor: "#F1FAFF",
                  paddingHorizontal: 18,
                  paddingVertical: 7,
                  borderRadius: 50,
                  elevation: 2,
                },
                { opacity: activeState.pending ? 1 : 0.7 },
              ]}
              onPress={() => getNoActionRequestsHandler("pending")}
            >
              <Text
                style={{ color: "#0083bd", fontSize: 10, fontWeight: "800" }}
              >
                Pending
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#F1FAFF",
                paddingHorizontal: 18,
                paddingVertical: 7,
                borderRadius: 50,
                elevation: 2,
                opacity: activeState.approved ? 1 : 0.7,
              }}
              onPress={() => getSubmittedRequestHandler("approved")}
            >
              <Text
                style={{ color: "#0083bd", fontSize: 10, fontWeight: "800" }}
              >
                Approved
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#F1FAFF",
                paddingHorizontal: 18,
                paddingVertical: 7,
                borderRadius: 50,
                elevation: 2,
                opacity: activeState.ignored ? 1 : 0.7,
              }}
              onPress={() => getIgnoredRequestsHandler("ignored")}
            >
              <Text
                style={{ color: "#0083bd", fontSize: 10, fontWeight: "800" }}
              >
                Ignored
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ gap: 30 }}>
          {!isRequestLoading ? (
            requests.length > 0 ? (
              requests.map((req: any, idx: number) => {
                return (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: "33%",
                        height: 150,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingVertical: 20,
                      }}
                    >
                      <Text style={{ color: "#B7B7B7" }}>
                        {requests && formatDate(req.requestedAt)}
                      </Text>
                      <View style={{ width: "90%" }}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            width: "100%",
                            marginVertical: 10,
                            backgroundColor: "#F1FAFF",
                            overflow: "visible",
                            borderRadius: 50,
                            elevation: 2,
                            // shadowColor: "black",
                          }}
                        >
                          <Text style={{ color: "#0083bd" }}>
                            {requests && formatTime(req.requestedAt)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "63%",
                        height: 150,
                        backgroundColor: "#F1FAFF",
                        paddingHorizontal: 14,
                        paddingVertical: 16,
                        borderRadius: 10,
                        elevation: 2,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          gap: 6,
                          alignItems: "flex-start",
                        }}
                      >
                        <View>
                          <View></View>
                          <Text style={{ color: "#0083DB" }}>
                            {requests && req.requestType.requestName}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#949494",
                            fontSize: 12,
                            paddingRight: 12,
                          }}
                        >
                          {requests && req.requestTypeDescription}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "#0083bd" }}>
                          State
                        </Text>
                        {!req.approvedByManager &&
                          !req.approvedByHr &&
                          !req.isIgnored && (
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "#0083bd",
                              }}
                            >
                              Waiting For Approval
                            </Text>
                          )}
                        {req.isSubmitted && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 5,
                            }}
                          >
                            <MaterialCommunityIcons
                              size={14}
                              name="check"
                              color={"green"}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "green",
                              }}
                            >
                              Approved
                            </Text>
                          </View>
                        )}
                        {req.isIgnored && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 5,
                            }}
                          >
                            <MaterialCommunityIcons
                              size={14}
                              name="close-thick"
                              color={"red"}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              Ignored
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ width: "100%" }}>No Requests Found</Text>
            )
          ) : (
            <ActivityIndicator size={21} color="#0083bd" />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: "hidden",

    elevation: 5,
  },
});
