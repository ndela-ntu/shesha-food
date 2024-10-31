"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  position: [number, number];
  popup: string;
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
}

const DEFAULT_CENTER: [number, number] = [51.505, -0.09];
const DEFAULT_ZOOM = 13;
const DEFAULT_MARKERS: MapMarker[] = [
  {
    position: [51.505, -0.09],
    popup: "London City Center",
  },
  {
    position: [51.51, -0.1],
    popup: "Another London Location",
  },
];

const Map: React.FC<MapProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = DEFAULT_MARKERS,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fix Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "/leaflet/marker-icon.png",
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Create markers layer
      markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    // Update markers
    const updateMarkers = () => {
      if (!markersLayerRef.current) return;

      // Clear existing markers
      markersLayerRef.current.clearLayers();

      // Add new markers
      markers.forEach((marker) => {
        L.marker(marker.position)
          .bindPopup(marker.popup)
          .addTo(markersLayerRef.current!);
      });
    };

    updateMarkers();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, [center, zoom, markers]); // Dependencies array includes props

  // Event handlers example (can be expanded based on needs)
  const handleMapInstance = (map: L.Map | null): void => {
    if (!map) return;

    map.on("click", (e: L.LeafletMouseEvent) => {
      console.log("Map clicked at:", e.latlng);
    });
  };

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Card className="w-full p-1 m-0">
      <CardContent className="p-1 m-0">
        <div
          ref={mapRef}
          className="h-96 w-full relative"
          aria-label="Interactive map"
        />
      </CardContent>
    </Card>
  );
};

// Type-safe dynamic import
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(() => Promise.resolve(Map), {
  ssr: false,
});

export type { MapProps, MapMarker };
export default MapWithNoSSR;
