import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";

import { useTabAnimation } from "@/hooks/useTabAnimation";
import { Picker } from "@react-native-picker/picker"; // install if not yet

const cityList = ["New York", "London", "Tokyo", "Toronto", "Sydney"];

const Settings = () => {
  const animate = useTabAnimation();

  const [temperatureUnit, setTemperatureUnit] = useState<
    "Celsius" | "Fahrenheit"
  >("Celsius");
  const [theme, setTheme] = useState<"Orange" | "Blue" | "Red" | "Purple">(
    "Orange"
  );
  const [preferredCity, setPreferredCity] = useState<string>("Location");
  const [accuracy, setAccuracy] = useState<boolean>(false);
  const [notificationInterval, setNotificationInterval] = useState<
    "30 Minutes" | "1 Hour" | "3 Hours" | "1 Day"
  >("1 Hour");

  return (
    <LinearGradient
      colors={["#fff7ed", "#fb923c"]}
      start={{ x: -0.5, y: -0.5 }}
      end={{ x: 0.75, y: 0.75 }}
      className="h-full p-8"
    >
      <MotiView
        from={{ opacity: 0, translateX: -100 }}
        animate={
          animate
            ? { opacity: 1, translateX: 0 }
            : { opacity: 0, translateX: -100 }
        }
        transition={{ type: "spring", duration: 500, stiffness: 200 }}
      >
        <ScrollView className="px-4 py-10" showsVerticalScrollIndicator={false}>
          <Text className="text-6xl font-bold text-black mt-5 mb-6">
            Settings
          </Text>

          {/* Temperature Unit */}
          <View className="mb-20 mt-10">
            <Text className="text-lg text-black mb-2">Temperature Unit</Text>
            <View className="border border-gray-300 rounded-md overflow-hidden">
              <Picker
                selectedValue={temperatureUnit}
                onValueChange={(itemValue) => setTemperatureUnit(itemValue)}
              >
                <Picker.Item label="Celsius" value="Celsius" />
                <Picker.Item label="Fahrenheit" value="Fahrenheit" />
              </Picker>
            </View>
          </View>

          {/* Theme */}
          <View className="mb-20">
            <Text className="text-lg text-black mb-2">Theme</Text>
            <View className="border border-gray-300 rounded-md overflow-hidden">
              <Picker
                selectedValue={theme}
                onValueChange={(itemValue) => setTheme(itemValue)}
              >
                <Picker.Item label="Orange" value="Orange" />
                <Picker.Item label="Blue" value="Blue" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Purple" value="Purple" />
              </Picker>
            </View>
          </View>

          {/* Preferred City */}
          <View className="mb-20">
            <Text className="text-lg text-black mb-2">Preferred City</Text>
            {/* <FlatList
              data={cityList}
              horizontal
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setPreferredCity(item)}>
                  <CityOption title={item} selected={preferredCity === item} />
                </TouchableOpacity>
              )}
            /> */}
            <Text className="text-sm text-gray-600 mt-2">
              Selected: {preferredCity}
            </Text>
          </View>

          {/* Accuracy */}
          <View className="flex-row justify-between items-center mb-20">
            <Text className="text-lg text-black">High Accuracy</Text>
            <Switch
              value={accuracy}
              onValueChange={setAccuracy}
              trackColor={{ false: "#ccc", true: "#f97316" }} // orange
              thumbColor={accuracy ? "#f97316" : "#fff"}
            />
          </View>

          {/* Notification Interval */}
          <View className="mb-20">
            <Text className="text-lg text-black mb-2">
              Notification Interval
            </Text>
            <View className="border border-gray-300 rounded-md overflow-hidden">
              <Picker
                selectedValue={notificationInterval}
                onValueChange={(itemValue) =>
                  setNotificationInterval(itemValue)
                }
              >
                <Picker.Item label="Every 30 Minutes" value="30 Minutes" />
                <Picker.Item label="Every 1 Hour" value="1 Hour" />
                <Picker.Item label="Every 3 Hours" value="3 Hours" />
                <Picker.Item label="Every 1 Day" value="1 Day" />
              </Picker>
            </View>
          </View>
        </ScrollView>
      </MotiView>
    </LinearGradient>
  );
};

export default Settings;
