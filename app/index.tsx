import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { axiosInstance } from "../utils/axiosConfig";
import { transformResponse } from "../utils/helper/transformResponseData";

const CustomSplashScreen = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem("savedPhone");
        if (value !== null) {
          const res = await axiosInstance.get("/staffs");
          const response = transformResponse(res);
          if (response?.data?.some((staff: any) => staff.contact === value)) {
            router.replace("/(contacts)/list");
          }
        } else {
          router.replace("/verify");
        }
      } catch (e) {
        router.replace("/verify");
      }
    };

    setTimeout(() => {
      checkUser();
    }, 1500);
  }, []);

  return (
    <View className="w-full h-full flex flex-col justify-center items-center">
      <ActivityIndicator size="large" color="#141415" />
      <Text className="text-xl mt-2 font-bold">Please Wait</Text>
      <Text className="text-lg opacity-60">
        We are checking for your credentials
      </Text>
    </View>
  );
};

export default CustomSplashScreen;
