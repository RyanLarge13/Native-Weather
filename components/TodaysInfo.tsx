import React from "react";
import { Image, Text, View } from "react-native";

export default function TodaysInfo({
  rainfall,
  windSpeed,
  humidity,
}: {
  rainfall: number;
  windSpeed: number;
  humidity: number;
}) {
  return (
    <View className="mt-5">
      <View className="bg-transparent relative my-1 py-5 px-6 flex-row justify-between items-center">
        <View className="absolute inset-0 bg-white opacity-25 z-0 rounded-3xl"></View>
        <View className="flex-row justify-center items-center">
          <Image
            source={require("../assets/images/icons/rainy-with-bg.png")}
            className="w-[50px] rounded-2xl mr-3 aspect-square"
            resizeMode="cover"
          />
          <Text className="opacity-50">Rainfall</Text>
        </View>
        <Text className="mr-5">{rainfall}in</Text>
      </View>
      <View className="bg-transparent relative my-1 py-5 px-6 flex-row justify-between items-center">
        <View className="absolute inset-0 bg-white opacity-25 z-0 rounded-3xl"></View>
        <View className="flex-row justify-center items-center">
          <Image
            source={require("../assets/images/icons/windy-with-bg.png")}
            className="w-[50px] rounded-2xl mr-3 aspect-square"
            resizeMode="cover"
          />
          <Text className="opacity-50">Wind</Text>
        </View>
        <Text className="mr-5">{windSpeed}mph</Text>
      </View>
      <View className="bg-transparent relative my-1 py-5 px-6 flex-row justify-between items-center">
        <View className="absolute inset-0 bg-white opacity-25 z-0 rounded-3xl"></View>
        <View className="flex-row justify-center items-center">
          <Image
            source={require("../assets/images/icons/rainy-with-bg-umbrella.png")}
            className="w-[50px] rounded-2xl mr-3 aspect-square"
            resizeMode="cover"
          />
          <Text className="opacity-50">Humidity</Text>
        </View>
        <Text className="mr-5">{humidity}%</Text>
      </View>
    </View>
  );
}
