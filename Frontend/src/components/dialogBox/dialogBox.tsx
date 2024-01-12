import { StyleSheet, View } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import Dialog from "react-native-dialog";
import { COLORS } from "../../styles";

type Props = {
  title: string,
  description: string,
  label: string,
  children: ReactNode;
  onDialogVisible: (isVisible: boolean) => void;
  isVisible: boolean;
  onPress: () => void;
}
export const DialogBox = ({ title, description, label, children, onDialogVisible, isVisible, onPress }: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    setDialogVisible(isVisible);
  }, [isVisible]);

  return (
    <View>
      <Dialog.Container
        contentStyle={styles.container}
        visible={dialogVisible}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          {description}
        </Dialog.Description>
        <View>
          {children}
        </View>
        <Dialog.Button
          label="Wyjdź"
          color={COLORS.primary["300"]}
          onPress={() => {
            setDialogVisible(false);
            onDialogVisible(false);
          }} />
        <Dialog.Button
          label={label}
          color={COLORS.primary["300"]}
          onPress={onPress}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background["300"],
    borderRadius: 8
  }
});
