# 🌤️ Expo Weather App

[![Built with Expo](https://img.shields.io/badge/built%20with-expo-1f2024.svg?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/framework-react--native-61dafb.svg?logo=react)](https://reactnative.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/database-SQLite-lightgrey.svg?logo=sqlite)](https://www.sqlite.org/)
[![Location API](https://img.shields.io/badge/location-enabled-success.svg)](#)

---

## 📚 Table of Contents

- [📱 Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [🧠 Architecture Overview](#-architecture-overview)
- [📂 Project Structure Highlights](#-project-structure-highlights)
- [🛠️ Setup & Usage](#️-setup--usage)
- [🧪 Notes](#-notes)
- [📸 Screenshots](#-screenshots)
- [📝 Future Improvements](#-future-improvements)
- [📄 License](#-license)

---

## 📱 Features

- 📍 Auto-detects device location using permissions
- 🏙️ Supports static city selection from `cities.json`
- 🌦️ Shows:
  - Current weather conditions
  - 24-hour hourly forecast
  - 7-day forecast
- 🎨 Theme support (orange, blue, green)
- 💾 SQLite-based settings storage (theme, temperature unit, accuracy)
- 🎞 Animated transitions using Moti

---

## 🚀 Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Moti](https://moti.fyi/)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- TypeScript

---

## 🧠 Architecture Overview

The app revolves around the `Index` screen which:

- Initializes app state
- Loads saved settings from SQLite
- Requests and handles location permissions
- Loads weather data from local dummy data or (optionally) an API
- Renders:
  - Current weather (`<Today />`)
  - Weather details (`<TodaysInfo />`)
  - Hourly forecast (`<Hourly />`)
  - Weekly forecast (`<Day />`)

---

## 📂 Project Structure Highlights

```

.
├── assets/
│ ├── images/icons/ # Weather icons
│ └── cities.json # City coordinates map
├── components/
│ ├── Today.tsx
│ ├── TodaysInfo.tsx
│ ├── Hourly.tsx
│ └── Day.tsx
├── hooks/
│ └── useTabAnimation.ts
├── utils/
│ ├── api.ts
│ ├── dayStringMap.ts
│ ├── weatherCodes.ts
│ └── dummyData.ts
└── index.tsx # Main screen logic

```

---

## 🛠️ Setup & Usage

### Prerequisites

- Node.js
- Expo CLI

### Getting Started

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
npx expo start
```

- Ensure your emulator or mobile device has **location services enabled**
- The local SQLite database (`myApp.db`) should contain a `Settings` table

---

## 🧪 Notes

- Weather data is loaded from `utils/dummyData.ts`

  > You can replace `M_FetchWeather()` logic to call a real API (like OpenWeatherMap)

- If location access is denied, the app falls back to manually selected cities

---

## 📸 Screenshots

> _(Add screenshots here if available)_
> For example:
>
> - ![Today Screen](./screenshots/today.png)
> - ![Weekly Forecast](./screenshots/weekly.png)

---

## 📝 Future Improvements

- 🌐 Replace dummy data with real-time API integration
- 🧭 Fallback handling if location services fail
- 🛠 Add user-facing Settings screen
- 🌍 Multi-language (i18n) support

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
