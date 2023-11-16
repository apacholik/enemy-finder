"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Search } from "@/components";
import prepareUrl from "@/lib/charactersFinder/prepareUrl";

export default function Home() {
  const { push } = useRouter();

  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");

  const isValidSearchValue = currentSearchValue.length > 2;

  const { data: hints } = useQuery<string[]>({
    queryKey: ["prompt", currentSearchValue],
    placeholderData: [],
    enabled: isValidSearchValue,

    async queryFn() {
      const param = new URLSearchParams({
        searchText: currentSearchValue,
        page: "1",
        pageSize: "10",
      });

      const response = await fetch(
        prepareUrl(`characters/prompt?${param.toString()}`)
      );

      return response.json();
    },
  });

  const goToSearchPage = (value: string) => {
    const searchParams = new URLSearchParams({ character: value });
    push(`/search?${searchParams.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="xl:w-1/3 w-full">
        <Search
          onChange={setCurrentSearchValue}
          hintList={hints}
          onSearch={goToSearchPage}
        />
      </div>
    </main>
  );
}
