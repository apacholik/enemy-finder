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
  "Conlifornia",
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
        setHintList((currentList) => {
          return !currentList.length ? currentList : [];
        });
        return;
      }

      const regExp = new RegExp(`^${searchValue.toLocaleLowerCase()}`);

      const filteredHints = mockHintList.filter((value) =>
        regExp.test(value.toLocaleLowerCase())
      );

      setHintList(filteredHints);
    };

    return (
      <>
        <SearchComponent
          {...restProps}
          hintList={hintList}
          onChange={getHints}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer leo
          ante, eleifend eu malesuada a, ultricies a tellus. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Duis quis enim nunc. Duis varius purus leo, vel semper enim
          ullamcorper pretium. Vestibulum elit turpis, bibendum ut risus ut,
          pellentesque volutpat orci. Nam in eleifend orci, non suscipit nisl.
          Praesent placerat tincidunt ipsum, in sagittis dolor malesuada ac.
          Mauris vitae urna eu justo porttitor posuere ac sed diam. Mauris urna
          dui, sagittis ac mattis ac, molestie condimentum nisl. Ut rutrum odio
          id risus lacinia pharetra.
        </p>
      </>
    );
  },
};

export const ShowHints: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByRole("combobox");

    await userEvent.type(searchInput, "Con");

    const hintsList = canvas.getByRole("listbox");

    await expect(hintsList).toBeInTheDocument();
  },
};

export const ShowHintsOnlyAfter3char: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByRole("combobox");

    await userEvent.type(searchInput, "Ca");

    const hintsList = canvas.queryAllByRole("listbox");

    expect(hintsList).toHaveLength(0);
  },
};
