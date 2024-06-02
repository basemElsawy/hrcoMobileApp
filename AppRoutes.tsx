import { createStackNavigator } from "@react-navigation/stack";
import { Fragment, useContext, useEffect } from "react";
import OnBoarding from "./Components/Onboarding/OnBoarding";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import HomePage from "./Components/HomePage/HomePage";
import {
  AuthContext,
  AuthContextModel,
} from "./Components/Contexts/AuthContext";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Components/ProfileComponent/Profile";
import Settings from "./Components/Settings/Settings";
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      style={{}}
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: null,

          tabBarColor: "#F1FAFF",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wrench" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  let Stack = createStackNavigator();
  let { token }: AuthContextModel | any = useContext(AuthContext);
  useEffect(() => {}, []);
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={Home} /> */}
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
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
}
