/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import MainCharacterComponent from ".";

const meta = {
  title: "Components/MainCharacter",
  component: MainCharacterComponent,
  tags: ["autodocs"],
  argTypes: {
    lastSee: {
      control: {
        type: "date",
      },
    },
  },
} satisfies Meta<typeof MainCharacterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Mantero Kontrolelo",
    worldName: "Artiso",
    lastSee: "2023-11-16T22:57:27.524Z",
    level: 99,
    vocation: "Druid",
  },
};
