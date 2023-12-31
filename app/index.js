import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 justify-between bg-gray-800">
      <Text>Home</Text>
      <TouchableOpacity
        className="w-16 h-16 items-center justify-center bg-green-400 rounded-full self-end m-6"
        onPress={() => {
          router.push("/activity");
        }}
      >
        <Text className="text-3xl font-black text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
