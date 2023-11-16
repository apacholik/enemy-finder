type ISODateString = string;
type RelatedCharacter = string;

export type Character = {
  name: string;
  world: string;
  vocation: string;
  level: 81;
  lastLogin: ISODateString;
  formerNames: unknown[];
  formerWorlds: unknown[];
  traded: false;
  otherVisibleCharacters: RelatedCharacter[];
  possibleInvisibleCharacters: [];
};
