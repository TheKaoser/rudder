import { useState, useEffect } from "react";
import { getCachedData, setCachedData } from "../saveData";
import { router } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const useNewActivity = (id) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFuture, setIsFuture] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longerThanADay, setLongerThanADay] = useState(false);

  useEffect(() => {
    if (id) {
      const getActivities = async () => {
        const activities = await getCachedData("activities");
        if (activities) {
          const parsedActivities = JSON.parse(activities);
          const activity = parsedActivities.filter((a) => a.id === id)[0];
          if (activity) {
            setCurrentDate(new Date(activity.startDate));
            setEndDate(new Date(activity.endDate));
            setIsFuture(activity.isFuture);
            setTitle(activity.title);
            setDescription(activity.description);
            setLongerThanADay(activity.longerThanADay);
          }
        }
      };
      getActivities();
    }
  }, []);

  const saveActivity = async () => {
    const newActivity = {
      title: title,
      description: description,
      isFuture: isFuture,
      startDate: currentDate,
      endDate: endDate,
      id: id || uuidv4(),
    };

    const cachedActivities = await getCachedData("activities");
    if (!cachedActivities) {
      await setCachedData("activities", JSON.stringify([newActivity]));
    } else {
      const parsedActivities = JSON.parse(cachedActivities);
      const activity = parsedActivities.filter((a) => a.id === id)[0];
      if (activity) {
        activityIndex = parsedActivities.indexOf(activity);
        parsedActivities[activityIndex] = newActivity;
      } else {
        parsedActivities.push(newActivity);
      }
      await setCachedData("activities", JSON.stringify(parsedActivities));
    }
    router.push({ pathname: "/", params: { tab: "activities" } });
  };

  return {
    saveActivity,
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
