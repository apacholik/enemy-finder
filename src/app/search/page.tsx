import { Character } from "@/lib/charactersFinder/contracts";
import prepareUrl from "@/lib/charactersFinder/prepareUrl";
import RoutingPageProps from "@/types/RoutingPageProps";

const ONE_MINUTE = 1000;

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
    <div>
      <div>
        <b>Name:</b> {characterInfo.name}
      </div>
      <div>
        <b>World:</b> {characterInfo.world}
      </div>
      <div>
        <b>Last login:</b> {characterInfo.lastLogin}
      </div>
      <div>
        <b>Level:</b> {characterInfo.level}
      </div>
      <div>
        <b>Vocation:</b> {characterInfo.vocation}
      </div>
    </div>
  );
}
