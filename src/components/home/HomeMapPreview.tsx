import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CivicReport } from '../../types';
import { Maximize2 } from 'lucide-react';

interface HomeMapPreviewProps {
  reports: CivicReport[];
  onOpenFullMap: () => void;
  onSelectReport: (report: CivicReport) => void;
}

export const HomeMapPreview: React.FC<HomeMapPreviewProps> = ({
  reports,
  onOpenFullMap,
  onSelectReport,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Ward 14 Metro Central coordinates
    const defaultCenter: [number, number] = [12.972, 77.595];

    // Initialize 100% free client-side Leaflet map (Zero Python, Zero API Keys, Zero Watermarks)
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: false,
    });

    // High-performance, 100% free ESRI World Street Map tile layer with NO API key requirement and NO watermark
    const tileLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Esri, HERE, Garmin, USGS, NGA',
      }
    ).addTo(map);

    // Fallback to standard OpenStreetMap if network ever drops
    tileLayer.on('tileerror', () => {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);
    });

    // Invalidate size once container mounts and animation finishes
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Render custom SVG pins for civic hazards
    const markerGroup = L.layerGroup().addTo(map);

    reports.slice(0, 6).forEach((rep) => {
      let color = '#EF4444'; // high
      let pulse = true;
      if (rep.priority === 'medium') {
        color = '#F97316';
        pulse = false;
      } else if (rep.priority === 'resolved') {
        color = '#20B86B';
        pulse = false;
      } else if (rep.priority === 'low') {
        color = '#0EA5E9';
        pulse = false;
      }

      const customIcon = L.divIcon({
        className: 'custom-civic-pin',
        html: `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${pulse ? `<div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${color}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white;">
              ${rep.priority === 'resolved' 
                ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><path d="M12 7v5"></path></svg>'
              }
            </div>
            <div style="position: absolute; bottom: -4px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${color};"></div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      const marker = L.marker(rep.coordinates, { icon: customIcon });
      marker.on('click', () => {
        onSelectReport(rep);
      });
      marker.addTo(markerGroup);
    });

    // Cleanup on unmount
    return () => {
      clearTimeout(resizeTimer);
      map.remove();
    };
  }, [reports, onSelectReport]);

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Priority Legend Pill */}
      <div className="absolute top-2.5 left-2.5 z-[400] bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 text-[10px] font-semibold text-slate-700">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          High
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F97316]" />
          Medium
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#20B86B]" />
          Resolved
        </span>
      </div>

      {/* Expand Full Map Button */}
      <button
        onClick={onOpenFullMap}
        className="absolute bottom-2.5 right-2.5 z-[400] bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-100 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
      >
        <Maximize2 className="w-3.5 h-3.5 text-[#0878D1]" />
        <span>Expand Map</span>
      </button>

      {/* Active Area Overlay Badge */}
      <div className="absolute bottom-2.5 left-2.5 z-[400] bg-[#0B2A52]/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B] animate-pulse" />
        <span>6 Active Pins Nearby</span>
      </div>
    </div>
  );
};
