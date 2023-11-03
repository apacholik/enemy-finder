import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  searching?: string;
  hintList?: string[];
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
};

export const Search = ({ onSearch, onChange, hintList }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isHiddenHints, setIsHiddenHints] = useState<boolean>(true);

  const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);

    if (onChange) {
      onChange(searchValue);
    }
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const searchSelectedHint = (hintValue: string) => () => {
    setSearchValue(hintValue);

    if (onSearch) {
      onSearch(hintValue);
    }
  };

  const openHints = () => {
    setIsHiddenHints(false);
  };

  const hiddenHints = () => {
    // without setTimeout close hints happening too fast
    setTimeout(() => setIsHiddenHints(true), 200);
  };

  return (
    <form role="search" onSubmit={search}>
      <label htmlFor="cb1-input">State</label>
      <div>
        <input
          id="cb1-input"
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="both"
          aria-expanded={!isHiddenHints}
          aria-controls="cb1-listbox"
          value={searchValue}
          onChange={updateSearchValue}
          onFocus={openHints}
          onBlur={hiddenHints}
        />
        {!!hintList && !isHiddenHints && (
          <ul id="cb1-listbox" role="listbox" aria-label="States">
            {hintList.map((value) => (
              <li
                key={value}
                id="lb1-al"
                role="option"
                aria-selected={false}
                onClick={searchSelectedHint(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};
