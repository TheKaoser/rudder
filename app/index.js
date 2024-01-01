import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { getCachedData, removeCachedData } from "../saveData";

const App = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const getActivities = async () => {
      const activities = await getCachedData("activities");
      if (activities) {
        console.log(JSON.parse(activities));
        console.log("activities: " + activities);
        setActivities(JSON.parse(activities));
      }
    };
    getActivities();
    // removeCachedData("activities");
  }, []);

  return (
    <View className="flex-1 justify-between bg-gray-800">
      <ScrollView className="pt-6">
        {activities.map((activity, i) => (
          <Activity activity={activity} key={i} />
        ))}
      </ScrollView>
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

const Activity = ({ activity }) => (
  <View className="border flex-row justify-between p-2 bg-yellow-700 w-11/12 mx-auto rounded-xl mt-2">
    <Text className="text-white font-bold">{activity.title}</Text>
    <Text className="text-white ">{activity.startDate}</Text>
  </View>
);

export default App;
