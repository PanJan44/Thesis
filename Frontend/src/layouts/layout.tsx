import { AuthProvider, useAuth } from "../context/AuthContext";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../styles";
import HomeScreen from "../screens/homeScreen/homeScreen";
import { HomeIconFilled, HomeIconOutline } from "../../assets/icons/HomeIcon";
import AddMeetingScreen from "../screens/addMeetingScreen/addMeetingScreen";
import { AddIconFilled, AddIconOutline } from "../../assets/icons/AddMeetingIcon";
import { ProfileIconFilled, ProfileIconOutline } from "../../assets/icons/ProfileIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackParams, LoginStackParams, ProfileStackParams, RootStackParams } from "../core/navigation/types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/logInScreen/loginScreen";
import SignUpScreen from "../screens/signUpScreen/signUpScreen";
import { SearchMeetingScreen } from "../screens/searchMeetingScreen/searchMeetingScreen";
import { ProfileScreen } from "../screens/profileScreen/profileScreen";
import { MeetingNotesScreen } from "../screens/meetingNotesScreen/meetingNotesScreen";
import { EditUserInformationScreen } from "../screens/editUserInformationScreen/editUserInformationScreen";

const RootStack = createBottomTabNavigator<RootStackParams>();
const HomeStack = createNativeStackNavigator<HomeStackParams>();
const LoginStack = createNativeStackNavigator<LoginStackParams>();
const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

const LoginScreenStack = () => {
  return (
    <LoginStack.Navigator initialRouteName={"Login"}>
      <LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="SignUp" component={SignUpScreen} options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.background["500"]
        },
        headerTintColor: "white",
        title: ""
      }} />
    </LoginStack.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator initialRouteName={"Home"}>
      <HomeStack.Screen
        name="Home" component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SearchMeeting" component={SearchMeetingScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProfileStack" component={ProfileScreen}
        options={{ headerShown: false }}
      />

    </HomeStack.Navigator>
  );
};

const ProfileScreenStack = () => {
  return (
    <ProfileStack.Navigator initialRouteName={"Profile"}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen}
                           options={{
                             headerShown: false
                           }}
      />
      <ProfileStack.Screen name="Notes" component={MeetingNotesScreen}
                           options={{
                             headerShown: false
                           }}
      />
      <ProfileStack.Screen name="EditUserInformation" component={EditUserInformationScreen}
                           options={{
                             headerShown: false
                           }}
      />
    </ProfileStack.Navigator>
  );
};

export const Layout = () => {
  const { authState } = useAuth();
  const loginStack = <RootStack.Screen name="LoginStack" component={LoginScreenStack} options={{
    tabBarIcon: ({ size, focused }) => (
      focused
        ? (<ProfileIconFilled />)
        : (<ProfileIconOutline />)),
    tabBarShowLabel: false
  }}
  />;

  const defaultTabBarStyle = {
    backgroundColor: COLORS.background["500"],
    borderTopWidth: undefined,
    paddingVertical: 8
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={"HomeStack"} screenOptions={{
        headerShown: false,
        tabBarStyle: defaultTabBarStyle,
        tabBarHideOnKeyboard: true
      }}>
        <RootStack.Screen name="HomeStack" component={HomeScreenStack}
                          options={({ route }) => ({
                            tabBarStyle: {
                              ...defaultTabBarStyle,
                              display: getFocusedRouteNameFromRoute(route) === "SearchMeeting" ? "none" : "flex"
                            },
                            tabBarIcon: ({ focused }) => (
                              focused
                                ? (<HomeIconFilled />)
                                : (<HomeIconOutline />)),
                            tabBarShowLabel: false
                          })}
        />
        {
          authState?.authenticated ?
            <RootStack.Screen name="AddMeeting" component={AddMeetingScreen} options={{
              tabBarIcon: ({ focused }) => (
                focused
                  ? (<AddIconFilled />)
                  : (<AddIconOutline />)),
              tabBarShowLabel: false
            }}
            /> : undefined
        }
        {
          authState?.authenticated ?
            <RootStack.Screen name="MyProfile" component={ProfileScreenStack}
                              options={({ route }) => ({
                                tabBarIcon: ({ size, focused }) => (
                                  focused
                                    ? (<ProfileIconFilled />)
                                    : (<ProfileIconOutline />)),
                                tabBarShowLabel: false
                              })}
            /> : loginStack
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
