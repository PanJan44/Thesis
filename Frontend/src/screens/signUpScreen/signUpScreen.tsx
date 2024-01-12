import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles";
import MyInput from "../../components/myInput/myInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../components/myButton/myButton";
import { signUpValidationSchema } from "../validation.schema";
import { useAuth } from "../../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParams } from "../../core/navigation/types/navigation.types";

type Props = NativeStackScreenProps<LoginStackParams, "SignUp">;
const SignUpScreen = ({ navigation }: Props) => {
  const defaultValues = { email: "", password: "", confirmedPassword: "", nickname: "" };
  const { register, setValue, handleSubmit, control, reset, formState: { errors, isValid, isDirty, touchedFields } }
    = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(signUpValidationSchema),
      defaultValues
    }
  );

  const { onRegister, onLogin } = useAuth();

  interface SignUpData {
    email: string;
    password: string;
    confirmedPassword: string;
    nickname: string;
  }

  const onSubmit = async (data: SignUpData) => {
    const signUpResult = await onRegister!(data.email, data.password, data.confirmedPassword, data.nickname);
    if (!signUpResult.error) {
      const loginResult = onLogin!(data.email, data.password);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../../assets/images/logoFull.png")}
          style={styles.logoImage}
        />
        <Text style={styles.title}>utwórz konto</Text>
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
        </View>
        <View style={{ marginBottom: 10 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MyInput
                placeholder={"Ksywa"}
                onChangeText={value => onChange(value)}
              />
            )}
            name="nickname"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
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
        <View style={{ marginBottom: 20 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MyInput
                placeholder={"Powtórz swoje hasło"}
                onChangeText={value => onChange(value)}
                secureTextEntry
              />
            )}
            name="confirmedPassword"
          />
        </View>
      </View>
      <View style={{ width: "60%" }}>
        <MyButton
          disabled={!isDirty || !isValid}
          title="Zarejestruj się"
          onPress={handleSubmit(onSubmit)}
          backgroundColor={COLORS.primary["300"]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background["500"]
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
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: {
    width: "60%"
  }
});

export default SignUpScreen;
