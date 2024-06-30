// InputField.tsx

import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <p className="text-lg font-semibold mb-[2vh]">{label}</p>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required // This is a standard HTML attribute for input fields
      />
    </>
  );
};

export default InputField;
