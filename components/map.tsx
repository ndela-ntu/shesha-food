'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker, MapProps } from './map-wrapper';

// Default values
const DEFAULT_CENTER: [number, number] = [51.505, -0.09];
const DEFAULT_ZOOM = 13;
const DEFAULT_MARKERS: MapMarker[] = [
  {
    position: [51.505, -0.09],
    popup: "London City Center"
  },
  {
    position: [51.51, -0.1],
    popup: "Another London Location"
  }
];

export const LeafletMap: React.FC<MapProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = DEFAULT_MARKERS
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Fix Leaflet icon issue
    if (typeof L !== 'undefined') {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: '/leaflet/marker-icon.png',
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
    }

    // Initialize map only if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers and add new ones
    if (mapInstanceRef.current) {
      // Remove existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });

      // Add new markers
      markers.forEach(marker => {
        L.marker(marker.position)
          .bindPopup(marker.popup)
          .addTo(mapInstanceRef.current!);
      });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      className="h-96 w-full z-10" 
      aria-label="Interactive Map"
    />
  );
};