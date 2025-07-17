import React from "react";
import { Image, Text, View } from "react-native";

import { CurrentWeatherType, LocationType } from "@/types";

const Today = ({
  currentWeather,
  location,
}: {
  currentWeather: CurrentWeatherType;
  location: LocationType;
}) => {
  return (
    <View>
      <Text className="text-5xl">{location.city},</Text>
      <Text className="text-5xl">{location.state}</Text>
      <Text className="text-black opacity-30 mt-5">
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Text>
      <View className="flex-row justify-between items-center">
        <Image
          source={
            currentWeather.weatherCode.icon ||
            require("../assets/images/icons/default.png")
          }
          className="mt-5 w-[50%] aspect-square"
          resizeMode="cover"
        />
        <View className="w-[50%] justify-center items-center">
          <View className="flex-row mt-10">
            <Text className="text-7xl font-bold">{currentWeather.temp}</Text>
            <Text className="text-sm font-bold">℉</Text>
          </View>
          <Text className="text-4xl">{currentWeather.weatherCode.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default Today;
