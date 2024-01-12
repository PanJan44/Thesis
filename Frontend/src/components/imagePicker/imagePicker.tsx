import { ReactNode, useState } from "react";
import { Button, Pressable, View } from "react-native";
import { ImagePickerResponse, launchImageLibrary, MediaType } from "react-native-image-picker";

type Props = {
  customElement: ReactNode;
  onSelectedImage: (selectedImage: ImagePickerResponse) => void;
}
const ImagePicker = ({ customElement, onSelectedImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResponse>();

  const openImagePicker = async () => {
    const options = {
      mediaType: "photo" as MediaType,
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel)
      return;

    setSelectedImage(result);
    onSelectedImage(result);
    console.log(result);
  };

  return (
    <View>
      {/*<Button title={"pick photo"} onPress={openImagePicker} />*/}
      <Pressable onPress={openImagePicker}>
        {customElement}
      </Pressable>
    </View>
  );
};

export default ImagePicker;
