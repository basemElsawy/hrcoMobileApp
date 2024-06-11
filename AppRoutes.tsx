import { createStackNavigator } from "@react-navigation/stack";
import { Fragment, useContext, useEffect } from "react";
import OnBoarding from "./Components/Onboarding/OnBoarding";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import HomePage from "./Components/HomePage/HomePage";
import {
  AuthContext,
  AuthContextModel,
} from "./Components/Contexts/AuthContext";
import { StyleSheet, View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Components/ProfileComponent/Profile";
import Settings from "./Components/Settings/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from "./Components/ProfileComponent/EditProfile";
import MyRequests from "./Components/ProfileComponent/MyRequests";
import Progress from "./Components/ProfileComponent/progress";

const Drawer = createDrawerNavigator();
const Tab: any = createMaterialBottomTabNavigator();
const ProfileStack = createStackNavigator();

let userFullName: string = "";
AsyncStorage.getItem("user").then((res: any) => {
  userFullName = JSON.parse(res || "")
    .fullName.split(" ")
    .map((name: string, idx: number) => (idx < 2 ? name : ""))
    .join(" ");
});

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      activeIndicatorStyle={{
        backgroundColor: "#0083DB",
        width: 140,
        borderRadius: 0,
        height: 100,
        padding: 0,
        paddingTop: 0,
      }}
      barStyle={{
        display: "flex",
        justifyContent: "space-between",
        shadowColor: "black",
        backgroundColor: "white",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { height: 5, width: 5 },
        height: 40,
        transform: [{ translateY: -20 }],
        marginTop: 0,
        padding: 0,
        paddingTop: 0,
        elevation: 10,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: null,
          tabBarColor: "#F1FAFF",
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const CustomDrawerContent = (props: any) => {
  const navigator: any = useNavigation();
  const { signOut }: any = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Text style={styles.title}>Hello</Text>
          <Text style={{ color: "grey", opacity: 0.8 }}>{userFullName}</Text>
        </View>
        <View style={styles.line}>
          <View
            style={{
              width: "70%",
              backgroundColor: "grey",
              height: 1,
              opacity: 0.4,
            }}
          ></View>
        </View>
        <Text style={{ fontSize: 12, paddingHorizontal: 10, paddingBottom: 5 }}>
          Menu
        </Text>
        <DrawerItem
          style={{
            paddingLeft: 0,
            shadowColor: "#0083db",
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 3,
            paddingBottom: 4,
            backgroundColor: "white",
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )}
          activeBackgroundColor="#0083db"
          label="Home"
          onPress={() => {
            props.navigation.navigate("HomeTabs", { screen: "home" });
          }}
        />
        <DrawerItem
          style={{
            shadowColor: "#0083db",
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 3,
            paddingBottom: 4,
            backgroundColor: "white",
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )}
          label="Profile"
          onPress={() => {
            props.navigation.navigate("HomeTabs", {
              screen: "Profile",
            });
          }}
        />
        <DrawerItem
          style={{
            shadowColor: "#0083db",
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 3,
            backgroundColor: "white",
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          )}
          label="Settings"
          onPress={() => {
            props.navigation.navigate("HomeTabs", { screen: "settings" });
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "flex-end",
          flex: 0.5,
          height: 450,
        }}
      >
        <DrawerItem
          style={{
            borderColor: "#0083db",
            borderWidth: 2,
            borderStyle: "solid",
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={"#0083db"}
              size={size}
            />
          )}
          labelStyle={{ color: "#0083db" }}
          label="Logout"
          onPress={() => {
            // props.navigation.navigate("loginScreen");
            signOut();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="profile">
      <ProfileStack.Screen
        name="ProfileMain"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="MyRequests"
        component={MyRequests}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Progress"
        component={Progress}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

function DrawerNavigator() {
  let { token }: AuthContextModel | any = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeTabs"
        component={BottomTabs}
      />
    </Drawer.Navigator>
  );
}

export default function AppRoutes() {
  let Stack = createStackNavigator();
  let { token }: AuthContextModel | any = useContext(AuthContext);
  useEffect(() => {}, []);
  return (
    <Stack.Navigator>
      {token == null ? (
        <Fragment>
          <Stack.Screen
            name="onBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="loginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Stack.Screen
            name="homePage"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  userInfoSection: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  line: {
    height: 1,
    marginBottom: 35,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginTop: 3,
    fontWeight: "900",
    color: "#0083bd",
  },
});
