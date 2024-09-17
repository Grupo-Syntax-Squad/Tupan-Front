import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const toggle = () => setIsChecked((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return { isChecked, toggle, handleChange };
};
