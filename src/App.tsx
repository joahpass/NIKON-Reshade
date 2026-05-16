import { startTransition, useDeferredValue, useState } from "react";
import { AppShell } from "./components/AppShell";
import { BriefingBoard } from "./components/BriefingBoard";
import { EraTimeline } from "./components/EraTimeline";
import { FeaturedDossiers } from "./components/FeaturedDossiers";
import { HangarGrid, type FilterState } from "./components/HangarGrid";
import { HeroSection } from "./components/HeroSection";
import { SelectionGuide } from "./components/SelectionGuide";
import { aircraft, eraRecords, featuredJetIds, guideTracks } from "./data/aircraft";

const roleOptions = [...new Set(aircraft.map((item) => item.role))];
const eraOptions = [...new Set(aircraft.map((item) => item.era))];
const aircraftMap = new Map(aircraft.map((item) => [item.id, item]));
const featured = featuredJetIds
  .map((id) => aircraftMap.get(id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

const defaultFilters: FilterState = {
  query: "",
  role: "all",
  era: "all",
  fit: "all"
};

function App() {
  const [selectedId, setSelectedId] = useState("hornet");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const deferredQuery = useDeferredValue(filters.query.trim().toLowerCase());

  const filtered = aircraft.filter((item) => {
    const haystack = [
      item.name,
      item.nation,
      item.role,
      item.era,
      item.mission,
      item.curve,
      item.summary,
      item.temperament,
      item.firstModuleFit,
      item.missionStyle,
      item.tags.join(" "),
      item.recommendedFor.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!deferredQuery || haystack.includes(deferredQuery)) &&
      (filters.role === "all" || item.role === filters.role) &&
      (filters.era === "all" || item.era === filters.era) &&
      (filters.fit === "all" || item.firstModuleFit === filters.fit)
    );
  });

  const selected = aircraftMap.get(selectedId) ?? aircraft[0];

  function selectAircraft(id: string) {
    startTransition(() => {
      setSelectedId(id);
    });
  }

  function updateFilters(next: Partial<FilterState>) {
    setFilters((current) => ({ ...current, ...next }));
  }

  return (
    <AppShell>
      <HeroSection
        selected={selected}
        totalAircraft={aircraft.length}
        totalRoles={roleOptions.length}
        totalEras={eraOptions.length}
      />

      <FeaturedDossiers featured={featured} selectedId={selected.id} onSelect={selectAircraft} />

      <HangarGrid
        aircraft={aircraft}
        filtered={filtered}
        filters={filters}
        roleOptions={roleOptions}
        eraOptions={eraOptions}
        onFilterChange={updateFilters}
        onReset={() => setFilters(defaultFilters)}
        selectedId={selected.id}
        onSelect={selectAircraft}
      />

      <SelectionGuide
        tracks={guideTracks}
        aircraftMap={aircraftMap}
        selectedId={selected.id}
        onSelect={selectAircraft}
      />

      <EraTimeline eras={eraRecords} aircraftMap={aircraftMap} selectedId={selected.id} onSelect={selectAircraft} />

      <BriefingBoard selected={selected} />
    </AppShell>
  );
}

export default App;
