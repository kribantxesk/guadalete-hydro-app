import React from 'react';
import { CloudRain } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface WeatherStation {
    name: string;
    intensity: number;
    dailyAcc: number;
    trend: 'Subiendo' | 'Bajando' | 'Estable';
}

interface WeatherCardProps {
    stations: WeatherStation[];
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ stations }) => {
    const getMaxAlert = () => {
        if (stations.some(s => s.intensity > 15 || s.dailyAcc > 60)) return 'Red';
        if (stations.some(s => s.intensity > 5 || s.dailyAcc > 30)) return 'Yellow';
        return 'None';
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'Subiendo': return <span style={{ color: 'var(--status-red)' }}>↑</span>;
            case 'Bajando': return <span style={{ color: 'var(--status-green)' }}>↓</span>;
            default: return <span style={{ color: 'var(--status-yellow)' }}>→</span>;
        }
    };

    return (
        <BaseCard title="Cielo (Weathercloud)" icon={CloudRain} alertLevel={getMaxAlert()}>
            <div className="flex-col" style={{ gap: '1rem' }}>
                {stations.map((s, idx) => (
                    <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                            <strong className="data-label" style={{ color: 'var(--text-primary)' }}>{s.name}</strong>
                            <span style={{ fontSize: '0.8rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                                Tendencia: {getTrendIcon(s.trend)}
                            </span>
                        </div>
                        <div className="grid-2">
                            <div>
                                <div className="data-label" style={{ fontSize: '0.75rem' }}>Intensidad</div>
                                <div className="data-value">{s.intensity}<span className="data-unit">mm/h</span></div>
                            </div>
                            <div>
                                <div className="data-label" style={{ fontSize: '0.75rem' }}>Acumulado Diario</div>
                                <div className="data-value">{s.dailyAcc}<span className="data-unit">mm</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </BaseCard>
    );
};
