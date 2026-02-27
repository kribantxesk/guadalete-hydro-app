import React from 'react';
import { Waves } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { BaseCard } from './BaseCard';

export interface RiverStation {
    name: string;
    level: number;
    flow: number;
    history?: number[];
    alertLvl: 1 | 2 | 3;
}

interface RiverCardProps {
    stations: RiverStation[];
}

export const RiverCard: React.FC<RiverCardProps> = ({ stations }) => {
    const getMaxAlert = () => {
        if (stations.some(s => s.alertLvl === 3)) return 'Red';
        if (stations.some(s => s.alertLvl === 2)) return 'Yellow';
        return 'None';
    };

    return (
        <BaseCard title="Ríos (SAIH Hidrosur)" icon={Waves} alertLevel={getMaxAlert()}>
            <div className="flex-col" style={{ gap: '0.5rem' }}>
                {stations.map((s, idx) => {
                    const chartData = s.history ? s.history.map((val, i) => ({ time: i, value: val })) : [];
                    const strokeColor = s.alertLvl === 3 ? '#ef4444' : s.alertLvl === 2 ? '#f59e0b' : '#3b82f6';

                    return (
                        <div key={idx} className="data-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.8rem', paddingTop: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div className="data-label">{s.name}</div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <span className="data-value">{s.level.toFixed(2)}<span className="data-unit">m</span></span>
                                        <span style={{ color: 'var(--text-secondary)' }}>|</span>
                                        <span className="data-value">{s.flow.toFixed(1)}<span className="data-unit">m³/s</span></span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: s.alertLvl === 3 ? 'var(--status-red)' : s.alertLvl === 2 ? 'var(--status-yellow)' : 'var(--status-green)', marginTop: '2px' }}>
                                        Nivel {s.alertLvl}
                                    </div>
                                </div>
                            </div>
                            {chartData.length > 0 && (
                                <div style={{ width: '100%', height: '40px', marginTop: '4px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <YAxis domain={['dataMin', 'dataMax']} hide />
                                            <Tooltip
                                                formatter={(value: number) => [`${value}m`, 'Nivel']}
                                                labelFormatter={() => ''}
                                                contentStyle={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                            />
                                            <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={false} isAnimationActive={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </BaseCard>
    );
};
