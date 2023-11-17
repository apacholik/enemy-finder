import MainCharacter from "@/components/MainCharacter";
import { Character } from "@/lib/charactersFinder/contracts";
import prepareUrl from "@/lib/charactersFinder/prepareUrl";
import RoutingPageProps from "@/types/RoutingPageProps";

const ONE_MINUTE = 60 * 1000;

export default async function Search({ searchParams }: RoutingPageProps) {
  const response = await fetch(
    prepareUrl(`characters/${searchParams["character"]}`),
    {
      next: {
        revalidate: 3 * ONE_MINUTE,
      },
    }
  );

  const characterInfo: Character = await response.json();

  return (
    <div className="flex justify-center">
      <MainCharacter
        name={characterInfo.name}
        lastSee={characterInfo.lastLogin}
        level={characterInfo.level}
        vocation={characterInfo.vocation}
        worldName={characterInfo.world}
      />
    </div>
  );
}
