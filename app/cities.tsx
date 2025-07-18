import { LinearGradient } from "expo-linear-gradient";
import * as SQLite from "expo-sqlite";
import { MotiView, View } from "moti";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput } from "react-native";
import uuid from "react-native-uuid";

import CityButton from "@/components/CityButton";
import MyCity from "@/components/MyCity";
import { useTabAnimation } from "@/hooks/useTabAnimation";

import citiesMap from "../assets/cities.json";

export default function Cities() {
  const animate = useTabAnimation();

  const [searchText, setSearchText] = useState<string>("");
  const [myCities, setMyCities] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
      lastUsed: Date;
    }[]
  >([]);
  const [searchedCities, setSearchedCities] = useState<
    {
      id: string;
      name: string;
      lat: number;
      lon: number;
    }[]
  >([]);

  let timeout: number = 0;

  useEffect(() => {
    clearTimeout(timeout);

    if (!searchText) {
      setSearchedCities([]);
      return;
    }

    timeout = setTimeout(() => {
      searchForCities();
    }, 1000);
  }, [searchText]);

  useEffect(() => {
    loadCitiesFromDB();
  }, []);

  const findClosestCities = () => {
    if (!searchText) {
      setSearchedCities([]);
      return [];
    }
    return Object.entries(citiesMap).filter(([key]) =>
      key.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const searchForCities = () => {
    const citiesFound = findClosestCities().map(([name, coords]) => ({
      id: uuid.v4(),
      name,
      lat: coords.lat,
      lon: coords.lon,
    }));

    setSearchedCities(citiesFound);
  };

  const loadCitiesFromDB = async () => {
    const db = await SQLite.openDatabaseAsync("myApp.db");

    if (db) {
      const cities: { id: string; name: string; lastused: Date }[] =
        await db.getAllAsync("Locations");

      if (cities.length > 0) {
        let myMappedCities: {
          id: string;
          name: string;
          lat: number;
          lon: number;
          lastUsed: Date;
        }[] = [];

        cities.forEach((c: { id: string; name: string; lastused: Date }) => {
          const city: { lat: number; lon: number } = citiesMap[c.name];

          if (city) {
            const newMappedCity = {
              id: uuid.v4(),
              name: c.name,
              lat: city.lat,
              lon: city.lon,
              lastUsed: c.lastused,
            };

            myMappedCities.push(newMappedCity);
          }
        });

        const sortedCities = myMappedCities.sort(
          (a, b) => a.lastUsed - b.lastUsed
        );

        setMyCities(sortedCities);
      }
    }
  };

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
        className=""
      >
        <TextInput
          className="w-full py-3 px-4 mt-10 rounded-xl shadow-lg bg-orange-200"
          placeholder="Search Cities"
          onChangeText={(text) => setSearchText(text)}
        />
        {myCities.length > 0 ? (
          <View className="mt-20 mb-10">
            <Text className="text-lg mb-3">My Cities</Text>
            <FlatList
              data={myCities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MyCity city={item} />}
            />
          </View>
        ) : null}
        {searchedCities.length > 0 ? (
          <View className="mt-20">
            <FlatList
              data={searchedCities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CityButton city={item} setMyCities={setMyCities} />
              )}
            />
          </View>
        ) : (
          <View className="justify-center items-center">
            <Image
              source={require("../assets/images/icons/no-cities-found.png")}
              className="w-[200px]"
              resizeMode="contain"
              width={200}
              height={200}
            />
          </View>
        )}
      </MotiView>
    </LinearGradient>
  );
}
