"use client";

import * as React from "react";
import { useState } from "react";
import { Search, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Divider from "./divider";
import axios from "axios";

// Initialize Mapbox with your access token
const geocodingClient = mbxGeocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
});
interface Suggestion {
  name: string;
  coordinates: { lat: number; lng: number };
}

interface SearchWithGeocodingProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSelectCoordinates: (coordinates: { lat: number; lng: number }) => void;
}
const SearchWithGeocoding = React.forwardRef<
  HTMLInputElement,
  SearchWithGeocodingProps
>(({ className, onSelectCoordinates, ...props }, ref) => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [query, setQuery] = React.useState("");

  const fetchSuggestions = React.useCallback(async (query: string) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: query,
            key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
            limit: 5,
          },
        }
      );
      const results = response.data.results.map((result: any) => ({
        name: result.formatted,
        coordinates: {
          lat: result.geometry.lat,
          lng: result.geometry.lng,
        },
      }));
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (query) fetchSuggestions(query);
    }, 500); // Adjust debounce delay as needed (500ms in this case)

    return () => clearTimeout(handler);
  }, [query, fetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (value: string) => {};

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne" />
        <Input
          type="search"
          className={cn("pl-8", className)}
          ref={ref}
          value={query}
          onChange={handleInputChange}
          {...props}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-olivine mt-1 rounded-xl shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div key={index}>
                <li
                  onClick={() => {
                    if (ref && typeof ref !== "function") {
                      ref.current!.value = suggestion.name;
                    }
                    setSuggestions([]);
                    setQuery(suggestion.name)
                    onSelectCoordinates(suggestion.coordinates); // Call the callback with coordinates
                  }}
                  className="px-4 py-2 cursor-pointer text-sm"
                >
                  {suggestion.name}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

SearchWithGeocoding.displayName = "SearchWithGeocoding";

export { SearchWithGeocoding };
