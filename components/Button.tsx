import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  additionalClass?: string;
  [key: string]: any;
}

const PrimaryButton = ({
  children,
  loading,
  additionalClass,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={loading}
      className={`bg-dark dark:bg-light py-xl rounded-md ${additionalClass}`}
      {...props}
    >
      <Text className="text-light dark:text-dark font-bold text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const FlatButtonText = ({
  children,
  loading,
  additionalClass,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={loading}
      className={`bg-transparent rounded-md ${additionalClass}`}
      {...props}
    >
      <Text className="text-dark dark:text-light font-bold text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { FlatButtonText, PrimaryButton };
