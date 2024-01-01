import { useState } from "react";
import { getCachedData, setCachedData } from "../saveData";
import { router } from "expo-router";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export const useNewActivity = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFuture, setIsFuture] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longerThanADay, setLongerThanADay] = useState(false);

  const save = async () => {
    const newActivity = {
      title: title,
      description: description,
      isFuture: isFuture,
      startDate: currentDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      id: uuidv4(),
    };

    const cachedActivities = await getCachedData("activities");
    if (!cachedActivities) {
      await setCachedData("activities", JSON.stringify([newActivity]));
      router.push("/");
      return;
    }
    const parsedActivities = JSON.parse(cachedActivities);
    parsedActivities.push(newActivity);
    await setCachedData("activities", JSON.stringify(parsedActivities));
    router.push("/");
  };

  return {
    save,
    currentDate,
    setCurrentDate,
    endDate,
    setEndDate,
    isFuture,
    setIsFuture,
    title,
    setTitle,
    description,
    setDescription,
    longerThanADay,
    setLongerThanADay,
  };
};
