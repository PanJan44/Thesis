import * as Yup from "yup";

const reqMsg = "Pole jest wymagane";
export const signUpValidationSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email("Adres email jest niepoprawny")
      .required(reqMsg),

    password: Yup.string()
      .required(reqMsg)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, znak, i być długie na minimum 8 znaków"
      ),

    confirmedPassword: Yup.string()
      .required(reqMsg)
      .oneOf([Yup.ref("password")], "Hasła nie są takie same"),

    nickname: Yup.string()
      .required(reqMsg)
      .min(3, "Nick musi mieć conajmniej 3 znaki")
      .max(20)
  }
);

export const addMeetingValidationSchema = Yup.object().shape(
  {
    title: Yup.string()
      .required(reqMsg)
      .min(1, "Tytuł jest za krótki")
      .max(50),

    description: Yup.string()
      .max(200)
  }
);
