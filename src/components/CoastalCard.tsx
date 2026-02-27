import React from 'react';
import { Wind } from 'lucide-react';
import { BaseCard } from './BaseCard';

interface CoastalCardProps {
    tides: string;
    wind: string;
}

export const CoastalCard: React.FC<CoastalCardProps> = ({ tides, wind }) => {
    return (
        <BaseCard title="Viento y Costas" icon={Wind}>
            <div className="flex-col" style={{ gap: '0.75rem' }}>
                <div className="data-row">
                    <div className="flex-col" style={{ gap: '0.2rem' }}>
                        <span className="data-label">Mareas (RIOA)</span>
                        <span className="data-value text-muted" style={{ fontSize: '0.9rem', fontFamily: 'inherit' }}>{tides}</span>
                    </div>
                </div>
                <div className="data-row">
                    <div className="flex-col" style={{ gap: '0.2rem' }}>
                        <span className="data-label">Vientos (GPPS 15km)</span>
                        <span className="data-value text-muted" style={{ fontSize: '0.9rem', fontFamily: 'inherit' }}>{wind}</span>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
};
