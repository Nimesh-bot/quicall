import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ITransformedResponse } from "../../@types/responseFromApi";
import { FlatButtonText } from "../../components/Button";
import DetailModal from "../../components/ContactComponents/DetailModal";
import { axiosInstance } from "../../utils/axiosConfig";
import { transformResponse } from "../../utils/helper/transformResponseData";

export interface IListItem {
  item: ITransformedResponse;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedItem: Dispatch<SetStateAction<ITransformedResponse | null>>;
}

const ContactList = () => {
  const screenHeight = Dimensions.get("window").height;

  const [data, setData] = useState<ITransformedResponse[] | any>(
    ([] as ITransformedResponse[]) || null
  );
  const [filteredData, setFilteredData] = useState<
    ITransformedResponse[] | any
  >([]);

  const [alphabet, setAlphabet] = useState<string[]>([]);
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ITransformedResponse | null>(
    null
  );

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await axiosInstance.get("/staffs");
        const response = transformResponse(res);
        const sortedData = response?.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (e) {
        console.error("error -===>", e);
      }
    };

    getContacts();
  }, []);

  useEffect(() => {
    setLoading(data.length > 0 ? false : true);
  }, [data]);

  useEffect(() => {
    const alphabets = [];
    const startCharCode = "A".charCodeAt(0); // Use 'a' for lowercase

    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(startCharCode + i);
      alphabets.push(letter);
    }
    setAlphabet(alphabets);
  }, []);

  const filterByAlphabet = (alphabet: string) => {
    setSelectedAlphabet(alphabet);
    const filter = filteredData.filter((item: ITransformedResponse) => {
      return item.name?.charAt(0) === alphabet;
    });
    const remainingData = filteredData.filter((item: ITransformedResponse) => {
      return item.name?.charAt(0) !== alphabet;
    });
    setFilteredData([...filter, ...remainingData]);
  };

  if (loading)
    return (
      <>
        <SafeAreaView>
          <View className="w-full h-full flex flex-col justify-center items-center">
            <ActivityIndicator size="large" color="#141415" />
            <Text className="text-xl mt-2 font-bold">Please Wait</Text>
            <Text className="text-lg opacity-60">
              We are fetching your contacts
            </Text>
          </View>
        </SafeAreaView>
      </>
    );

  return (
    <>
      <DetailModal
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}
        data={selectedItem}
      />
      <SafeAreaView>
        <View className="flex-row">
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <Item
                item={item}
                setModalVisible={setModalVisible}
                setSelectedItem={setSelectedItem}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View className="h-screen flex-col items-center justify-center">
                <Text className="text-center text-lg opacity-60 my-xl">
                  No contacts found
                </Text>
                <FlatButtonText
                  onPress={() => {
                    setData(data);
                    setFilteredData(data);
                  }}
                >
                  Reset Filter
                </FlatButtonText>
              </View>
            )}
          />
          <View
            className={`w-6 h-screen ml-default flex-col justify-between items-center`}
          >
            {selectedAlphabet !== "" && (
              <Text
                className="text-xs opacity-75 font-medium"
                onPress={() => {
                  setData(data);
                  setFilteredData(data);
                  setSelectedAlphabet("");
                }}
              ></Text>
            )}
            <FlatList
              data={alphabet}
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                height: screenHeight - 40,
                paddingBottom: 20,
                marginRight: 10,
              }}
              renderItem={({ item }) => (
                <Text
                  className="text-default opacity-75 font-medium"
                  onPress={() => filterByAlphabet(item)}
                >
                  {item}
                </Text>
              )}
              keyExtractor={(item) => item}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const Item = ({ item, setModalVisible, setSelectedItem }: IListItem) => {
  return (
    <TouchableOpacity
      className="flex flex-row items-center px-2xl py-xl mb-sm bg-neutral_white rounded-md"
      onPress={() => {
        setModalVisible(true);
        setSelectedItem(item);
      }}
    >
      <Text className="text-2xl mr-lg font-bold">{item?.name?.charAt(0)}</Text>
      <View className="flex flex-col">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-sm">{item?.contact}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactList;
