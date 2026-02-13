import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  country: string;
  cities: string[];
  lat: number;
  lng: number;
  type: "lived" | "traveled";
}

const locations: Location[] = [
  { country: "Japan", cities: ["Tokyo"], lat: 35.6762, lng: 139.6503, type: "lived" },
  { country: "Singapore", cities: ["Singapore"], lat: 1.3521, lng: 103.8198, type: "lived" },
  { country: "United States", cities: ["New York"], lat: 40.7128, lng: -74.006, type: "lived" },
  { country: "France", cities: ["Paris"], lat: 48.8566, lng: 2.3522, type: "lived" },
  { country: "Thailand", cities: ["Bangkok", "Chiang Mai"], lat: 13.7563, lng: 100.5018, type: "traveled" },
  { country: "South Korea", cities: ["Seoul"], lat: 37.5665, lng: 126.978, type: "traveled" },
  { country: "Australia", cities: ["Sydney", "Melbourne"], lat: -33.8688, lng: 151.2093, type: "traveled" },
  { country: "United Kingdom", cities: ["London"], lat: 51.5074, lng: -0.1278, type: "traveled" },
  { country: "Germany", cities: ["Berlin", "Munich"], lat: 52.52, lng: 13.405, type: "traveled" },
  { country: "Italy", cities: ["Rome", "Milan"], lat: 41.9028, lng: 12.4964, type: "traveled" },
];

const createPinIcon = (color: string) =>
  L.divIcon({
    html: `<svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 24 12 24s12-15 12-24c0-6.628-5.372-12-12-12z" fill="${color}"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`,
    className: "",
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });

const redPin = createPinIcon("#FF0000");
const greenPin = createPinIcon("#00CC66");

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: loc.type === "lived" ? redPin : greenPin,
      }).addTo(map);

      marker.bindPopup(
        `<div style="font-family:Inter,sans-serif;padding:4px">
          <strong style="font-size:15px">${loc.country}</strong>
          <p style="margin:4px 0 0;color:#555;font-size:13px">${loc.cities.join(" · ")}</p>
        </div>`,
        { className: "custom-popup" }
      );
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <section id="map" className="py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-tight">
        Where I've Been
      </h2>
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-md">
        <div ref={mapRef} className="w-full h-[400px] md:h-[550px]" />
      </div>

      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary inline-block" />
          Lived
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#00CC66" }} />
          Traveled
        </div>
      </div>
    </section>
  );
};

export default MapSection;
