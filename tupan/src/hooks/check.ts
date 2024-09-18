import { useState, useEffect } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  // Sincroniza o estado com o valor inicial quando ele muda
  useEffect(() => {
    setIsChecked(initialValue);
  }, [initialValue]);

  const toggle = () => setIsChecked((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Checkbox isChecked:", e.target.checked);  // Log para verificar o estado
    setIsChecked(e.target.checked);
  };

  return { isChecked, toggle, handleChange };
};
