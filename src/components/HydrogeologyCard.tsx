import React from 'react';
import { Mountain, Droplet, Info } from 'lucide-react';
import { BaseCard } from './BaseCard';

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
    <div className="info-tooltip-container">
        <Info size={14} className="info-tooltip-icon" />
        <span className="info-tooltip-content">{text}</span>
    </div>
);

interface HydrogeologyCardProps {
    phreaticLevel: string;
    karsticSaturation: string;
    rain60Days?: number;
    saturationPct?: number;
}

export const HydrogeologyCard: React.FC<HydrogeologyCardProps> = ({
    phreaticLevel,
    karsticSaturation,
    rain60Days = 0,
    saturationPct = 0
}) => {
    // Determine dynamic colors
    let color = 'var(--status-green)';
    let alertLvl: 'None' | 'Yellow' | 'Red' | 'Black' = 'None';

    if (saturationPct >= 95) {
        color = 'var(--status-red)';
        alertLvl = 'Red';
    }
    else if (saturationPct >= 80 || rain60Days > 200) {
        color = 'var(--status-yellow)';
        alertLvl = 'Yellow';
    }

    return (
        <BaseCard title="Hidrogeología del Subsuelo" icon={Mountain} alertLevel={alertLvl}>
            <div className="flex-col" style={{ gap: '1.25rem' }}>

                {/* Visual Saturation Bar */}
                <div className="flex-col" style={{ gap: '0.4rem' }}>
                    <div className="flex-between">
                        <span className="data-label" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            Nivel de Saturación Kárstica
                            <InfoTooltip text="La Sierra de Grazalema es de roca caliza (Kárstica). Actúa como una esponja gigante. Un porcentaje alto indica que el subsuelo está lleno y no puede absorber más agua rápida, aumentando el riesgo de riadas súbitas en el Guadalete." />
                        </span>
                        <span style={{ color, fontSize: '1.1rem', fontWeight: 'bold' }}>{saturationPct}%</span>
                    </div>
                    <div className="progress-bg" style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                        <div
                            className="progress-fill"
                            style={{
                                width: `${saturationPct}%`,
                                background: color,
                                height: '100%',
                                borderRadius: '5px',
                                transition: 'width 1s ease-out'
                            }}
                        />
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                        {karsticSaturation.split('-')[1]?.trim() || karsticSaturation}
                    </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                {/* Rain 60 days Metric */}
                <div className="flex-col" style={{ gap: '0.2rem' }}>
                    <div className="flex-between">
                        <span className="data-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Droplet size={14} color="var(--text-secondary)" />
                            Lluvia Acumulada (60 Días)
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{rain60Days.toFixed(1)} mm</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                        {phreaticLevel.split('(')[0].trim()}
                        <InfoTooltip text="El nivel freático indica a qué profundidad está el agua acumulada bajo tierra. Si llueve mucho de golpe pero el acuífero estaba muy bajo (Profundo), el riesgo de riada es menor porque la tierra aún puede absorber millones de litros." />
                    </div>
                </div>

            </div>
        </BaseCard>
    );
};
