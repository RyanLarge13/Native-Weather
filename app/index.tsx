import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { MotiScrollView } from "moti";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import Day from "@/components/Day";
import Hourly from "@/components/Hourly";
import Today from "@/components/Today";
import TodaysInfo from "@/components/TodaysInfo";
import { useTabAnimation } from "@/hooks/useTabAnimation";
import {
  CurrentWeatherType,
  DayWeatherType,
  HourlyWeatherType,
  LocationType,
  SettingsType,
  WeatherDataType,
} from "@/types";
import { API_GetLocation } from "@/utils/api";
import dayStringMap from "@/utils/dayStringMap";
import weatherData from "@/utils/dummyData";
import weatherCodeMap from "@/utils/weatherCodes";

import citiesMap from "../assets/cities.json";

export default function Index() {
  const animate = useTabAnimation();

  const [loading, setLoading] = useState<boolean>(true);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherType[]>([]);
  const [location, setLocation] = useState<LocationType>({
    city: "",
    state: "",
  });
  const [theme, setTheme] = useState("orange");
  const [tempUnit, setTempUnit] = useState("F");
  const [accuracy, setAccuracy] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>({
    temp: 0,
    weatherCode: { icon: "", name: "" },
    windDirection: 0,
    windSpeed: 0,
    precipitation: 0,
    rainfall: 0,
    relativeHumidity: 0,
    feelsLike: 0,
    humidity: 0,
  });

  const [daysWeather, setDaysWeather] = useState<DayWeatherType[]>([]);

  const [expandedDay, setExpandedDay] = useState<number>(0);

  // Just keeping these variables static for now until I have a need
  // to update them live
  const currentHour = new Date().getHours();

  const hourScrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    fetchFromDB();
  }, []);

  const fetchFromDB = async () => {
    const db = await SQLite.openDatabaseAsync("myApp.db");

    if (!db) {
      return;
    }

    const settings: SettingsType[] = await db.getAllAsync(
      `SELECT * FROM Settings`
    );

    if (settings.length > 0) {
      const settingsValues: SettingsType = settings[0];

      setTempUnit(settingsValues.tempUnits);
      if (settingsValues.preferredCity === "Location") {
        fetchWeatherAndRequestLocation();
      } else {
        const city: { lon: number; lat: number } =
          citiesMap[settingsValues.preferredCity];
        await M_FetchLocation(city.lon, city.lat);
        await M_FetchWeather(city.lon, city.lat);
      }

      setTheme(settingsValues.theme);

      setAccuracy(settingsValues.accuracy);

      setLoading(false);
    } else {
      fetchWeatherAndRequestLocation();
    }
  };

  const fetchWeatherAndRequestLocation = async () => {
    await fetchFromDB();

    let { status: fgStatus } =
      await Location.requestForegroundPermissionsAsync();

    if (fgStatus !== "granted") {
      console.log("Foreground location permission not granted");
      return;
    }

    let { status: bgStatus } =
      await Location.requestBackgroundPermissionsAsync();

    if (bgStatus !== "granted") {
      console.log("Background location permission not granted");
    }

    let location = await Location.getLastKnownPositionAsync();
    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
        timeInterval: 100000,
      });
    }

    const { longitude, latitude } = location.coords;
    await M_FetchLocation(longitude, latitude);
    try {
      await M_FetchWeather(longitude, latitude);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const M_FetchLocation = async (lon: number, lat: number) => {
    try {
      const response = await API_GetLocation(lon, lat, 1);

      setLocation({
        city: response.data[0].name,
        state: response.data[0].state,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getWeatherIcon = (code: number) => {
    return (
      weatherCodeMap[code]?.icon || require("../assets/images/icons/sunny.png")
    );
  };

  const M_FetchWeather = async (long: number, lat: number) => {
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const response = await API_GetWeather(long, lat, timeZone);
    // const data: WeatherDataType = response.data;
    const data: WeatherDataType = weatherData;
    const cw = data.current_weather;
    const dw = data.daily;
    const hw = data.hourly;
    M_BuildWeeklyWeather(dw);
    M_BuildCurrentWeather(cw, dw, hw);
    M_BuildHourlyWeather(hw);
  };

  // Building and setting data methods -----------------------------------------------
  const M_BuildCurrentWeather = (
    cw: WeatherDataType["current_weather"],
    dw: WeatherDataType["daily"],
    hw: WeatherDataType["hourly"]
  ) => {
    const weatherCodeInfo = weatherCodeMap[cw.weathercode] || {
      name: "Sunny",
      icon: require("../assets/images/icons/sunny.png"),
    };

    const cwObj = {
      temp: cof(n(cw.temperature)),
      weatherCode: {
        icon: weatherCodeInfo.icon || "../assets/images/icons/sunny.png",
        name: weatherCodeInfo.name || "Sunny",
      },
      windDirection: n(cw.winddirection),
      windSpeed: n(cw.windspeed),
      precipitationChance: n(dw.precipitation_probability_mean[0]),
      rainfall: n(dw.precipitation_sum[0]),
      humidity: n(hw.relativehumidity_2m[0]),
      precipitation: 0,
      relativeHumidity: 0,
      feelsLike: 0,
    };

    setCurrentWeather(cwObj);
  };

  const M_BuildHourlyWeather = (hw: WeatherDataType["hourly"]) => {
    const hwObj: HourlyWeatherType[] = [];
    const hoursToUse: number = Math.min(24, hw.time.length);

    for (let i = 0; i < hoursToUse; i++) {
      const newHourly: HourlyWeatherType = {
        time: new Date(hw.time[i]),
        icon: getWeatherIcon(hw.weathercode[i]),
        temp: cof(n(hw.temperature_2m[i])),
      };

      hwObj.push(newHourly);
    }

    setHourlyWeather(hwObj);
  };

  const M_BuildWeeklyWeather = (dw: WeatherDataType["daily"]) => {
    const dayWeathers: DayWeatherType[] = [];
    const currentDay = new Date().getDay();

    for (let i = 0; i < 7; i++) {
      const nextDayWeatherCode = weatherCodeMap[dw.weathercode[i]] || {
        name: "Sunny",
        icon: require("../assets/images/icons/sunny.png"),
      };

      let mapQuery = i + currentDay;

      if (currentDay + i > 6) {
        mapQuery -= 7;
      }

      const dayObj: DayWeatherType = {
        index: i,
        weekDay:
          i === 1
            ? "Tomorrow"
            : i === 0
              ? "Today"
              : dayStringMap[mapQuery]?.long || "",
        windspeed: n(dw.windspeed_10m_max[i]),
        temp: cof(n(dw.temperature_2m_max[i])),
        icon: nextDayWeatherCode.icon,
        rainfall: n(dw.precipitation_sum[i]),
        precipitation: n(dw.precipitation_probability_mean[i]),
      };

      dayWeathers.push(dayObj);
    }

    setDaysWeather(dayWeathers);
  };
  // Building and setting data methods -----------------------------------------------

  const n = (n: number): number => {
    if (accuracy) {
      return n;
    } else {
      return Math.trunc(n);
    }
  };

  const cof = (n: number): number => {
    if (tempUnit === "F") {
      return n;
    } else {
      const c = ((n - 32) * 5) / 9;
      if (Number.isInteger(c)) {
        return c;
      } else {
        return Number(c.toFixed(1));
      }
    }
  };

  return (
    <MotiScrollView
      from={{ opacity: 0, translateX: -100 }}
      animate={
        animate
          ? { opacity: 1, translateX: 0 }
          : { opacity: 0, translateX: -100 }
      }
      transition={{ type: "spring", duration: 500, stiffness: 200 }}
      className="bg-white"
    >
      <LinearGradient
        colors={
          theme === "orange"
            ? ["#fff7ed", "#fb923c"]
            : theme === "blue"
              ? ["#e0f2fe", "#38bdf8"]
              : theme === "green"
                ? ["#d1fae5", "#34d399"]
                : ["#fff7ed", "#fb923c"]
        }
        start={{ x: -0.5, y: -0.5 }}
        end={{ x: 0.75, y: 0.75 }}
        className={`h-full min-h-full pt-20 ${loading ? "justify-center items-center" : ""}`}
      >
        {/*  Make sure you set some default location incase api fails */}
        {loading ? (
          <ActivityIndicator color="#FFF" size="large" />
        ) : (
          <>
            {/* Day Card ------------- */}
            <View className="px-8 pb-8">
              <Today currentWeather={currentWeather} location={location} />
              <TodaysInfo
                rainfall={currentWeather.rainfall}
                windSpeed={currentWeather.windSpeed}
                humidity={currentWeather.humidity}
              />
            </View>
            {/* Day Card ------------- */}

            {/* Hourly Weather ---------------------------- */}
            <ScrollView
              ref={hourScrollRef}
              horizontal={true}
              contentContainerStyle={{
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
              className="flex-row mt-5 py-3"
            >
              {hourlyWeather.map((hw, i) => (
                <Hourly
                  key={i}
                  hour={hw}
                  currentHour={currentHour}
                  hourScrollRef={hourScrollRef}
                />
              ))}
            </ScrollView>
            {/* Hourly Weather ---------------------------- */}

            {/* Weeks Weather ---------------------------- */}
            <View className="mt-10 mb-10">
              {daysWeather.map((dw: DayWeatherType, i) => (
                <Day
                  key={i}
                  dw={dw}
                  expanded={expandedDay}
                  setExpandedDay={setExpandedDay}
                />
              ))}
            </View>
            {/* Weeks Weather ---------------------------- */}
          </>
        )}
      </LinearGradient>
    </MotiScrollView>
  );
}
