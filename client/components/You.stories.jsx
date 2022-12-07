import React from "react";
import { You } from "./You";

export function YouAvatar() {
  return (
    <div className="flex justify-center items-center">
      <You animal={"sloth"} />
    </div>
  );
}
