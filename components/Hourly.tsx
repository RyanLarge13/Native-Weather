import React, { RefObject } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { HourlyWeatherType } from "@/types";

export default function Hourly({
  hour,
  currentHour,
  hourScrollRef,
}: {
  hour: HourlyWeatherType;
  currentHour: number;
  hourScrollRef: RefObject<ScrollView | null>;
}) {
  const timeString = new Date(hour.time);
  const displayTime = timeString.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
  const militaryTime = Number(
    timeString.toLocaleTimeString("en-US", {
      hourCycle: "h24",
      hour12: false,
      hour: "numeric",
    })
  );

  const isCurrentTime = militaryTime === currentHour;

  return (
    <View
      onLayout={(event) => {
        if (isCurrentTime && hourScrollRef.current) {
          const { x } = event.nativeEvent.layout;
          hourScrollRef.current.scrollTo({ x: x - 150, animated: true });
        }
      }}
      className="rounded-3xl p-5 relative mx-3"
    >
      <View
        className={`absolute inset-0 rounded-3xl bg-white ${isCurrentTime ? "opacity-60" : "opacity-30"}`}
      ></View>
      <Text>{isCurrentTime ? "Now" : displayTime}</Text>
      <Image
        source={hour.icon || require("../assets/images/icons/default.png")}
        className="h-[45px] aspect-square"
        resizeMode="cover"
      />
      <Text className="mt-1">{hour.temp}℉</Text>
    </View>
  );
}
