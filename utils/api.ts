import Axios, { AxiosResponse } from "axios";

export const API_GetWeather = (
  long: number,
  lat: number,
  timeZone: string
): Promise<AxiosResponse> => {
  const res = Axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,temperature_80m&daily=windspeed_10m_max,uv_index_max,weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_mean,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timeZone}`
  );
  return res;
};

const APIkey = "e942f755a159eeb9a8cff56a595afac5";
export const API_GetLocation = (
  lon: number,
  lat: number,
  limit: number
): Promise<AxiosResponse> => {
  const res = Axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${APIkey}`
  );
  return res;
};
