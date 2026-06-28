import React, { useState } from "react";
import { MapPin, Search, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

interface LocationSearchProps {
  onLocationChange: (location: LocationData | null) => void;
}

export default function LocationSearch({ onLocationChange }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<LocationData | null>(null);

  const searchLocation = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setSearching(false);
  };

  const selectLocation = (loc: any) => {
    const location: LocationData = {
      name: loc.display_name,
      lat: parseFloat(loc.lat),
      lng: parseFloat(loc.lon),
    };
    setSelected(location);
    setResults([]);
    setQuery(loc.display_name.split(",")[0]);
    onLocationChange(location);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const location: LocationData = {
        name: "Current Location",
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setSelected(location);
      setQuery("Current Location");
      onLocationChange(location);
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center gap-2 text-primary font-heading text-sm font-semibold uppercase tracking-wider">
        <MapPin className="w-4 h-4" />
        Location
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search city, country, landmark..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchLocation()}
            className="pr-8"
          />
          <Search
            className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            onClick={searchLocation}
          />
        </div>
        <Button variant="outline" size="icon" onClick={useCurrentLocation} title="Use my location">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {searching && (
        <div className="flex justify-center py-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {results.length > 0 && (
        <div className="border border-border rounded-lg overflow-hidden">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => selectLocation(r)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors border-b border-border last:border-0 text-foreground"
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          GPS: {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
