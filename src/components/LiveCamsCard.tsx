import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { BaseCard } from './BaseCard';

export const LiveCamsCard: React.FC = () => {
    // Add a timestamp query param to bypass browser image caching when refreshing
    const [timestamp, setTimestamp] = useState(Date.now());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshCameras = () => {
        setIsRefreshing(true);
        setTimestamp(Date.now());
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Auto-refresh every 5 minutes
    useEffect(() => {
        const intervalId = setInterval(refreshCameras, 300000);
        return () => clearInterval(intervalId);
    }, []);

    const cameras = [
        {
            id: 'ap4-jerez',
            name: 'AP-4: Jerez Sur',
            location: 'PK 78.9',
            url: `http://infocar.dgt.es/etraffic/data/camaras/384.jpg?time=`
        },
        {
            id: 'ap4-arcos',
            name: 'AP-4: Enlace Arcos',
            location: 'PK 81.1',
            url: `http://infocar.dgt.es/etraffic/data/camaras/385.jpg?time=`
        },
        {
            id: 'a381-jerez',
            name: 'A-381: Jerez - Medina',
            location: 'PK 2.1',
            url: `http://infocar.dgt.es/etraffic/data/camaras/401.jpg?time=`
        },
        {
            id: 'a381-alcala',
            name: 'A-381: Alcalá de los Gazules',
            location: 'PK 45.0',
            url: `http://infocar.dgt.es/etraffic/data/camaras/407.jpg?time=`
        }
    ];

    return (
        <BaseCard title="Cámaras de Tráfico DGT (En Vivo)" icon={Camera}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    Monitorización de puentes y carreteras clave de la Cuenca.
                </p>
                <button
                    onClick={refreshCameras}
                    className="icon-button"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Actualizar Imágenes"
                >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
            }}>
                {cameras.map((cam) => (
                    <div key={cam.id} style={{
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                            <img
                                src={`${cam.url}${timestamp}`}
                                alt={`Cámara DGT en ${cam.name}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    backgroundColor: '#1e293b' // Placeholder color while loading
                                }}
                                onError={(e) => {
                                    // Fallback if DGT camera is offline
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 225" fill="%231e293b"><rect width="100%" height="100%" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%2364748b">Cámara Temporalmente Offline</text></svg>';
                                }}
                            />
                        </div>
                        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                            <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{cam.name}</h4>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{cam.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </BaseCard>
    );
};
