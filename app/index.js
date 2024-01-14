import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { getCachedData, removeCachedData } from "../saveData";
import { roundToNearestPixel } from "nativewind";

const App = () => {
  const { tab } = useLocalSearchParams();
  const [activities, setActivities] = useState([]);
  const [interests, setInterests] = useState([]);
  const [currentTab, setCurrentTab] = useState("activities");
  useEffect(() => {
    if (tab) setCurrentTab(tab);
    const getActivities = async () => {
      const activities = await getCachedData("activities");
      if (activities) {
        setActivities(JSON.parse(activities));
      }
    };
    const getInterests = async () => {
      const interests = await getCachedData("interests");
      if (interests) {
        setInterests(JSON.parse(interests));
      }
    };
    getInterests();
    getActivities();

    // removeCachedData('activities');
    // removeCachedData('interests');
  }, [tab]);

  return (
    <View className="flex-1 justify-between bg-gray-800">
      <View className="w-full flex-row">
        <TouchableOpacity
          className={`bg-gray-${
            currentTab === "interests" ? 600 : 700
          } w-1/2 py-4`}
          onPress={() => setCurrentTab("interests")}
        >
          <Text className="text-center text-white">Interests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-${
            currentTab === "activities" ? 600 : 700
          } w-1/2 py-4`}
          onPress={() => setCurrentTab("activities")}
        >
          <Text className="text-center text-white">Activities</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="pt-6">
        {currentTab === "activities"
          ? activities.map((activity, i) => (
              <Activity activity={activity} key={i} />
            ))
          : interests.map((interest, i) => (
              <Interest interest={interest} key={i} />
            ))}
      </ScrollView>
      <TouchableOpacity
        className="w-16 h-16 items-center justify-center bg-green-400 rounded-full self-end m-6"
        onPress={() => {
          if (currentTab === "activities")
            router.push("/activity")
          else if (currentTab === "interests")
            router.push("/interest");
        }}
      >
        <Text className="text-3xl font-black text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Activity = ({ activity }) => (
  <TouchableOpacity
    className="border flex-row justify-between p-2 bg-yellow-700 w-11/12 mx-auto rounded-xl mt-2"
    onPress={() => {
      router.push({ pathname: "/activity", params: { id: activity.id } });
    }}
  >
    <Text className="text-white font-bold">{activity.title}</Text>
    <Text className="text-white ">
      {
        activity.isFuture == false ? new Date(activity.startDate).toLocaleDateString() : "Futura"
      }
    </Text>
  </TouchableOpacity>
);

const Interest = ({ interest }) => (
  <TouchableOpacity
    className="border flex-row justify-between p-2 bg-yellow-700 w-11/12 mx-auto rounded-xl mt-2"
    onPress={() => {
      router.push({ pathname: "/interest", params: { id: interest.id } });
    }}
  >
    <Text className="text-white font-bold">{interest.title}</Text>
    <Text className="text-white ">
      {
        interest.isFuture == false ? new Date(interest.startDate).toLocaleDateString() : "Futuro"
      }
    </Text>
  </TouchableOpacity>
);

export default App;
