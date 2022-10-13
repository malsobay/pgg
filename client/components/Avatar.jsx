import React from "react";
import { AnimalAvatar } from "./AnimalsAvatar";

export const Avatar = ({ animal }) => {
  return (
    <div class="mh-42 mw-42">
      <AnimalAvatar animal="moose" />
    </div>
  );
};
