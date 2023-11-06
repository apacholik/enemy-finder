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
    <form role="search" onSubmit={search} className="w-full relative">
      <div className="border border-gray-700 rounded-md px-4 pt-2 pb-1">
        <input
          id="cb1-input"
          type="text"
          placeholder="Wpisz nazwę gracza..."
          role="combobox"
          autoComplete="off"
          aria-autocomplete="both"
          aria-expanded={!isHiddenHints}
          aria-controls="cb1-listbox"
          value={searchValue}
          onChange={updateSearchValue}
          onFocus={openHints}
          onBlur={hiddenHints}
          className="focus-visible:outline-none w-full pb-1 border-b-4 border-b-transparent focus-visible:border-b-cyan-600 transition-colors"
        />
      </div>
      {!!hintList?.length && !isHiddenHints && (
        <ul
          id="cb1-listbox"
          role="listbox"
          aria-label="States"
          className="pt-1 pb-2 absolute bg-white px-4 w-full rounded-b-md border-gray-700 border border-t-0 -translate-y-1"
        >
          {hintList.map((value) => (
            <li
              key={value}
              id="lb1-al"
              role="option"
              aria-selected={false}
              onClick={searchSelectedHint(value)}
              className="cursor-pointer"
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
