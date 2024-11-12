import { useState, useEffect } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  useEffect(() => {
    setIsChecked(initialValue);
  }, [initialValue]);

  const toggle = () => setIsChecked((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Checkbox isChecked:", e.target.checked); 
    setIsChecked(e.target.checked);
  };

  return { isChecked, toggle, handleChange };
};
