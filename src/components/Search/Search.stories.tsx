/* eslint-disable react-hooks/rules-of-hooks */
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import SearchComponent from ".";

const meta = {
  title: "Components/Search",
  component: SearchComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockHintList = [
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Conlorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
];

export const Default: Story = {
  render: ({ onChange, ...restProps }) => {
    const [hintList, setHintList] = useState<string[]>([]);

    const getHints = (searchValue: string) => {
      onChange && onChange(searchValue);

      if (searchValue.length < 3) {
        return;
      }

      const regExp = new RegExp(`^${searchValue.toLocaleLowerCase()}`);

      const filteredHints = mockHintList.filter((value) =>
        regExp.test(value.toLocaleLowerCase())
      );

      setHintList(filteredHints);
    };

    return (
      <SearchComponent {...restProps} hintList={hintList} onChange={getHints} />
    );
  },
};

export const ShowHints: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByRole("combobox");

    await userEvent.type(searchInput, "Cal");

    const hintsList = canvas.getByRole("listbox");

    await expect(hintsList).toBeInTheDocument();
  },
};

export const ShowHintsOnlyAfter3char: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByRole("combobox");

    await userEvent.type(searchInput, "Cal");

    const hintsList = canvas.getByRole("listbox");

    await expect(hintsList).toBeNull();
  },
};
