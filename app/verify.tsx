import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { PrimaryButton } from "../components/Button";
import { CheckBoxInput, Input } from "../components/Input";
import { axiosInstance } from "../utils/axiosConfig";
import { transformResponse } from "../utils/helper/transformResponseData";

const Verify = () => {
  const [phone, setPhone] = useState("");
  const [willRemember, setWillRemember] = useState<boolean>(false);
  const [error, setError] = useState({
    message: "",
    isError: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      if (phone.length < 10) {
        setError({
          isError: true,
          message: "Phone number is not valid",
        });
        return;
      }
      const res = await axiosInstance.get("/staffs");
      const response = transformResponse(res);
      if (response?.data?.some((staff: any) => staff.contact === phone)) {
        if (willRemember) {
          await AsyncStorage.setItem("savedPhone", phone);
        }
        router.replace("/(contacts)/list");
      } else {
        setError({
          isError: true,
          message: "Phone number is not registered",
        });
      }
    } catch (e) {
      console.error("error -===>", e);
      setError({
        isError: true,
        message: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="w-full h-full py-4xl px-default flex flex-col">
        <Text className="text-2xl font-bold">Verify Yourself</Text>
        <Text className="opacity-60 mt-sm">
          Please enter the number you have been registered from so that we can
          verify your access.
        </Text>
        <View className="my-2xl">
          <Input
            label="Phone Number"
            keyboardType={"number-pad"}
            isError={error.isError}
            errorMessage={error.message}
            value={phone}
            onChangeText={(text: string) => {
              setError({
                isError: false,
                message: "",
              });
              setPhone(text);
            }}
          />
          <View className="mt-xl">
            <CheckBoxInput
              label="Remember me"
              checked={willRemember}
              onPress={() => setWillRemember(!willRemember)}
            />
          </View>
        </View>

        <PrimaryButton onPress={handleVerify} loading={loading}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : "Verify"}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

export default Verify;
