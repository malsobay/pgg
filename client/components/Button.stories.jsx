import React from "react";
import { Button } from "./Button";

export const MyButton = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-48">
        <Button onClick={() => console.log("onClick")}>I'm done</Button>
      </div>
    </div>
  );
};
