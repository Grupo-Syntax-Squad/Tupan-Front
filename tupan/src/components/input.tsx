import { InputProps } from "@/types/interfaces";

export const Input = ({
  label, id, type = "text", value, span,
  onChange, placeholder, required = false, estilo,
}: InputProps) => {
  return (
    <div className={`input-container ${estilo}`}>
      {label && span && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >{label}<span className="text-red-500 text-sm"> {span}</span>
        </label>
      )}
      <input
        id={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
        focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
    </div>
  );
};
