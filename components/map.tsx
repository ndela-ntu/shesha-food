"use client";

import React, { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (coordinates: [number, number]) => void;
  allowMultipleMarkers?: boolean;
}

// Default values
const DEFAULT_CENTER: [number, number] = [-26.295647, 27.922997];
const DEFAULT_ZOOM = 13;

export const LeafletMap: React.FC<MapProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  onLocationSelect,
  allowMultipleMarkers = false,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Memoize the click handler to prevent unnecessary rerenders
  const handleMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      const coordinates: [number, number] = [e.latlng.lat, e.latlng.lng];

      // Clear existing markers if multiple markers are not allowed
      if (!allowMultipleMarkers) {
        markersRef.current.forEach((marker) => {
          marker.remove();
        });
        markersRef.current = [];
      }

      // Create and add new marker
      const marker = L.marker(coordinates).addTo(mapInstanceRef.current!);

      // Add popup with coordinates
      marker
        .bindPopup(
          `Latitude: ${coordinates[0].toFixed(
            6
          )}<br>Longitude: ${coordinates[1].toFixed(6)}`
        )
        .openPopup();

      //Fly to coordinates
      mapInstanceRef.current?.flyTo(e.latlng);

      // Store marker reference
      markersRef.current.push(marker);

      // Call the callback with the coordinates
      if (onLocationSelect) {
        onLocationSelect(coordinates);
      }
    },
    [allowMultipleMarkers, onLocationSelect]
  );

  // Setup map
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === "undefined" || !mapRef.current) return;

    // Fix Leaflet icon issue
    if (typeof L !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    }

    // Initialize map only if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      const circle1 = L.circle([-26.291952, 27.936952], {
        color: "skyblue",
        fillColor: "skyblue",
        fillOpacity: 0.5,
        radius: 2000,
      }).addTo(mapInstanceRef.current);

      const circle2 = L.circle([-26.291905,27.911338,], 
        {
          color: "skyblue",
          fillColor: "skyblue",
          fillOpacity: 0.5,
          radius: 2000,
        }
      ).addTo(mapInstanceRef.current);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add click handler
      mapInstanceRef.current.on("click", handleMapClick);
    }

    // Update view if center or zoom changes
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off("click", handleMapClick);
        markersRef.current.forEach((marker) => marker.remove());
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]); // Remove handleMapClick from dependencies to prevent rerender

  return (
    <div
      ref={mapRef}
      className="h-96 w-full z-10"
      aria-label="Interactive Map"
    />
  );
};
