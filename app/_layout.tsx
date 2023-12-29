import { Stack } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { LogoutIcon } from "../assets/icons/svg-icons";
import PopUpModal from "../components/PopUpModal";

const RootLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: "Home",
          }}
        />
        <Stack.Screen
          name="verify"
          options={{
            headerShown: false,
            headerTitle: "Verify",
          }}
        />
        <Stack.Screen
          name="(contacts)/list"
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: "Contacts",
            headerBackButtonMenuEnabled: false,
            headerRight(props) {
              return (
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(true);
                    }}
                  >
                    <LogoutIcon size={21} color="#F44336" />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
      </Stack>

      <PopUpModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Logout"
        text="Are you sure you want to logout?"
      />
    </>
  );
};

export default RootLayout;
