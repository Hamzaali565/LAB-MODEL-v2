import React from "react";
import Select from "react-select";

const LabledDropDown = ({
  label,
  options,
  onChange,
  value,
  selectedOption,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent", // Set the background color of the control (main input)
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3182ce" : "transparent", // Set the background color of each option
      color: state.isSelected ? "white" : "black", // Set the text color of each option
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white", // Set the text color of the selected value
    }),
  };
  return (
    <div className="flex items-center justify-center space-x-2 p-2">
      <div className="text-xs w-44">{label}</div>
      <Select
        className="w-52 border-2 border-black"
        options={options}
        styles={customStyles}
        selectedOption={selectedOption}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default LabledDropDown;

export const SimpleDropDown = ({
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
}) => {
  return (
    <select name="cars" id="cars" className="transparent-select">
      <option>{option1}</option>
      <option>{option2}</option>
      <option>{option3}</option>
      {option4 && <option>{option4}</option>}
      {option5 && <option>{option5}</option>}
      {option6 && <option>{option6}</option>}
      {option7 && <option>{option7}</option>}
    </select>
  );
};
