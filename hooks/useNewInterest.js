import { useState, useEffect } from "react";
import { getCachedData, setCachedData } from "../saveData";
import { router } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const useNewInterest = (id) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFuture, setIsFuture] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longerThanADay, setLongerThanADay] = useState(false);

  useEffect(() => {
    if (id) {
      const getInterests = async () => {
        const interests = await getCachedData("interests");
        if (interests) {
          const parsedInterests = JSON.parse(interests);
          const interest = parsedInterests.filter((a) => a.id === id)[0];
          if (interest) {
            setCurrentDate(new Date(interest.startDate));
            setEndDate(new Date(interest.endDate));
            setIsFuture(interest.isFuture);
            setTitle(interest.title);
            setDescription(interest.description);
            setLongerThanADay(interest.longerThanADay);
          }
        }
      };
      getInterests();
    }
  }, []);

  const saveInterest = async () => {
    const newInterest = {
      title: title,
      description: description,
      isFuture: isFuture,
      startDate: currentDate,
      endDate: endDate,
      id: id || uuidv4(),
    };

    const cachedInterests = await getCachedData("interests");
    if (!cachedInterests) {
      await setCachedData("interests", JSON.stringify([newInterest]));
    } else {
      const parsedInterests = JSON.parse(cachedInterests);
      const interest = parsedInterests.filter((a) => a.id === id)[0];
      if (interest) {
        interestIndex = parsedInterests.indexOf(interest);
        parsedInterests[interestIndex] = newInterest;
      } else {
        parsedInterests.push(newInterest);
      }
      await setCachedData("interests", JSON.stringify(parsedInterests));
    }
    router.push({ pathname: "/", params: { tab: "interests" } });
  };

  return {
    saveInterest,
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
