import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../components/myButton/myButton";
import MyInput from "../../components/myInput/myInput";
import { LoginStackParams, RootStackParams } from "../../core/navigation/types/navigation.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../context/AuthContext";
import { CommonActions } from "@react-navigation/native";


const reqMsg = "Pole jest wymagane";
const loginSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email("Adres email jest niepoprawny")
      .required(reqMsg),

    password: Yup.string()
      .required(reqMsg)
  }
);

type Props = NativeStackScreenProps<LoginStackParams, "Login">;
const LoginScreen = ({ navigation }: Props) => {
  const defaultValues = { email: "", password: "" };
  const { register, setValue, handleSubmit, control, reset, formState: { errors, isValid, isDirty, touchedFields } }
    = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(loginSchema),
      defaultValues
    }
  );

  const { onLogin } = useAuth();

  interface LoginData {
    email: string;
    password: string;
  }

  const onSubmit = async (data: LoginData) => {
    const loginResult = await onLogin!(data.email, data.password);
    if (loginResult && loginResult.error) {
      Alert.alert(loginResult.msg);
      return;
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }]
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../../assets/images/logoFull.png")}
          style={styles.logoImage}
        />
        <Text style={[styles.title]}>zaloguj się</Text>
      </View>
      <View style={styles.inputWrapper}>
        <View style={{ marginBottom: 10 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MyInput
                placeholder={"Email"}
                onChangeText={value => onChange(value)}
              />
            )}
            name="email"
          />
          {
            errors.email && (
              <Text style={{ color: COLORS.error["100"], padding: undefined }}>
                {errors.email.message}
              </Text>)
          }
        </View>
        <View style={{ marginBottom: 20 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MyInput
                placeholder={"Hasło"}
                onChangeText={value => onChange(value)}
                secureTextEntry
              />
            )}
            name="password"
          />
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <View style={{ flex: 2 }}>
          <MyButton
            title="Zarejestruj"
            backgroundColor={COLORS.background["500"]}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MyButton
            disabled={!isDirty || !isValid}
            title="Zaloguj"
            onPress={handleSubmit(onSubmit)}
            backgroundColor={COLORS.primary["300"]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background["500"],
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  logoImage: {
    width: 300,
    height: 200
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.primary.bolder,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase"
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    paddingVertical: 20
  },
  inputWrapper: {
    width: "60%"
  }
});

export default LoginScreen;
