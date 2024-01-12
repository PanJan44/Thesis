import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import GetApiEndpoint, { Api } from "../core/api.enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserApi } from "../screens/profileScreen/user.api";
import { bool } from "yup";
import { Role } from "react-native";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null, userId: number | null, role: Role | null; banStatus: boolean | null };
  onRegister?: (email: string, password: string, confirmedPassword: string, nickname: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    userId: number | null;
    role: Role | null;
    banStatus: boolean | null;
  }>(
    {
      token: null,
      authenticated: null,
      userId: null,
      role: null,
      banStatus: null
    }
  );

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        setAuthState({
          token: token,
          authenticated: true,
          userId: await UserApi.getCurrenUserId(),
          role: await UserApi.getCurrenUserRole(),
          banStatus: await UserApi.getCurrenUserBanStatus()
        });
      }
    };
    loadToken().catch(console.error);
  }, []);

  const register = async (email: string, password: string, confirmedPassword: string, nickname: string): Promise<any> => {
    try {
      return await axios.post(GetApiEndpoint(Api.REGISTER), {
        email,
        password,
        confirmedPassword,
        nickname
      });
    } catch (e: any) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const login = async (email: string, password: string): Promise<any> => {
    try {
      const result = await axios.post(GetApiEndpoint(Api.LOGIN), {
        email,
        password
      });


      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data}`;
      await AsyncStorage.setItem("token", result.data);
      const userId = await UserApi.getCurrenUserId();
      const role = await UserApi.getCurrenUserRole();
      const banStatus = await UserApi.getCurrenUserBanStatus();
      setAuthState({
        token: result.data as string,
        authenticated: true,
        userId: userId,
        role: role,
        banStatus: banStatus
      });
      return result;

    } catch (e: any | AxiosError) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    axios.defaults.headers.common["Authorization"] = null;

    setAuthState({
      token: null,
      authenticated: false,
      userId: null,
      role: null,
      banStatus: null
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
