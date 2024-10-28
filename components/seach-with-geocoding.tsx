import * as React from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Divider from "./divider";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchWithGeocoding = React.forwardRef<
  HTMLInputElement,
  SearchInputProps
>(({ className, ...props }, ref) => {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: query,
            key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY, // Store this in .env.local
            limit: 5,
          },
        }
      );
      const results = response.data.results.map(
        (result: any) => result.formatted
      );
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchSuggestions(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne" />
      <Input
        type="search"
        className={cn("pl-8", className)}
        ref={ref}
        onChange={handleInputChange}
        {...props}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-olivine shadow-lg rounded-xl mt-2 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <>
              <li
                key={index}
                className="p-2 text-xs cursor-pointer"
                onClick={() => {
                  if (ref && typeof ref !== "function") {
                    ref.current!.value = suggestion;
                    setSuggestions([]);
                  }
                }}
              >
                {suggestion}
              </li>
              <Divider />
            </>
          ))}
        </ul>
      )}
    </div>
  );
});

SearchWithGeocoding.displayName = "SearchInput";

export { SearchWithGeocoding };
