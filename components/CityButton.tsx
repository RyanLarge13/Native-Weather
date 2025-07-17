import * as SQLite from "expo-sqlite";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";

const CityButton = ({
  city,
  setMyCities,
}: {
  city: {
    id: string;
    name: string;
    lat: number;
    lon: number;
  };
  setMyCities: Dispatch<
    SetStateAction<
      {
        id: string;
        name: string;
        lat: number;
        lon: number;
      }[]
    >
  >;
}) => {
  const M_AddCity = async () => {
    const db = await SQLite.openDatabaseAsync("myApp.db");

    if (db) {
      console.log(city);
      try {
        await db.runAsync(
          `
              INSERT INTO Locations (id, name, lastUsed)
              VALUES (?, ?, ?);
          `,
          [city.id, city.name, new Date().toISOString]
        );

        setMyCities((prev) => [...prev, city]);
      } catch (err) {
        console.log(`Error updating location in db. Error: ${err}`);
      }
    }
  };

  return (
    <Pressable onPress={M_AddCity} className="p-5 relative">
      <View className="bg-white absolute inset-0 opacity-25 rounded-lg my-1"></View>
      <Text className="text-2xl">{city.name}</Text>
    </Pressable>
  );
};

export default CityButton;
