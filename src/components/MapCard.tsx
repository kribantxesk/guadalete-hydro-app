import React from 'react';
import { BaseCard } from './BaseCard';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import { Map } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapCardProps {
    riverStations: any[];
    reservoirs: any[];
}

// Approximate coordinates for the region of Cádiz (Río Guadalete / Embalses)
const defaultCenter: [number, number] = [36.65, -5.85];

// Helper to get color based on alert level
const getAlertColor = (alertLvl: number) => {
    switch (alertLvl) {
        case 3: return '#ef4444'; // red
        case 2: return '#f59e0b'; // yellow
        case 1:
        default: return '#10b981'; // green
    }
};

// Hardcoded coordinates for the known stations (approximations for the demo)
const COORDS: Record<string, [number, number]> = {
    'Est. 219 (Junta de los Ríos)': [36.652, -5.864],
    'Est. 220 (Barca de la Florida)': [36.635, -5.927],
    'Est. 212 (Jerez)': [36.666, -6.104],
    'Arcos': [36.757, -5.787],
    'Bornos': [36.834, -5.733],
    'Guadalcacín': [36.759, -5.923],
    'Hurones': [36.653, -5.466]
};

export const MapCard: React.FC<MapCardProps> = ({ riverStations, reservoirs }) => {
    return (
        <BaseCard title="Mapa Interactivo - Cuenca Hidrográfica de Cádiz" style={{ gridColumn: '1 / -1', height: '400px', display: 'flex', flexDirection: 'column' }} icon={Map}>
            <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', marginTop: '1rem', border: '1px solid var(--glass-border)' }}>
                <MapContainer center={defaultCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        className="map-tiles"
                    />

                    {/* Rivers */}
                    {riverStations.map((station, i) => {
                        const coords = COORDS[station.name] || [36.6 + (i * 0.1), -5.8 - (i * 0.1)];
                        const color = getAlertColor(station.alertLvl);

                        return (
                            <CircleMarker
                                key={`r-${i}`}
                                center={coords}
                                pathOptions={{ fillColor: color, color: color, fillOpacity: 0.7 }}
                                radius={12}>
                                <Popup>
                                    <strong>{station.name}</strong><br />
                                    Nivel: {station.level} m<br />
                                    Caudal: {station.flow} m³/s
                                </Popup>
                            </CircleMarker>
                        );
                    })}

                    {/* Reservoirs */}
                    {reservoirs.map((res, i) => {
                        const coords = COORDS[res.name] || [36.8 + (i * 0.1), -5.7 - (i * 0.1)];
                        const isWarning = res.desembalse || res.percentage > 95;
                        const color = isWarning ? '#ef4444' : '#3b82f6'; // Red or Blue

                        return (
                            <CircleMarker
                                key={`res-${i}`}
                                center={coords}
                                pathOptions={{ fillColor: color, color: color, fillOpacity: 0.7 }}
                                radius={12}>
                                <Popup>
                                    <strong>Embalse de {res.name}</strong><br />
                                    Volumen: {res.volume} hm³ ({res.percentage}%)<br />
                                    Variación: {res.var1h > 0 ? '+' : ''}{res.var1h} hm³<br />
                                    Estado: {res.desembalse ? 'Desembalsando' : 'Cerrado'}
                                </Popup>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            </div>

            {/* Dark mode overrides for map tiles */}
            <style>{`
        .map-tiles {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
        }
        .leaflet-container {
          background: #0a0a0f;
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(25, 25, 35, 0.9);
          color: white;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .leaflet-popup-tip {
          background: rgba(25, 25, 35, 0.9);
        }
      `}</style>
        </BaseCard>
    );
};
