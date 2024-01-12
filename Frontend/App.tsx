import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { AuthProvider } from "./src/context/AuthContext";
import { Layout } from "./src/layouts/layout";
import { MenuProvider } from "react-native-popup-menu";

function App() {
  navigator.geolocation = require("@react-native-community/geolocation");

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <MenuProvider>
        <Layout />
      </MenuProvider>
    </AuthProvider>
  );
}


export default App;
