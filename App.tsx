import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext, Context } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "./Components/Onboarding/OnBoarding";
import SplashScreen from "./Components/Splash/splashScreen";
import HomePage from "./Components/HomePage/HomePage";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import AuthProvider from "./Components/Contexts/AuthContext";
import {
  AuthContextModel,
  AuthContext,
} from "./Components/Contexts/AuthContext";
import AppRoutes from "./AppRoutes";
export default function App() {
  const [isLoadingApp, setIsLoading] = useState(true);
  const { signIn, signOut, token }: any = useContext(AuthContext);
  const Stack: any = createStackNavigator();
  useEffect(() => {
    // signIn();
    // Simulate app loading for 2 seconds (replace with actual logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoadingApp ? <SplashScreen /> : <AppRoutes />}
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

{
  /* <Stack.Screen name="Home" component={Home} /> */
}
{
  /* <Stack.Screen
  name="onBoarding"
  component={OnBoarding}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="loginScreen"
  component={LoginScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="homePage"
  component={HomePage}
  options={{ headerShown: false }}
/> */
}
