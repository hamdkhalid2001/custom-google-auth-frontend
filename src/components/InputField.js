import React from "react";
import { useState } from "react";
function InputField(props) {
  const [focused, setFocused] = useState(false);
  function handleFocus() {
    setFocused(true);
  }
  return (
    <>
      <label htmlFor={props.data.name} className="block mb-2 text-[14px] mt-4">
        {props.data.label}
      </label>

      <input
        type={props.data.type}
        name={props.data.name}
        id={props.data.id}
        className="bg-transparent border-b border-gray-400 w-full focus:outline-0 pb-1"
        required
        // autoComplete="off"
        focused={focused.toString()}
        onBlur={handleFocus}
        onChange={props.data.onChange}
        value={props.data.value}
        pattern={props.data.pattern}
      />
      <span className={props.data.className + " text-red-500 w-full"}>
        {props.data.err}
      </span>
    </>
  );
}

export default InputField;
