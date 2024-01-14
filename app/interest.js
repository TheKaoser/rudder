import { View, Text, TextInput, Switch, TouchableOpacity } from "react-native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNewInterest } from "../hooks/useNewInterest";
import { useLocalSearchParams } from "expo-router";
// import ColorPicker from "../components/colorPicker";

const Interest = () => {
  const { id } = useLocalSearchParams();
  const firstFieldRef = useRef(null);
  const [startDatePopup, setStartDatePopup] = useState(false);
  const [endDatePopup, setEndDatePopup] = useState(false);
  const {
    saveInterest,
    title,
    description,
    currentDate,
    setCurrentDate,
    endDate,
    setEndDate,
    isFuture,
    setIsFuture,
    setTitle,
    setDescription,
    longerThanADay,
    setLongerThanADay,
  } = useNewInterest(id);

  useEffect(() => {
    if (firstFieldRef.current) firstFieldRef.current.focus();
  }, [firstFieldRef]);

  return (
    <View className="bg-gray-800 flex-1 pt-6">
      <TouchableOpacity
        className="px-5 py-2 items-center justify-center bg-green-600 rounded-full self-end mr-4"
        onPress={saveInterest}
      >
        <Text className="text-white">Guardar</Text>
      </TouchableOpacity>
      {/* <ColorPicker></ColorPicker> */}
      <InterestField
        size="3xl"
        placeholder="Añade un título"
        ref={firstFieldRef}
        value={title}
        lines={2}
        onChangeText={setTitle}
      />
      <InterestField
        placeholder="Añade una descripción"
        name="document-text-outline"
        lines={4}
        value={description}
        onChangeText={setDescription}
      />
      <InterestFieldBoolean
        title="Interés futuro"
        setChecked={setIsFuture}
        checked={isFuture}
      />
      {!isFuture && (
        <>
          <SelectDate
            setOpen={setStartDatePopup}
            date={currentDate}
            title="Fecha inicio"
          />
          <InterestFieldBoolean
            title="Dura más de un día"
            setChecked={setLongerThanADay}
            checked={longerThanADay}
          />
        </>
      )}
      {longerThanADay && !isFuture && (
        <SelectDate setOpen={setEndDatePopup} date={endDate} title="Fecha fín" />
      )}
      {startDatePopup && (
        <DateTimePicker
          mode="date"
          value={currentDate}
          onChange={(event, date) => {
            setStartDatePopup(false);
            setCurrentDate(date);
          }}
        />
      )}
      {endDatePopup && (
        <DateTimePicker
          mode="date"
          value={currentDate}
          onChange={(event, date) => {
            setEndDatePopup(false);
            setEndDate(date);
          }}
        />
      )}
    </View>
  );
};

const SelectDate = ({ setOpen, date, title }) => (
  <View
    className="border-b border-gray-600 p-4 justify-center"
    onTouchEnd={() => setOpen(true)}
  >
    <Text className="text-gray-400 ml-9">{title}</Text>
    <View className="flex-row gap-2 items-center">
      <View className="w-1/12 items-center justify-center">
        <Ionicons name="calendar-outline" size={24} color="white" />
      </View>
      <Text className="text-white">{date.toLocaleDateString()}</Text>
    </View>
  </View>
);

const InterestField = forwardRef((props, ref) => (
  <View className="flex flex-row border-b border-gray-600 gap-2 p-4">
    <View className="w-1/12 items-center justify-center">
      <Ionicons name={props.name} size={24} color="white" />
    </View>
    <TextInput
      placeholder={props.placeholder}
      className={`rounded-md w-80 text-white text-${props.size} pr-10`}
      ref={ref}
      placeholderTextColor="#CCCCCC"
      multiline={true}
      value={props.value}
      numberOfLines={props.lines}
      onChangeText={props.onChangeText}
    />
  </View>
));

const InterestFieldBoolean = ({ title, setChecked, checked }) => (
  <View className="flex flex-row border-gray-600 gap-2 items-center px-4 ">
    <View className="w-1/12" />
    <View className="flex-row justify-between flex-1 items-center">
      <Text className="text-white">{title}</Text>
      <Switch onValueChange={setChecked} value={checked} />
    </View>
  </View>
);

export default Interest;
