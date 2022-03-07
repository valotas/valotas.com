import React, { useMemo } from "react";
import { useFetchCounter } from "./FetchTracker";
import { tw, animation, keyframes } from "./twind";

function creatingAnimation() {
  return animation(
    "1.2s ease-out infinite",
    keyframes`
      0% {
        width: 0;
      }
      50% {
        width: 100%;
        margin-left: 0;
      }
      100% {
        margin-left: 100%;
        width: 0;
      }
    `
  );
}

export function LoadingBar() {
  const counter = useFetchCounter();

  const loading = useMemo(() => {
    if (counter > 0) {
      return creatingAnimation();
    }
    return "";
  }, [counter]);

  return (
    <div className={tw`fixed w-full h-1`}>
      <div className={tw("bg-gray-500 h-full w-0", loading)}></div>
    </div>
  );
}
