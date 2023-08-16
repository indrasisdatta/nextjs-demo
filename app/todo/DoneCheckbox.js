"use client";
import React, { useState } from "react";

export const DoneCheckbox = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      value={!!todo.completed}
      checked={!!isChecked}
      onChange={handleChange}
    />
  );
};
