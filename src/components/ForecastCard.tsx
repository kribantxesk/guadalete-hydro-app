import React from 'react';
import { Sparkles } from 'lucide-react';
import { BaseCard } from './BaseCard';

interface ForecastCardProps {
    description: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ description }) => {
    return (
        <BaseCard title="Impacto y Futuro (AEMET)" icon={Sparkles}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {description}
            </div>
        </BaseCard>
    );
};
