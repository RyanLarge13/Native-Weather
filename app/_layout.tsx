import "../global.css";

// app/_layout.tsx
import { Tabs } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

import FAIcons from "@expo/vector-icons/FontAwesome5";
import IonIcons from "@expo/vector-icons/Ionicons";

export default function Layout() {
  let db: SQLite.SQLiteDatabase;

  useEffect(() => {
    initDB();
  }, []);

  const initDB = async () => {
    db = await SQLite.openDatabaseAsync("myApp.db");

    await db.execAsync(
      `
          CREATE TABLE IF NOT EXISTS Settings (
          tempUnits TEXT NOT NULL DEFAULT 'F',
          preferredCity TEXT NOT NULL DEFAULT 'Location',
          theme TEXT NOT NULL DEFAULT 'orange',
          accuracy INTEGER NOT NULL DEFAULT 1, -- SQLite uses 0/1 for booleans
          notificationInterval INTEGER NOT NULL DEFAULT 1
        );
      `
    );

    await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Locations (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL DEFAULT 'Tokyo,Japan',
          lastUsed TEXT NOT NULL DEFAULT (datetime('now'))
        );
    `);

    const existingSettings = await db.getAllAsync(`SELECT * FROM Settings;`);

    if (existingSettings.length === 0) {
      await db.runAsync(
        `INSERT INTO Settings (tempUnits, preferredCity, theme, accuracy, notificationInterval)
         VALUES (?, ?, ?, ?, ?);`,
        ["F", "Location", "orange", 1, 1]
      );
      console.log("Inserted default Settings row.");
    } else {
      console.log("Settings already initialized:", existingSettings);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFF", // active icon/text color
        tabBarInactiveTintColor: "#000", // inactive icon/text color
        tabBarStyle: {
          backgroundColor: "#fb923c", // tab bar background
          borderTopWidth: 0, // remove top border
          padding: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <IonIcons name="home" color={color} size={focused ? 20 : 15} />
          ),
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          title: "Cities",
          tabBarIcon: ({ focused, color }) => (
            <FAIcons name="city" color={color} size={focused ? 20 : 13} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <IonIcons name="cog" color={color} size={focused ? 25 : 18} />
          ),
        }}
      />
    </Tabs>
  );
}
