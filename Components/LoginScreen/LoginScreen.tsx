const image = require("../../assets/LogoBlue.png");
const info = require("../../assets/exclamationMark.png");
const fingerPrint = require("../../assets/fingerPrint.png");
const login = require("../../assets/LoginIcon.png");
const blueArrow = require("../../assets/BlueArrow.png");
const arrow = require("../../assets/arrow.png");
const eye = require("../../assets/Vector.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Pressable,
  Modal,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  NativeSyntheticEvent,
  ActivityIndicator,
} from "react-native";
import { ChangeEvent, useContext, useRef, useState } from "react";
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import useSWR from "swr";
import { ApiName } from "../GlobalData/ApiNames";
import { environment } from "../GlobalData/ApiNames";
import { LineChart } from "react-native-chart-kit";
import { AuthContext } from "../Contexts/AuthContext";

export default function LoginScreen() {
  const baseUrl = environment.baseUrl;
  const { signIn }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setVisiblePassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    employeeCode: "",
    password: "",
  });
  const navigator: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    fetch(baseUrl + ApiName.LoginApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then(async (res) => {
        setIsLoading(false);

        if (res.isAuthenticated) {
          await AsyncStorage.setItem("token", res.token);
          await AsyncStorage.setItem("user", JSON.stringify(res.user));
          signIn(res.token);
          navigator.navigate("homePage");
        } else {
          if (res.message) alert(res.message);
        }
      })
      .finally(() => {})
      .catch((error) => console.log(error, "here"));
  };

  // function setUserCredentialsHandler<T>(event: NativeSyntheticEvent<T>) {
  //   // setUserCredentials((prev) => ({ ...prev , event }));

  //   console.log(userCredentials);
  // }

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Login to your Account</Text>
            <TextInput
              placeholder="Employee Code"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(text: any) =>
                setUserCredentials((prev: any) => ({
                  ...prev,
                  employeeCode: text,
                }))
              }
              style={styles.textInput}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                textContentType="password"
                placeholder="Password"
                maxLength={10}
                onChangeText={(text: string) =>
                  setUserCredentials((prev: any) => ({
                    ...prev,
                    password: text.toLowerCase(),
                  }))
                }
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setVisiblePassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <Image source={eye} style={styles.eyeImage} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isLoading}
              style={[styles.loginButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Image source={login} style={styles.loginIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton}>
            <Image source={blueArrow} style={styles.backArrow} />
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 0.5,
    padding: 15,

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
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    flexDirection: "column",
    paddingTop: 100,
    paddingBottom: 60,
  },
  imageContainer: {
    flex: 0.2,
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    overflow: "visible",
  },
  formContainer: {
    flex: 0.9,
    alignContent: "center",
    justifyContent: "center",
  },
  form: {
    width: width - 50,
    gap: 20,
  },
  formTitle: {
    fontWeight: "600",
    opacity: 0.7,
    textTransform: "capitalize",
  },
  textInput: {
    borderColor: "#0083DB",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    width: width - 50,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#0083DB",
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordInput: {
    width: width - 90,
    padding: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  eyeImage: {
    width: 20,
  },
  loginButton: {
    width: width - 50,
    backgroundColor: "#0083DB",
    alignContent: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
  },
  loginButtonText: {
    color: "white",
  },
  loginIcon: {
    // Add styles if needed
  },
  footer: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backButton: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  backArrow: {
    transform: [{ rotate: "180deg" }],
  },
  backText: {
    textAlign: "left",
    fontSize: 16,
    color: "#0083DB",
    paddingBottom: 2,
  },
  modalHeader: {
    backgroundColor: "#0083DB",
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  modalBody: {
    flex: 0.8,
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalBodyFirstSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  secondSection: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

{
  /* <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text
                style={{
                  textAlign: "left",
                  width: width * 0.7,
                  color: "white",
                  padding: 10,
                  paddingHorizontal: 15,
                }}
              >
                Finger Print
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    color: "white",
                    padding: 5,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  x
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text>Sign In With Your Finger</Text>
              <TouchableOpacity style={styles.modalBodyFirstSection}>
                <Image
                  source={fingerPrint}
                  style={{
                    flex: 0.7,
                    width: width * 0.2,
                    height: width * 0.25,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.secondSection}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "#0083db",
                    width: width * 0.5,
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    Sign in
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      textDecorationLine: "underline",
                      color: "#0083db",
                    }}
                  >
                    proceed without fingerprint
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                width: width * 0.7,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity style={styles.modalButton}>
                <Image source={info} style={{ width: 30, height: 30 }} />
                <Text style={styles.modalButtonText}>
                  if your not in the diameter of the company proceed without
                  fingerprint
                </Text>
              </TouchableOpacity>
            </View>
          </View>
            </View> */
}
