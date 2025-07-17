import { ImageSourcePropType } from "react-native";

export type CurrentWeatherType = {
  temp: number;
  weatherCode: {
    icon: ImageSourcePropType | string;
    name: string;
  };
  windDirection: number;
  windSpeed: number;
  precipitation: number;
  rainfall: number;
  relativeHumidity: number;
  feelsLike: number;
  humidity: number;
};

export type HourlyWeatherType = {
  time: Date;
  icon: ImageSourcePropType | null;
  temp: number;
};

export type TomorrowsWeatherType = {
  temp: number;
  icon: WeatherCodeEntry["icon"];
  rainfall: number;
  precipitation: number;
};

export type LocationType = {
  city: string;
  state: string;
};

export type WeatherCodeEntry = {
  name: string;
  icon: ImageSourcePropType | null;
};

export type WeatherCodeMapType = {
  [code: number]: WeatherCodeEntry;
};

export type DayWeatherType = {
  index: number;
  temp: number;
  windspeed: number;
  weekDay: string;
  icon: ImageSourcePropType | null;
  rainfall: number;
  precipitation: number;
};

export type DateStringEntry = {
  long: string;
  short: string;
};

export type DayStringMapType = {
  [index: number]: DateStringEntry;
};

export type CitiesType = [string, { lat: number; lon: number }][];

export type SettingsType = {
  tempUnits: string;
  preferredCity: string;
  theme: string;
  accuracy: boolean;
  notificationInterval: number;
};

export type WeatherDataType = {
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  current_weather_units: {
    interval: string;
    is_day: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windspeed: string;
  };
  daily: {
    precipitation_probability_mean: number[];
    precipitation_sum: number[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    uv_index_max: number[];
    weathercode: number[];
    windspeed_10m_max: number[];
  };
  daily_units: {
    precipitation_probability_mean: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
    uv_index_max: string;
    weathercode: string;
  };
  elevation: number;
  generationtime_ms: number;
  hourly: {
    apparent_temperature: number[];
    precipitation_probability: number[];
    relativehumidity_2m: number[];
    temperature_2m: number[];
    temperature_80m: number[];
    time: string[];
    weathercode: number[];
    winddirection_10m: number[];
    windgusts_10m: number[];
    windspeed_10m: number[];
  };
};
