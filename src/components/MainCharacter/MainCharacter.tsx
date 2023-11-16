import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";

import { SectionWithTitle } from "./SectionWithTitle";

dayjs.extend(relativeTime);

type Props = {
  name: string;
  worldName: string;
  lastSee: string;
  level: number;
  vocation: string;
};

export function MainCharacter({
  name,
  worldName,
  lastSee,
  level,
  vocation,
}: Props) {
  const lastLogin = useMemo(() => {
    const ll = dayjs(lastSee);

    const formateDate = ll.format("DD/MM/YYYY HH:mm");
    const howLongHumanize = dayjs().to(ll);

    return { formateDate, howLongHumanize };
  }, [lastSee]);

  return (
    <div className="flex flex-col gap-2 xl:max-w-[60%] w-full">
      <SectionWithTitle title="Name" className="flex-grow">
        <div>{name}</div>

        <div className="text-xs text-neutral-400">
          last see {lastLogin.howLongHumanize}{" "}
          <span className="font-light text-[0.6rem]">
            ({lastLogin.formateDate})
          </span>
        </div>
      </SectionWithTitle>

      <div className="flex gap-2 flex-col xl:flex-row">
        <SectionWithTitle title="Vocation">{vocation}</SectionWithTitle>

        <SectionWithTitle title="Level">{level}</SectionWithTitle>

        <SectionWithTitle title="World" className="flex-grow">
          {worldName}
        </SectionWithTitle>
      </div>
    </div>
  );
}
