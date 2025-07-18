import * as SQLite from "expo-sqlite";
import React from "react";
import { Pressable, Text, View } from "react-native";

const MyCity = ({
  city,
}: {
  city: {
    id: string;
    name: string;
    lat: number;
    lon: number;
  };
}) => {
  const M_UpdateMyCity = async () => {
    const db = await SQLite.openDatabaseAsync("myApp.db");

    if (db) {
      try {
        await db.runAsync(
          `
              UPDATE Locations
              SET lastused = datetime('now')
              WHERE id = ?;
          `,
          [city.id]
        );
      } catch (err) {
        console.log(`Error updating location in db. Error: ${err}`);
      }
    }
  };

  return (
    <Pressable onPress={M_UpdateMyCity} className="p-5 relative">
      <View className="bg-white absolute inset-0 opacity-50 rounded-lg my-1"></View>
      <Text className="text-2xl">{city.name}</Text>
    </Pressable>
  );
};

export default MyCity;
