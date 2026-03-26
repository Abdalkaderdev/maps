"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import plotsConfig from "@/config/plots.json";
import type { PlotsConfig } from "@/types/plots";

// Dynamic import to avoid SSR issues with Leaflet (it needs `window`)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const config = plotsConfig as PlotsConfig;

export default function Home() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(0.7);

  return (
    <main className="app">
      <Sidebar
        companyName={config.companyName}
        locations={config.locations}
        activeLocationId={activeLocationId}
        onSelectLocation={setActiveLocationId}
        opacity={opacity}
        onOpacityChange={setOpacity}
      />
      <Map
        locations={config.locations}
        activeLocationId={activeLocationId}
        opacity={opacity}
      />
    </main>
  );
}
