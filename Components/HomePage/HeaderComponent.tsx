import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React from "react";
const width = Dimensions.get("window");
export default function HeaderComponent({ userData }: any) {
  const { width } = useWindowDimensions();
  return (
    <ImageBackground
      style={styles.headerImage}
      source={require("../../assets/HomePageHeader.png")}
    >
      <View style={{ ...styles.headerOptions, width }}>
        <View style={styles.searchContainer}>
          <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ height: 15, width: 15 }}
              source={require("../../assets/Search.png")}
            />
          </Pressable>
          <TextInput
            style={{ fontSize: 12 }}
            placeholder="Search For Anything"
          />
        </View>
        <View style={styles.options}>
          <Pressable style={styles.option}>
            <View style={[styles.notificationCount]}>
              <Text
                style={{
                  backgroundColor: "red",
                  color: "white",

                  borderRadius: 200,
                  fontSize: 10,
                  textAlign: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  // textAlign: "center",
                }}
              >
                0
              </Text>
            </View>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/notification.png")}
            />
          </Pressable>
          <Pressable style={styles.option}>
            <Image
              style={{ width: 23, height: 20 }}
              source={require("../../assets/Hamburger.png")}
            />
          </Pressable>
          <Pressable
            style={{
              shadowColor: "black",
              shadowOpacity: 1,
              shadowOffset: { height: 2, width: 2 },
              elevation: 5,
              shadowRadius: 0,
              borderRadius: 200,
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                ...styles.personImage,
              }}
              source={
                userData.image
                  ? { uri: userData.image }
                  : require("../../assets/Unknown_person.jpg")
              }
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.headerText}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.nameText}>
          {(userData.fullName as string)?.length
            ? userData.fullName
                .split(" ")
                .map((name: string, idx: number) => (idx < 2 ? name : ""))
                .join(" ")
            : ""}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  headerText: {
    width: width as any,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  headerImage: {
    flex: 1,
    paddingTop: 38,
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  headerOptions: {
    flex: 0.75,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 15,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 0.6,
    shadowOffset: { height: 2, width: 2 },
    elevation: 5,

    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "white",
  },
  personImage: {
    flex: 0.9,
    height: 190,
    width: 57,
    borderRadius: 300,
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    gap: 7,
  },
  option: {
    borderRadius: 100,
    backgroundColor: "white",
    padding: 8,
    position: "relative",

    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0083DB",
    paddingHorizontal: 20,
  },
  nameText: {
    paddingLeft: 30,
    color: "grey",
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.7,
  },
  notificationCount: {
    // backgroundColor: "red",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: -12,
    backgroundColor: "red",
    right: -7,
    overflow: "visible",
    position: "absolute",
    padding: 2,
    width: 25,

    aspectRatio: 1,
    zIndex: 100,
    borderRadius: 100,
  },
  headerContainer: {},
});
