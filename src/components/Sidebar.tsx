"use client";

import type { PlotLocation } from "@/types/plots";

interface SidebarProps {
  companyName: string;
  locations: PlotLocation[];
  activeLocationId: string | null;
  onSelectLocation: (id: string) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
}

export default function Sidebar({
  companyName,
  locations,
  activeLocationId,
  onSelectLocation,
  opacity,
  onOpacityChange,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">{companyName}</h1>
        <p className="sidebar-subtitle">Plot Map Viewer</p>
      </div>

      <div className="sidebar-locations">
        <div className="sidebar-label">Locations</div>
        {locations.map((loc) => (
          <button
            key={loc.id}
            className={`location-card ${activeLocationId === loc.id ? "active" : ""}`}
            onClick={() => onSelectLocation(loc.id)}
          >
            <div className="location-name">{loc.name}</div>
            {loc.description && (
              <div className="location-desc">{loc.description}</div>
            )}
          </button>
        ))}
      </div>

      <div className="sidebar-controls">
        <div className="sidebar-label">Overlay Opacity</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
          className="opacity-slider"
        />
        <div className="opacity-value">{Math.round(opacity * 100)}%</div>
      </div>
    </div>
  );
}
