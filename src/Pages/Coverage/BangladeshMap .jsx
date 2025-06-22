// src/components/BangladeshMap.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// helper component

const FlyToDistrict = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10);
    }
  }, [position, map]);
  return null;
};

const BangladeshMap = ({ districtData, searchTerm }) => {
  const markerRefs = useRef([]);
  const position = [23.685, 90.3563]; // Center of Bangladesh

  const matchedDistrict = districtData.find((d) =>
    d.district.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  useEffect(() => {
    if (matchedDistrict && markerRefs.current.length > 0) {
      const index = districtData.findIndex(
        (d) => d.district === matchedDistrict.district
      );
      const marker = markerRefs.current[index];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [matchedDistrict, districtData]);

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />

      {matchedDistrict && (
        <FlyToDistrict
          position={[matchedDistrict.latitude, matchedDistrict.longitude]}
        />
      )}

      {/* Example marker: Dhaka */}
      {districtData.map((district, index) => (
        <Marker
          key={index}
          position={[district.latitude, district.longitude]}
          ref={(el) => (markerRefs.current[index] = el)}
        >
          <Popup>
            <h3 className="font-bold">{district.district}</h3>
            <p>
              Region: {district.region} <br />
              Areas: {district.covered_area.join(", ")}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BangladeshMap;
