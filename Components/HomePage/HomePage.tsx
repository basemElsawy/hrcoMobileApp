import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  FlatList,
  Modal,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import FingerPrintStatus from "./FingerPrintStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import CommentList from "./CommentList";
import useSWR from "swr";
import { ApiName } from "../GlobalData/ApiNames";
import { environment } from "../GlobalData/ApiNames";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "./HeaderComponent";
import RequestsList from "./RequestsList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Header } from "@react-navigation/stack";
// import { icons } from "./DummyData";
import RequestList from "./RequestList";
import ProgressChart from "./ProgressChart";
import Comments from "./Comments";

const width = Dimensions.get("window").width;

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function HomePage() {
  const { width }: any = useWindowDimensions();
  const navigator = useNavigation();
  const { data: Requests, error } = useSWR(
    environment.baseUrl + ApiName.requestTypes,
    fetcher
  );
  const animatedSearch = useRef(new Animated.Value(0)).current;
  const [notificationNum, setNotifications] = useState<number>(0);
  const [requestData, setRequestData] = useState<
    { id: number; requestName: string }[] | any
  >({});
  const [userData, setUserData] = useState<any>({});
  const [userID, setUserID] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [requestLoading, setRequestLoader] = useState(false);
  const [description, setDescription] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUserData(JSON.parse(res || "{}"));
      setUserID(JSON.parse(res || "{}").id);
      console.log(JSON.parse(res || "").employeeCode);
    });
    console.log(userID);

    if (Requests) {
      setRequestData(Requests);
    }
  }, []);
  function requestHandler(requestTypeId: number) {
    setModalVisible(true);
    let requested;
    if (Requests) {
      requested =
        Array.isArray(Requests) &&
        Requests.find((req) => req.id == requestTypeId);
    }
    setSelectedValue(requested.id);
  }
  function requestSendingHandler() {
    let requestBody = {
      userID,
      requestTypeID: selectedValue,
      requestTypeDescription: description,
    };

    setRequestLoader(true);

    if (requestBody.requestTypeDescription.length >= 15) {
      fetch(environment.baseUrl + ApiName.createRequests, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((res) => {
          setRequestLoader(false);
          if (res["employeeRequest"]) {
            alert(res?.message);
            setModalVisible(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Add a Respective Description To Your Request");
      setRequestLoader(false);
    }
  }
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={{
              width,
              height: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              left: 0,
              top: 0,
            }}
            onPress={() => {
              setModalVisible(false);
            }}
          ></Pressable>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={{ color: "white", fontSize: 12 }}>Request</Text>
              <MaterialCommunityIcons
                onPress={() => {
                  setModalVisible(false);
                }}
                name="close"
                style={{ color: "white", padding: 5 }}
              />
            </View>
            <View style={[styles.modalBody, { gap: 20 }]}>
              <View>
                <View style={{ width: "100%" }}>
                  <Text style={{ textAlign: "left" }}>Request Type</Text>
                </View>
                <View
                  style={{
                    // paddingTop: ,
                    marginTop: 5,
                    overflow: "hidden",
                    borderRadius: 5,
                    borderColor: "#0083DB",
                    borderWidth: 1,
                    borderStyle: "solid",
                    height: 35,

                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedValue(itemValue);
                    }}
                  >
                    {Array.isArray(Requests) &&
                      Requests.map((item: any, idx: number) => {
                        return (
                          <Picker.Item
                            key={idx}
                            style={styles.pickerItem}
                            label={item.requestName}
                            value={item.id}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View>
                <TextInput
                  placeholder="Request Decription"
                  onChangeText={(text: any) => {
                    setDescription(text);
                  }}
                  style={{
                    height: 70,
                    borderColor: "#0083DB",
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    padding: 15,
                  }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  elevation: 2,
                  shadowColor: "#0083DB",
                  borderRadius: 5,
                  shadowOpacity: 0.1,
                  shadowRadius: 20,
                  shadowOffset: { height: 0, width: 0 },
                }}
                onPress={requestSendingHandler}
              >
                <Text>Send</Text>
                {requestLoading ? (
                  <ActivityIndicator size={"small"} color={"grey"} />
                ) : (
                  <MaterialCommunityIcons name="send" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.mainHomeContainer}>
        <View
          style={{ ...styles.headerContent, width: width, height: width * 0.5 }}
        >
          <HeaderComponent userData={userData} />
        </View>
        <View
          style={[
            styles.fingerPrintStatusSection,
            {
              width,
            },
          ]}
        >
          <FingerPrintStatus />
        </View>
        <View style={styles.requestsLists}>
          <RequestsList requests={Requests} handler={requestHandler} />
        </View>
        <View style={styles.progressChart}>
          <ProgressChart />
        </View>
        <View style={styles.commentsContainer}>
          <Comments user={userData} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },

  headerContent: {
    // flex: 0.25,

    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    // height: 120,
  },
  fingerPrintStatusSection: {
    marginVertical: 16,
    height: width * 0.3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    // width: width,
    borderRadius: 10,
    // flex: 0.8,
    justifyContent: "space-between",
    paddingHorizontal: 0,
    // paddingVertical: 16,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 10,
  },
  requestsLists: {
    paddingVertical: 6,
    paddingHorizontal: 20,

    width: width,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "fit-content",
    padding: 15,
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },
  modalHeader: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    justifyContent: "space-between",

    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#0083DB",
  },
  modalBody: {
    width: "100%",
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  picker: {
    borderColor: "#0083DB",
    borderWidth: 1,
    borderStyle: "solid",
    width: "100%",
    margin: 0,
    borderRadius: 10,
    height: 45,
    backgroundColor: "white",
  },
  pickerItem: {
    color: "#0083DB",
    width: "100%",
    borderRadius: 5,
  },
  progressChart: {
    width: width,
    // paddingHorizontal: 10,
  },
  commentsContainer: {
    paddingHorizontal: 18,
  },
});
