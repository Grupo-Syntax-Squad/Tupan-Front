import { useState } from "react";

export const useEditable = () => {
  const [isEditable, setIsEditable] = useState(true);

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return {
    isEditable,
    toggleEdit,
  };
};
