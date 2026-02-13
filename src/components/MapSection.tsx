import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, useInView } from "framer-motion";

interface Location {
  country: string;
  lat: number;
  lng: number;
  type: "lived" | "living" | "traveled";
}

const locations: Location[] = [
  // Lived
  { country: "United States", lat: 39.8283, lng: -98.5795, type: "lived" },
  { country: "Hawaii", lat: 20.7984, lng: -156.3319, type: "lived" },
  { country: "France", lat: 46.6034, lng: 1.8883, type: "lived" },
  { country: "Japan", lat: 36.2048, lng: 138.2529, type: "living" },
  { country: "Singapore", lat: 1.3521, lng: 103.8198, type: "lived" },
  // Traveled
  { country: "Brazil", lat: -14.235, lng: -51.9253, type: "traveled" },
  { country: "Argentina", lat: -38.4161, lng: -63.6167, type: "traveled" },
  { country: "Uruguay", lat: -32.5228, lng: -55.7658, type: "traveled" },
  { country: "South Africa", lat: -30.5595, lng: 22.9375, type: "traveled" },
  { country: "Morocco", lat: 31.7917, lng: -7.0926, type: "traveled" },
  { country: "Spain", lat: 40.4637, lng: -3.7492, type: "traveled" },
  { country: "Italy", lat: 41.8719, lng: 12.5674, type: "traveled" },
  { country: "United Kingdom", lat: 55.3781, lng: -3.436, type: "traveled" },
  { country: "Belgium", lat: 50.8503, lng: 4.3517, type: "traveled" },
  { country: "Germany", lat: 51.1657, lng: 10.4515, type: "traveled" },
  { country: "Switzerland", lat: 46.8182, lng: 8.2275, type: "traveled" },
  { country: "Poland", lat: 51.9194, lng: 19.1451, type: "traveled" },
  { country: "Russia", lat: 61.524, lng: 105.3188, type: "traveled" },
  { country: "Finland", lat: 61.9241, lng: 25.7482, type: "traveled" },
  { country: "Sweden", lat: 60.1282, lng: 18.6435, type: "traveled" },
  { country: "Greece", lat: 39.0742, lng: 21.8243, type: "traveled" },
  { country: "Turkey", lat: 38.9637, lng: 35.2433, type: "traveled" },
  { country: "Israel", lat: 31.0461, lng: 34.8516, type: "traveled" },
  { country: "United Arab Emirates", lat: 23.4241, lng: 53.8478, type: "traveled" },
  { country: "South Korea", lat: 35.9078, lng: 127.7669, type: "traveled" },
  { country: "China", lat: 35.8617, lng: 104.1954, type: "traveled" },
  { country: "Thailand", lat: 15.87, lng: 100.9925, type: "traveled" },
  { country: "Vietnam", lat: 14.0583, lng: 108.2772, type: "traveled" },
  { country: "Indonesia", lat: -0.7893, lng: 113.9213, type: "traveled" },
  { country: "Malaysia", lat: 4.2105, lng: 101.9758, type: "traveled" },
  { country: "Philippines", lat: 12.8797, lng: 121.774, type: "traveled" },
  { country: "Czech Republic", lat: 49.8175, lng: 15.473, type: "traveled" },
  { country: "Nepal", lat: 28.3949, lng: 84.124, type: "traveled" },
  { country: "Cambodia", lat: 12.5657, lng: 104.991, type: "traveled" },
  { country: "Netherlands", lat: 52.1326, lng: 5.2913, type: "traveled" },
  { country: "Hungary", lat: 47.1625, lng: 19.5033, type: "traveled" },
  { country: "Serbia", lat: 44.0165, lng: 21.0059, type: "traveled" },
  { country: "Montenegro", lat: 42.7087, lng: 19.3744, type: "traveled" },
  { country: "Croatia", lat: 45.1, lng: 15.2, type: "traveled" },
  { country: "Slovenia", lat: 46.1512, lng: 14.9955, type: "traveled" },
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
const bluePin = createPinIcon("#2563eb");
const greenPin = createPinIcon("#00CC66");

const CountUp = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

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

    // Base layer: Esri World Physical Map (green land, blue ocean)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: US National Park Service",
        maxZoom: 8,
      }
    ).addTo(map);

    // Borders overlay: country boundaries, no labels
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 8,
        opacity: 0.45,
      }
    ).addTo(map);

    const getPin = (t: Location["type"]) =>
      t === "lived" ? redPin : t === "living" ? bluePin : greenPin;
    const getLabel = (t: Location["type"]) =>
      t === "lived" ? "Lived here" : t === "living" ? "Living Here" : "Visited";

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: getPin(loc.type),
      }).addTo(map);

      marker.bindPopup(
        `<div style="font-family:Inter,sans-serif;padding:4px">
          <strong style="font-size:15px">${loc.country}</strong>
          <p style="margin:4px 0 0;color:#555;font-size:13px">${getLabel(loc.type)}</p>
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
        <div
          ref={mapRef}
          className="w-full h-[400px] md:h-[550px]"
          style={{ filter: "saturate(1.6) hue-rotate(-10deg)" }}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <svg width="16" height="24" viewBox="0 0 24 36" fill="none">
            <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 24 12 24s12-15 12-24c0-6.628-5.372-12-12-12z" fill="#FF0000"/>
            <circle cx="12" cy="12" r="5" fill="white"/>
          </svg>
          Countries I've lived in
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="24" viewBox="0 0 24 36" fill="none">
            <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 24 12 24s12-15 12-24c0-6.628-5.372-12-12-12z" fill="#2563eb"/>
            <circle cx="12" cy="12" r="5" fill="white"/>
          </svg>
          Living Here
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="24" viewBox="0 0 24 36" fill="none">
            <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 24 12 24s12-15 12-24c0-6.628-5.372-12-12-12z" fill="#00CC66"/>
            <circle cx="12" cy="12" r="5" fill="white"/>
          </svg>
          Countries I've visited
        </div>
      </div>

      {/* Counter */}
      <motion.p
        className="text-center text-lg md:text-xl font-semibold text-foreground mt-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <CountUp target={40} /> Countries Explored
      </motion.p>
    </section>
  );
};

export default MapSection;
