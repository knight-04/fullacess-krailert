import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';

const SupplierAutocomplete = ({ value, onChange, options }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value);
    if (selectedOption) {
      setInputValue(selectedOption.label);
    } else {
      setInputValue('');
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions(options); // แสดงตัวเลือกทั้งหมดเมื่อไม่มีการพิมพ์
      setIsOpen(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.label);
    setSuggestions([]);
    setIsOpen(false);
    onChange(suggestion.value);
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions(options); // แสดงตัวเลือกทั้งหมดเมื่อล้างข้อมูล
    setIsOpen(true);
    onChange('');
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setSuggestions(options);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full border rounded-l p-2"
          placeholder="ค้นหาบริษัท..."
          required
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="px-2 border-t border-r border-b rounded-r bg-gray-50 hover:bg-gray-100"
        >
          <ChevronDown size={20} />
        </button>
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="text-sm text-gray-900">{suggestion.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierAutocomplete;