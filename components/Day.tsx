import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { DayWeatherType } from "@/types";

const Day = ({
  dw,
  expanded,
  setExpandedDay,
}: {
  dw: DayWeatherType;
  expanded: number;
  setExpandedDay: Dispatch<SetStateAction<number>>;
}) => {
  const { index, weekDay, temp, icon, rainfall, precipitation, windspeed } = dw;

  const handlePress = () => {
    setExpandedDay(index);
  };

  return expanded === index ? (
    <Pressable
      onPress={handlePress}
      className="rounded-3xl p-5 relative mx-5 mt-1 mb-1"
    >
      <View className="absolute inset-0 rounded-3xl bg-white opacity-60"></View>

      <View className="flex-row justify-between items-center">
        <Text>{weekDay}</Text>
        <View className="justify-center items-center flex-row">
          <Text className="text-sm">{temp}</Text>
          <Text className="text-xs ml-1 mb-3">℉</Text>
          <Image
            source={icon || require("../assets/images/icons/default.png")}
            className="w-[85px] aspect-square"
            resizeMode="cover" // or "cover", "stretch", etc.
          />
        </View>
      </View>

      <View className="mb-5 mt-3 flex-row justify-evenly items-center">
        <View className="justify-center items-center">
          <Image
            source={require("../assets/images/icons/rainy-with-bg.png")}
            className="h-[50px] aspect-square rounded-2xl"
            resizeMode="cover"
          />
          <Text className="text-sm mt-2">{rainfall} Inch</Text>
        </View>
        <View className="justify-center items-center">
          <Image
            source={require("../assets/images/icons/windy-with-bg.png")}
            className="h-[50px] aspect-square rounded-2xl"
            resizeMode="cover"
          />
          <Text className="text-sm mt-2">{windspeed} mph</Text>
        </View>
        <View className="justify-center items-center">
          <Image
            source={require("../assets/images/icons/rainy-with-bg-umbrella.png")}
            className="h-[50px] aspect-square rounded-2xl"
            resizeMode="cover"
          />
          <Text className="text-sm mt-2">{precipitation}%</Text>
        </View>
      </View>
    </Pressable>
  ) : (
    <Pressable onPress={handlePress} className="mx-5">
      <View className="bg-transparent relative my-1 py-5 px-6 flex-row justify-between items-center">
        <View className="absolute inset-0 bg-white opacity-25 z-0 rounded-3xl"></View>
        <Text className="opacity-50">{weekDay}</Text>

        <View className="flex-row justify-center items-center">
          <Text className="mr-5">{temp}°</Text>
          <Image
            source={icon || require("../assets/images/icons/default.png")}
            className="w-[50px] rounded-2xl mr-3 aspect-square"
            resizeMode="cover"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Day;
