"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Type definitions
export interface MapMarker {
  position: [number, number];
  popup: string;
}

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
}

// Dynamically import Leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import("./map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    ),
  }
);

const MapWrapper: React.FC<MapProps> = (props) => {
  return (
    <div>
      <DynamicMap {...props} />
    </div>
  );
};

export default MapWrapper;
