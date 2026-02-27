import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { type StatusLevel, getStatusColor, getStatusGlow } from '../utils/styles';
import './StatusBanner.css';

interface StatusBannerProps {
    status: StatusLevel;
    time: string;
    warnings?: string[];
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ status, time, warnings = [] }) => {
    const getIcon = () => {
        switch (status) {
            case 'Green': return <CheckCircle size={28} className="status-icon" />;
            case 'Yellow': return <AlertTriangle size={28} className="status-icon" />;
            case 'Red': return <AlertCircle size={28} className="status-icon animate-pulse" />;
            case 'Black': return <AlertTriangle size={28} className="status-icon animate-pulse" />;
            default: return <Info size={28} />;
        }
    };

    const getLabel = () => {
        switch (status) {
            case 'Green': return 'SITUACIÓN NORMAL';
            case 'Yellow': return 'PRECAUCIÓN';
            case 'Red': return 'ALERTA MÁXIMA';
            case 'Black': return 'EMERGENCIA GRAVE';
            default: return 'DESCONOCIDO';
        }
    }

    return (
        <div
            className="status-banner"
            style={{
                '--banner-color': getStatusColor(status),
                '--banner-glow': getStatusGlow(status),
            } as React.CSSProperties}
        >
            <div className="status-content">
                <div className="status-header">
                    {getIcon()}
                    <div>
                        <h2 className="status-title">{getLabel()}</h2>
                        <p className="status-time">Actualizado: {time}</p>
                    </div>
                </div>
                <div className="status-badge">Nivel {status.toUpperCase()}</div>
            </div>

            {warnings.length > 0 && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Avisos AEMET Activos:</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {warnings.map((w, idx) => (
                            <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertTriangle size={14} color="var(--status-yellow)" />
                                {w}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
