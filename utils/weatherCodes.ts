import { WeatherCodeMapType } from "@/types";

const weatherCodeMap: WeatherCodeMapType = {
  0: {
    name: "Clear sky",
    icon: require("../assets/images/icons/sunny.png"),
  },
  1: {
    name: "Mainly clear",
    icon: require("../assets/images/icons/sunny.png"),
  },
  2: {
    name: "Partly cloudy",
    icon: require("../assets/images/icons/partly-cloudy.png"),
  },
  3: {
    name: "Overcast",
    icon: require("../assets/images/icons/partly-cloudy.png"),
  },
  45: {
    name: "Fog",
    icon: require("../assets/images/icons/fog.png"),
  },
  48: {
    name: "Depositing rime fog",
    icon: require("../assets/images/icons/fog.png"),
  },
  51: {
    name: "Light drizzle",
    icon: require("../assets/images/icons/rainy.png"),
  },
  53: {
    name: "Moderate drizzle",
    icon: require("../assets/images/icons/rainy.png"),
  },
  55: {
    name: "Dense drizzle",
    icon: require("../assets/images/icons/rainy.png"),
  },
  56: {
    name: "Light freezing drizzle",
    icon: require("../assets/images/icons/slate.png"),
  },
  57: {
    name: "Dense freezing drizzle",
    icon: require("../assets/images/icons/slate.png"),
  },
  61: {
    name: "Slight rain",
    icon: require("../assets/images/icons/rainy.png"),
  },
  63: {
    name: "Moderate rain",
    icon: require("../assets/images/icons/rainy.png"),
  },
  65: {
    name: "Heavy rain",
    icon: require("../assets/images/icons/rainy.png"),
  },
  66: {
    name: "Light freezing rain",
    icon: require("../assets/images/icons/slate.png"),
  },
  67: {
    name: "Heavy freezing rain",
    icon: require("../assets/images/icons/slate.png"),
  },
  71: {
    name: "Slight snow fall",
    icon: require("../assets/images/icons/snowy.png"),
  },
  73: {
    name: "Moderate snow fall",
    icon: require("../assets/images/icons/snowy.png"),
  },
  75: {
    name: "Heavy snow fall",
    icon: require("../assets/images/icons/snowy.png"),
  },
  77: {
    name: "Snow grains",
    icon: require("../assets/images/icons/snowy.png"),
  },
  80: {
    name: "Slight rain showers",
    icon: require("../assets/images/icons/rainy.png"),
  },
  81: {
    name: "Moderate rain showers",
    icon: require("../assets/images/icons/rainy.png"),
  },
  82: {
    name: "Violent rain showers",
    icon: require("../assets/images/icons/rainy.png"),
  },
  85: {
    name: "Slight snow showers",
    icon: require("../assets/images/icons/snowy.png"),
  },
  86: {
    name: "Heavy snow showers",
    icon: require("../assets/images/icons/snowy.png"),
  },
  95: {
    name: "Thunderstorm",
    icon: require("../assets/images/icons/stormy.png"),
  },
  96: {
    name: "Thunderstorm with slight hail",
    icon: require("../assets/images/icons/stormy.png"),
  },
  99: {
    name: "Thunderstorm with heavy hail",
    icon: require("../assets/images/icons/stormy.png"),
  },
};

export default weatherCodeMap;
