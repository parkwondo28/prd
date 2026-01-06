'use client';

import { useEffect, useRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMapStore } from '@/store/mapStore';
import type { Cafe } from '@/lib/types/cafe';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet 기본 아이콘 설정 (Next.js에서 경로 문제 해결)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapContainerProps {
  cafes: Cafe[];
  onMarkerClick: (cafe: Cafe) => void;
}

// 지도 중심 업데이트 컴포넌트
function MapUpdater({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [center, zoom, map]);

  return null;
}

// 커스텀 마커 아이콘 생성
function createCustomIcon() {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: #3b82f6;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        font-size: 14px;
      ">☕</div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function MapContainer({ cafes, onMarkerClick }: MapContainerProps) {
  const { center, zoom } = useMapStore();

  // 기본 위치 설정
  const mapCenter = center || { lat: 37.5665, lng: 126.9780 }; // 서울시청
  const mapZoom = zoom || 15;

  return (
    <div className="w-full h-full">
      <LeafletMapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={mapCenter} zoom={mapZoom} />

        {cafes.map((cafe) => (
          <Marker
            key={cafe.id}
            position={[cafe.latitude, cafe.longitude]}
            icon={createCustomIcon()}
            eventHandlers={{
              click: () => {
                onMarkerClick(cafe);
              },
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{cafe.name}</h3>
                <p className="text-xs text-gray-600">{cafe.address}</p>
                {cafe.distance !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">
                    거리: {cafe.distance < 1000 ? `${Math.round(cafe.distance)}m` : `${(cafe.distance / 1000).toFixed(1)}km`}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMapContainer>
    </div>
  );
}
