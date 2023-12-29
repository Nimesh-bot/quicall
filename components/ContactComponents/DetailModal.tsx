import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { ITransformedResponse } from "../../@types/responseFromApi";
import { MailIcon, PhoneIcon } from "../../assets/icons/svg-icons";

interface DetailModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITransformedResponse | null;
}

const DetailModal = ({
  isModalVisible,
  setIsModalVisible,
  data,
}: DetailModalProps) => {
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
        justifyContent: "flex-end",
        margin: 0,
      }}
      animationInTiming={900}
      animationOutTiming={500}
    >
      <View className="w-full flex flex-col justify-center items-center bg-neutral_white dark:bg-neutral_black rounded-t-md">
        <View className="w-16 rounded-full h-2 bg-dark dark:bg-light my-lg" />
        <View className="my-xl">
          <Text className="text-2xl font-bold text-center text-dark dark:text-light">
            {data?.name}
          </Text>
          <Text className="text-lg text-center opacity-60 text-dark dark:text-light">
            {data?.username}
          </Text>
        </View>

        <View className="flex-row items-center mt-xl mb-2xl">
          <TouchableOpacity
            className="mx-xl p-default rounded-md bg-green-100"
            onPress={() => {
              Linking.openURL(`tel:${data?.contact}`);
            }}
          >
            <PhoneIcon size={32} color="#59C9A5" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-xl p-default rounded-md bg-green-100"
            onPress={() => {
              Linking.openURL(`mailto:${data?.email}`);
            }}
          >
            <MailIcon size={32} color="#59C9A5" />
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default DetailModal;
