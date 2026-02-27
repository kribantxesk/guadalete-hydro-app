import React from 'react';
import { Car, AlertOctagon } from 'lucide-react';
import { BaseCard } from './BaseCard';

interface TrafficInfo {
    cut: string[];
    blackRedLevel: string[];
}

interface TrafficCardProps {
    traffic: TrafficInfo;
}

export const TrafficCard: React.FC<TrafficCardProps> = ({ traffic }) => {
    const hasAlerts = traffic.cut.length > 0 || traffic.blackRedLevel.length > 0;

    return (
        <BaseCard title="Carreteras (DGT Cádiz)" icon={Car} alertLevel={hasAlerts ? 'Red' : 'None'}>
            <div className="flex-col" style={{ gap: '1rem' }}>
                <div>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                        <span className="data-label" style={{ color: traffic.cut.length > 0 && traffic.cut[0] !== 'Ninguna trampa de agua detectada.' ? 'var(--status-red)' : 'var(--text-secondary)' }}>
                            <AlertOctagon size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                            Cortadas
                        </span>
                        <span className="data-badge" style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                            {traffic.cut.length > 0 && traffic.cut[0] !== 'Ninguna trampa de agua detectada.' ? traffic.cut.length : 0}
                        </span>
                    </div>
                    {traffic.cut.length > 0 && traffic.cut[0] !== 'Ninguna trampa de agua detectada.' ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {traffic.cut.map((road, idx) => (
                                <span key={idx} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', color: '#ffb3b3' }}>
                                    {road}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                            {traffic.cut.length > 0 ? traffic.cut[0] : 'Ninguna carretera cortada registrada.'}
                        </div>
                    )}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                <div>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                        <span className="data-label" style={{ color: traffic.blackRedLevel.length > 0 ? 'var(--status-yellow)' : 'var(--text-secondary)' }}>
                            Nivel Negro/Rojo
                        </span>
                        <span className="data-badge" style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                            {traffic.blackRedLevel.length}
                        </span>
                    </div>
                    {traffic.blackRedLevel.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {traffic.blackRedLevel.map((road, idx) => (
                                <span key={idx} style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', color: '#fde68a' }}>
                                    {road}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>Ninguna incidencia de nivel negro/rojo.</div>
                    )}
                </div>
            </div>
        </BaseCard>
    );
};
