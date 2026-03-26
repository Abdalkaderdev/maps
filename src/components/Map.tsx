"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { PlotLocation } from "@/types/plots";

interface MapProps {
  locations: PlotLocation[];
  activeLocationId: string | null;
  opacity: number;
}

export default function Map({ locations, activeLocationId, opacity }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<L.ImageOverlay[]>([]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    });

    // ESRI World Imagery satellite tiles
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }
    ).addTo(map);

    // Zoom control in top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Add image overlays for each location
    const allBounds: L.LatLngBoundsExpression[] = [];

    locations.forEach((loc) => {
      const bounds: L.LatLngBoundsExpression = [
        loc.bounds.southWest,
        loc.bounds.northEast,
      ];
      const overlay = L.imageOverlay(loc.image, bounds, {
        opacity: loc.opacity,
      }).addTo(map);
      overlaysRef.current.push(overlay);
      allBounds.push(bounds);
    });

    // Fit map to show all locations
    if (allBounds.length > 0) {
      const group = L.featureGroup(
        allBounds.map((b) => L.rectangle(b, { stroke: false, fill: false }))
      );
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      overlaysRef.current = [];
    };
  }, [locations]);

  // Fly to active location
  useEffect(() => {
    if (!mapRef.current || !activeLocationId) return;

    const loc = locations.find((l) => l.id === activeLocationId);
    if (!loc) return;

    const bounds: L.LatLngBoundsExpression = [
      loc.bounds.southWest,
      loc.bounds.northEast,
    ];
    mapRef.current.flyToBounds(bounds, {
      padding: [80, 80],
      duration: 1.5,
    });
  }, [activeLocationId, locations]);

  // Update overlay opacity
  useEffect(() => {
    overlaysRef.current.forEach((overlay) => {
      overlay.setOpacity(opacity);
    });
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}
