"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Map } from "lucide-react";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface DeliveryLocationPickerProps {
  onLocationSelect: (coordinates: { lng: number; lat: number }) => void;
}

const DeliveryLocationPicker = ({
  onLocationSelect,
}: DeliveryLocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(22.9375);
  const [lat, setLat] = useState(30.5595);
  const [zoom, setZoom] = useState(9);
  const [location, setLocation] = useState<{ lng: number; lat: number } | null>(
    null
  );

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      // Update longitude, latitude, and zoom on map move
      map.current.on("move", () => {
        setLng(map.current!.getCenter().lng);
        setLat(map.current!.getCenter().lat);
        setZoom(map.current!.getZoom());
      });

      // Add click event to select location
      map.current.on("click", (e) => {
        const coordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat };
        setLocation(coordinates);
        onLocationSelect(coordinates); // Call the callback with selected coordinates
      });
    } catch (error) {
      console.error("Failed to initialize map:", error);
      // Display an error message or fallback UI
      setLocation(null);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-coralPink rounded-xl w-full">
          <Map />
          Select From Map
        </Button>
      </DialogTrigger>

      <DialogContent className="text-champagne">
        <DialogTitle>Select location from map</DialogTitle>
        <DialogDescription>
          This is a map to select the location from
        </DialogDescription>
        <div
          className="w-full h-96 border border-red-500"
          ref={mapContainer}
        ></div>
        {location ? (
          <p className="mt-4 text-center">
            Selected Location: Longitude: {location.lng.toFixed(4)}, Latitude:{" "}
            {location.lat.toFixed(4)}
          </p>
        ) : (
          <p className="mt-4 text-center text-red-500">
            Failed to initialize map. Please check your Mapbox access token and
            device WebGL support.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryLocationPicker;
