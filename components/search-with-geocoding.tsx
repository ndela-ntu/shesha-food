"use client";

import * as React from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface SearchWithGeocodingProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSelectCoordinates: (coordinates: { lat: number; lon: number }) => void;
}
const SearchWithGeocoding = React.forwardRef<
  HTMLInputElement,
  SearchWithGeocodingProps
>(({ className, onSelectCoordinates, ...props }, ref) => {
  const [query, setQuery] = React.useState<{
    query: string;
    withFetch: boolean;
  }>({ query: "", withFetch: false });
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] =
    React.useState<boolean>(true);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const fetchLocations = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5&countrycodes=za`
      );
      const data: Suggestion[] = await response.json();
      setSuggestions(data);
      setIsSuggestionsVisible(true);
    } catch (error) {
      console.error("Error fetching location data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((query: string) => {
    if (query) fetchLocations(query);
    else setSuggestions([]); // Clear suggestions if query is empty
  }, 300);

  React.useEffect(() => {
    if (query.withFetch) {
      handleSearch(query.query);
    }
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ query: event.target.value, withFetch: true });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsSuggestionsVisible(false); // Close the suggestions list
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex items-center space-x-2">
      <div className="relative w-full">
        {loading ? (
          <Loader2 className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
        ) : (
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne" />
        )}
        <Input
          type="search"
          className={cn("pl-8", className)}
          ref={ref}
          value={query.query}
          onChange={handleInputChange}
          {...props}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-olivine mt-1 rounded-xl shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}

                onClick={() => {
                  setQuery({
                    query: suggestion.display_name,
                    withFetch: false,
                  });
                  setSuggestions([]);
                  onSelectCoordinates({
                    lat: parseFloat(suggestion.lat),
                    lon: parseFloat(suggestion.lon),
                  });
                }}
                className="z-10 px-4 py-2 cursor-pointer text-sm"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

SearchWithGeocoding.displayName = "SearchWithGeocoding";

export { SearchWithGeocoding };
