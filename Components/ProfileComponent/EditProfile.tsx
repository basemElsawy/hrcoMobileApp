import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState, useCallback } from "react";
import HeaderComponent from "./HeaderComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native-paper";
import { environment } from "../GlobalData/ApiNames";
import { ApiName } from "../GlobalData/ApiNames";
import { checkIfConfigIsValid } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
const width = Dimensions.get("window").width;

export default function MyRequests() {
  const [userData, setUserData] = useState();
  const [userID, setUserID] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [editableFields, setEditableFields]: any = useState({
    fullName: false,
    email: false,
    title: false,
    password: false,
  });
  const [refreshing, setRefreshing] = useState(false);

  const { control, handleSubmit, setValue } = useForm();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request to fetch new data
    setTimeout(() => {
      AsyncStorage.getItem("user").then((res) => {
        const data = JSON.parse(res || "{}");
        setUserData(data);
        setUserID(data.id);
        if (data) {
          setValue("fullName", data.fullName);
          setValue("email", data.email);
          setValue("title", data.title);
          setValue("password", data.password);
        }
        setRefreshing(false);
      });
    }, 2000); // Adjust the timeout to simulate network delay
  }, [setValue]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      const data = JSON.parse(res || "{}");
      setUserData(data);
      setUserID(data.id);
      setValue("fullName", data.fullName || "");
      setValue("email", data.email || "");
      setValue("title", data.title || "");
      setValue("password", data.password || "");
    });
  }, [setValue]);

  const toggleEditable = (field: any) => {
    if (editableFields[field]) {
      onSubmit(field);
    }

    setEditableFields((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = (data: any) => {
    let body = { [data]: control._formValues[data] };
    AsyncStorage.getItem("user").then((storageRes: any) => {
      fetch(
        environment.baseUrl +
          ApiName.updateUser +
          JSON.parse(storageRes || "").id,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )
        .then((res: any) => res.json())
        .then((res) => {
          if (res) {
            alert("Data successfully updated");

            fetch(
              environment.baseUrl +
                ApiName.getSpecificuser +
                JSON.parse(storageRes || " ").employeeCode,
              { method: "GET", headers: { "Content-Type": "application/json" } }
            )
              .then((res: any) => {
                return res.json();
              })
              .then((res: any) => {
                setUserData(res);
                setUserID(res.id);
                setValue("fullName", res.fullName || "");
                setValue("email", res.email || "");
                setValue("title", res.title || "");
                setValue("password", res.password || "");
                AsyncStorage.removeItem("user");
                AsyncStorage.setItem("user", JSON.stringify(res));
              })
              .catch((err) => console.log("didnt react", err));
          }
        })
        .catch((error) => {
          console.log("this error");
          console.log(error);
        });
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{ ...styles.headerContent, width: width, height: width * 0.7 }}
      >
        {userData && <HeaderComponent userData={userData} />}
      </View>
      <View
        style={{
          flex: 1,

          paddingVertical: 45,
          paddingHorizontal: 25,
          gap: 20,
        }}
      >
        {[
          { label: "Full Name", name: "fullName", textContentType: "name" },
          { label: "Email", name: "email", textContentType: "emailAddress" },
          { label: "Title", name: "title", textContentType: "none" },
          { label: "Password", name: "password", textContentType: "password" },
        ].map((field: any) => (
          <View
            key={field.name}
            style={{
              borderBottomColor: "#0038bd",
              borderBottomWidth: 0.5,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>{field.label}</Text>
            <View
              style={{
                paddingHorizontal: 12,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ width: "60%", paddingVertical: 10 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={editableFields[field.name]}
                    placeholder={field.label}
                    textContentType={field.textContentType}
                  />
                )}
              />
              {!isUpdating ? (
                <Pressable
                  onPress={() => toggleEditable(field.name)}
                  style={{ padding: 10 }}
                >
                  {!editableFields[field.name] ? (
                    <MaterialCommunityIcons
                      name="account-edit"
                      color={"#0083db"}
                      size={21}
                    />
                  ) : (
                    <Text style={{ fontSize: 12 }}>submit</Text>
                  )}
                </Pressable>
              ) : (
                <ActivityIndicator size={12} color="#0083db" />
              )}
            </View>
          </View>
        ))}
        {/* <Pressable onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          
        </Pressable> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    // flex: 0.25,

    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: "hidden",

    elevation: 5,
    // height: 120,
  },
  submitButton: {},
  submitButtonText: {},
});
