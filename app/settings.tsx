import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { Text } from "react-native";

import { useTabAnimation } from "@/hooks/useTabAnimation";

export default function Settings() {
  const animate = useTabAnimation();

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
        className="bg-white"
      >
        <Text>Settings</Text>
      </MotiView>
    </LinearGradient>
  );
}
