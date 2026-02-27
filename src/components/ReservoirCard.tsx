import React from 'react';
import { Anchor } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface ReservoirStation {
    name: string;
    volume: number; // hm³
    percentage: number; // %
    var1h: number; // +/- hm³
    desembalse: boolean;
}

interface ReservoirCardProps {
    stations: ReservoirStation[];
}

export const ReservoirCard: React.FC<ReservoirCardProps> = ({ stations }) => {
    const getMaxAlert = () => {
        if (stations.some(s => s.percentage > 95 || s.desembalse)) return 'Red';
        if (stations.some(s => s.percentage > 85)) return 'Yellow';
        return 'None';
    };

    return (
        <BaseCard title="Embalses (Tiempo Real)" icon={Anchor} alertLevel={getMaxAlert()}>
            <div className="flex-col" style={{ gap: '0.75rem' }}>
                {stations.map((s, idx) => (
                    <div key={idx} style={{ padding: '0.75rem', background: s.desembalse ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: s.desembalse ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent' }}>
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                            <span className="data-label" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{s.name}</span>
                            <span style={{ fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px', background: s.desembalse ? 'var(--status-red)' : 'rgba(255,255,255,0.1)', color: s.desembalse ? '#fff' : 'var(--text-secondary)' }}>
                                {s.desembalse ? '⚡ DESEMBALSANDO' : 'Sin desembalse'}
                            </span>
                        </div>

                        <div className="flex-between">
                            <div>
                                <span className="data-value">{s.volume.toFixed(2)}<span className="data-unit">hm³</span></span>
                                <span style={{ color: s.percentage > 90 ? 'var(--status-red)' : 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                    ({s.percentage.toFixed(1)}%)
                                </span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: s.var1h > 0 ? 'var(--status-red)' : s.var1h < 0 ? 'var(--status-green)' : 'var(--text-secondary)' }}>
                                Var 1h: {s.var1h > 0 ? '+' : ''}{s.var1h}
                            </div>
                        </div>

                        {/* ProgressBar */}
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '0.75rem', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(s.percentage, 100)}%`, background: s.percentage > 90 ? 'var(--status-red)' : s.percentage > 75 ? 'var(--status-yellow)' : 'var(--status-green)', transition: 'width 1s ease-in-out' }} />
                        </div>
                    </div>
                ))}
            </div>
        </BaseCard>
    );
};
