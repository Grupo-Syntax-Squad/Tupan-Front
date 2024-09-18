import { ToggleProps } from "@/types/interfaces";
import { Input } from "./input";
import { useToggle } from "@/hooks/check";

export const Toggle = ({ label, id, initialChecked = false }: ToggleProps) => {
  const { isChecked, handleChange } = useToggle(initialChecked);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />

      <div className="flex items-center">
        <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
          <Input
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            estilo="sr-only peer"
          />
          <div className={`w-9 h-5 ${isChecked ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 hover:bg-gray-300'} peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500`}>
            <div className={`absolute top-[2px] left-[2px] h-4 w-4 bg-white rounded-full transition-transform ${isChecked ? 'translate-x-full' : ''}`}></div>
          </div>
        </label>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      </div>
    </>
  );
};