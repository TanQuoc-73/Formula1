import { Race } from "@/types/race"; // đảm bảo bạn đã định nghĩa type Race

export function filterRaces(
  races: Race[],
  searchTerm: string,
  seasonFilter: string
): Race[] {
  return races.filter((race) => {
    const matchesSearch = race.raceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason =
      seasonFilter && seasonFilter !== "all" ? race.season === seasonFilter : true;
    return matchesSearch && matchesSeason;
  });
}