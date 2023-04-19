import React, { useState } from 'react';
import "./Dropdown.css";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__selected">
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      <ul className="dropdown__options">
        {options.map((option) => (
          <li
            key={option.value}
            className={`dropdown__option ${
              selectedOption?.value === option.value ? 'dropdown__option--selected' : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown