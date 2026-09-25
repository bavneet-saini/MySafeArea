import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CivicReport, Priority } from '../../types';
import {
  MapPin,
  Filter,
  Layers,
  X,
  Clock,
  ArrowRight,
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface FullMapViewProps {
  reports: CivicReport[];
  selectedWard: string;
  onSelectReport: (report: CivicReport) => void;
}

// 100% Free Tile Layers with ZERO API key required & ZERO watermarks
const TILE_STYLES = {
  streets: {
    name: 'Civic Streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin, USGS',
    maxZoom: 19,
    subdomains: []
  },
  satellite: {
    name: 'Satellite Aerial',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
    subdomains: []
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c']
  },
  gray: {
    name: 'Clean Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin',
    maxZoom: 16,
    subdomains: []
  }
};

export const FullMapView: React.FC<FullMapViewProps> = ({
  reports,
  selectedWard,
  onSelectReport,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeTileStyle, setActiveTileStyle] = useState<keyof typeof TILE_STYLES>('streets');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedPinReport, setSelectedPinReport] = useState<CivicReport | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLayerPicker, setShowLayerPicker] = useState<boolean>(false);

  const filteredReports = reports.filter((rep) => {
    if (filterPriority !== 'all' && rep.priority !== filterPriority) return false;
    if (
      searchQuery &&
      !rep.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !rep.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Ward 14 Metro Central coordinates
    const defaultCenter: [number, number] = [12.972, 77.595];

    // Initialize 100% free client-side Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 14,
      zoomControl: false,
    });

    const styleConfig = TILE_STYLES[activeTileStyle];

    // Load watermark-free public tiles
    const tileLayer = L.tileLayer(styleConfig.url, {
      maxZoom: styleConfig.maxZoom,
      subdomains: styleConfig.subdomains.length ? styleConfig.subdomains : 'abc',
      attribution: styleConfig.attribution,
    }).addTo(map);

    // Fallback if needed
    tileLayer.on('tileerror', () => {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);
    });

    // Invalidate size once container mounts
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const markerGroup = L.layerGroup().addTo(map);

    filteredReports.forEach((rep) => {
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
        className: 'custom-pin-full',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${pulse ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: ${color}; opacity: 0.4; animation: ping 1.8s infinite;"></div>` : ''}
            <div style="width: 30px; height: 30px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
              ${rep.priority === 'resolved' 
                ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><path d="M12 7v5"></path></svg>'
              }
            </div>
            <div style="position: absolute; bottom: -5px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 7px solid ${color};"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      const marker = L.marker(rep.coordinates, { icon: customIcon });
      marker.on('click', () => {
        setSelectedPinReport(rep);
      });
      marker.addTo(markerGroup);
    });

    // Clean unmount on screen transition
    return () => {
      clearTimeout(resizeTimer);
      map.remove();
    };
  }, [filteredReports, activeTileStyle]);

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-hidden select-none">
      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 z-[500] space-y-2 pointer-events-none">
        {/* Search Bar & Layer Switcher */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200/80 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems or street name..."
              className="w-full text-xs font-medium bg-transparent focus:outline-none text-slate-800"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Map Layer Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowLayerPicker(!showLayerPicker)}
              className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center justify-center text-slate-700 hover:bg-white transition-all active:scale-95"
              title="Change Map Style"
            >
              <Layers className="w-4.5 h-4.5 text-[#0878D1]" />
            </button>

            {/* Layer Selection Dropdown */}
            {showLayerPicker && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-[600]">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Map Style (Free)
                </div>
                {(Object.keys(TILE_STYLES) as Array<keyof typeof TILE_STYLES>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTileStyle(key);
                      setShowLayerPicker(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      activeTileStyle === key
                        ? 'bg-blue-50 text-[#0878D1]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{TILE_STYLES[key].name}</span>
                    {activeTileStyle === key && <CheckCircle2 className="w-3.5 h-3.5 text-[#0878D1]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Priority Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pointer-events-auto py-1">
          {[
            { id: 'all', label: 'All Hazards' },
            { id: 'high', label: '🔴 High' },
            { id: 'medium', label: '🟠 Medium' },
            { id: 'resolved', label: '🟢 Resolved' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterPriority(f.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-sm whitespace-nowrap transition-all ${
                filterPriority === f.id
                  ? 'bg-[#0B2A52] text-white shadow-blue-950/20'
                  : 'bg-white/95 text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Bottom Floating Report Preview Sheet if a pin is tapped */}
      {selectedPinReport && (
        <div className="absolute bottom-20 left-4 right-4 z-[500] bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                {selectedPinReport.imageUrl ? (
                  <img
                    src={selectedPinReport.imageUrl}
                    alt={selectedPinReport.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#0878D1]">
                    <MapPin className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ticket #{selectedPinReport.ticketNumber}
                </span>
                <h4 className="text-sm font-extrabold text-[#0B2A52] truncate max-w-[190px]">
                  {selectedPinReport.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {selectedPinReport.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPinReport(null)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                selectedPinReport.priority === 'high'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : selectedPinReport.priority === 'medium'
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {selectedPinReport.priority.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedPinReport.timestamp}
              </span>
            </div>

            <button
              onClick={() => onSelectReport(selectedPinReport)}
              className="px-3 py-1.5 rounded-xl bg-[#0878D1] text-white text-xs font-bold hover:bg-[#076bc0] transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>View Lifecycle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
