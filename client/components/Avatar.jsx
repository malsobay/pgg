import React from "react";
import { AnimalAvatar } from "./assets/AnimalsAvatar";
import { Checkmark } from "./assets/Assets";

export const Avatar = ({ animal, submitted = false, disabled = false }) => {
  return (
    <div className="relative h-full w-full">
      <div className={`${disabled ? "grayscale opacity-50" : ""}`}>
        <AnimalAvatar animal={animal} />
      </div>
      {submitted && (
        <div className="absolute -bottom-3 -right-2 h-[40%] w-[40%] shadow-md rounded-full bg-green-100 p-[8%]">
          <Checkmark />
        </div>
      )}
    </div>
  );
};
