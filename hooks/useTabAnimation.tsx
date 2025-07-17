import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useTabAnimation(delay: number = 10) {
  const [animate, setAnimate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset animation state on focus
      setAnimate(false);

      // Kick off after small delay so Moti picks up from -> animate properly
      const timeout = setTimeout(() => {
        setAnimate(true);
      }, delay);

      return () => clearTimeout(timeout);
    }, [delay])
  );

  return animate;
}
