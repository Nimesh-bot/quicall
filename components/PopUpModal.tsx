import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { FlatButtonText, PrimaryButton } from "./Button";

interface PopUpModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
}

const PopUpModal = ({
  isModalVisible,
  setIsModalVisible,
  title,
  text,
}: PopUpModalProps) => {
  const logoutUser = () => {
    router.replace("/verify");
    AsyncStorage.removeItem("savedPhone");
    setIsModalVisible(false);
  };

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onBackButtonPress={() => setIsModalVisible(false)}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      swipeDirection="down"
      onSwipeComplete={() => setIsModalVisible(false)}
      backdropOpacity={0.5}
      backdropColor="#141415"
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
      }}
      animationInTiming={900}
      animationOutTiming={500}
    >
      <View className="w-full flex flex-col justify-center items-center bg-neutral_white dark:bg-neutral_black rounded-md">
        <Text className="text-2xl font-bold mt-2xl">{title}</Text>
        <Text className="text-lg opacity-60 mt-sm mb-2xl">{text}</Text>
        <View className="flex-row items-center mt-xl mb-2xl px-3xl">
          <PrimaryButton
            additionalClass="bg-danger flex-1"
            onPress={logoutUser}
          >
            Logout
          </PrimaryButton>
          <FlatButtonText
            additionalClass="flex-1"
            onPress={() => setIsModalVisible(false)}
          >
            Cancel
          </FlatButtonText>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default PopUpModal;
