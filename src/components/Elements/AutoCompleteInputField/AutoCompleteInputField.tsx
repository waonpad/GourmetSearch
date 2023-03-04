import React, { useState, useEffect } from 'react';

import { InputField } from '@/components/Form';
import type { InputFieldProps } from '@/components/Form';

type AutoCompleteInputFieldProps = InputFieldProps & {
  // 簡易的に実装
  suggestions: {
    id: string | number;
    name: string;
  }[];
};

export const AutoCompleteInputField = ({
  suggestions,
  ...inputFieldProps
}: AutoCompleteInputFieldProps) => {
  const [value, setValue] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const handleFocusInputField = () => {
    if (suggestions.length > 0) {
      setIsSuggestionsOpen(true);
    }
  };

  const handleCloseSuggestions = () => {
    setIsSuggestionsOpen(false);
  };

  const handleClickSuggestion = (event: React.MouseEvent<HTMLLIElement>) => {
    const newValue = event.currentTarget.getAttribute('data-value') ?? '';
    setValue(newValue);
    setIsSuggestionsOpen(false);
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      setIsSuggestionsOpen(true);
    }
  }, [suggestions]);

  return (
    <div className="relative">
      <InputField
        {...inputFieldProps}
        inputProps={{
          ...inputFieldProps.inputProps,
          value,
          onFocus: handleFocusInputField,
        }}
      />
      {isSuggestionsOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="fixed inset-0 h-full w-full z-10" onClick={handleCloseSuggestions} />
      )}

      {isSuggestionsOpen && (
        <ul className="absolute z-10 top-full left-0 w-full overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200">
          {suggestions.map((suggestion) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={suggestion.id}
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              onClick={handleClickSuggestion}
              data-value={suggestion.name}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInputField;
