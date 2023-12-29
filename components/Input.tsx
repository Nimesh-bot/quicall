import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  isError?: boolean;
  errorMessage?: string;
  [key: string]: any;
  checked?: boolean;
}

const Input = ({ label, isError, ...props }: InputProps) => {
  return (
    <View>
      <Text className="mb-sm">{label}</Text>
      <TextInput
        className={`w-full py-lg px-default rounded-md font-bold bg-neutral_white dark:bg-neutral_black ${
          isError ? "border border-danger outline" : ""
        }}`}
        {...props}
      />
      {isError && (
        <Text className="text-danger mt-sm">{props.errorMessage}</Text>
      )}
    </View>
  );
};

const CheckBoxInput = ({ label, checked, ...props }: InputProps) => {
  return (
    <View className="flex flex-row items-center">
      <Pressable
        className={`w-6 h-6 rounded-sm mr-sm ${
          checked ? "border-none bg-primary" : "border bg-white border-faded"
        }`}
        {...props}
      ></Pressable>
      <Text className="text-lg font-medium">{label}</Text>
    </View>
  );
};

export { CheckBoxInput, Input };
