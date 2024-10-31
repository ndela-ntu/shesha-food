"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LocationPickerProps {
  initialCenter?: [number, number];
  onLocationSelect: (coordinates: [number, number]) => void;
  zoom?: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialCenter = [51.5074, -0.1278], // Default to London
  onLocationSelect,
  zoom = 12,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fix Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const mapElement = document.getElementById("location-picker-map");
    if (mapElement && !mapRef.current) {
      // Create map and center on initial location
      mapRef.current = L.map(mapElement).setView(initialCenter, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add click event listener to the map
      mapRef.current.on("click", (e: L.LeafletMouseEvent) =>
        handleMapClick(e.latlng)
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialCenter, zoom]);

  const handleMapClick = useCallback(
    (latlng: L.LatLng) => {
      // Remove existing marker if it exists
      if (markerRef.current && mapRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // Create and add new marker
      if (mapRef.current) {
        markerRef.current = L.marker(latlng).addTo(mapRef.current);
      }

      // Convert to coordinates tuple
      const coordinates: [number, number] = [latlng.lat, latlng.lng];
      
      // Update state and call location select callback
      setSelectedLocation(coordinates);
      onLocationSelect(coordinates);

      // Recenter map to the clicked location
      if (mapRef.current) {
        mapRef.current.setView(latlng, mapRef.current.getZoom());
      }
    },
    [onLocationSelect]
  );

  // Optional: Method to clear the selected location
  const clearLocation = () => {
    if (markerRef.current && mapRef.current) {
      mapRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
      setSelectedLocation(null);
    }
  };

  return (
    <div className="z-10 relative">
      <div
        id="location-picker-map"
        className="h-96 w-full z-10"
        aria-label="Location Picker Map"
      />
    </div>
  );
};

const LocationPickerWrapper = dynamic(() => Promise.resolve(LocationPicker), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default LocationPickerWrapper;