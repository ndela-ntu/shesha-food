"use client";

import * as React from "react";
import { useState } from "react";
import { Search, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Divider from "./divider";

// Initialize Mapbox with your access token
const geocodingClient = mbxGeocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
});

interface SearchWithGeocodingProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchWithGeocoding = React.forwardRef<
  HTMLInputElement,
  SearchWithGeocodingProps
>(({ className, ...props }, ref) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (input) {
      try {
        const response = await geocodingClient
          .forwardGeocode({
            query: input,
            limit: 5,
          })
          .send();

        const suggestionList = response.body.features.map(
          (feature: { place_name: string }) => feature.place_name
        );
        setSuggestions(suggestionList);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

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
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer text-sm"
                >
                  {suggestion}
                </li>
                <Divider thickness="1" />
              </div>
            ))}
          </ul>
        )}
      </div>
      <SendHorizontal className="w-10 h-10 bg-coralPink rounded-full p-2.5" />
    </div>
  );
});

SearchWithGeocoding.displayName = "SearchWithGeocoding";

export { SearchWithGeocoding };
