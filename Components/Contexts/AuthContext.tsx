import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext({});

export interface AuthContextModel {
  signIn(token: string): void;
  signOut(): void;
  token: string | null;
}

export default function AuthProvider(props: any) {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then(async (res) => {
      if (res?.length) {
        setUserToken(res);
      }
    });

    if (userToken?.length) {
      let decode = jwtDecode(userToken);
      let currentDate = new Date(Date.now());
      let expDate = new Date((decode.exp as any) * 1000);

      if (currentDate >= expDate) {
        setUserToken(null);
        AsyncStorage.clear();
      }
    }

    // console.log(userToken, token);
  }, [userToken]);

  const authContext: AuthContextModel = {
    signIn: (token: string) => {
      setUserToken(token);
    },
    signOut: () => {
      setUserToken(null);
    },
    token: userToken,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
