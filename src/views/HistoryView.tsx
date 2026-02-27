import React from 'react';
import { ThermometerSnowflake, Waves, Droplet } from 'lucide-react';
import { BaseCard } from '../components/BaseCard';

export const HistoryView: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                Hitos Históricos del Guadalete
            </h2>

            <BaseCard title="Las Grandes Riadas de Jerez (2010)" icon={Waves} alertLevel="Red">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Entre febrero y marzo de 2010, un frente continuado de intensas lluvias obligó a desembalsar más de 1.000 metros cúbicos por segundo desde los pantanos de Bornos, Arcos y Los Hurones.
                        El Río Guadalete alcanzó niveles históricos, inundando barriadas rurales como La Greduela, Las Pachecas, y El Portal en Jerez de la Frontera.
                    </p>
                    <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--status-red)', borderRadius: '0 8px 8px 0' }}>
                        <strong style={{ color: 'var(--status-red)' }}>Impacto Máximo:</strong> Más de 100 familias desalojadas y corte de las principales vías AP-4 y carreteras secundarias.
                    </div>
                </div>
            </BaseCard>

            <BaseCard title="La Nevada de Andalucía (1954)" icon={ThermometerSnowflake} alertLevel="None">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        El 2 de febrero de 1954, una insólita ola de frío siberiano provocó que nevara a nivel del mar en la provincia de Cádiz, un evento que no se ha vuelto a repetir con tal magnitud. Las sierras de Grazalema quedaron completamente incomunicadas.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-primary)' }}>Nieve Acumulada (Sierra)</span>
                        <span style={{ color: '#93c5fd', fontWeight: 'bold' }}>+1.5 metros</span>
                    </div>
                </div>
            </BaseCard>

            <BaseCard title="Sequía Extrema (1995)" icon={Droplet} alertLevel="Yellow">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        La peor sequía del siglo XX en España tuvo su pico en 1995. Los pantanos de la provincia de Cádiz, incluyendo Guadalcacín y Hurones, bajaron al 10% de su capacidad. Se impusieron cortes de agua de hasta 10 horas diarias en los núcleos urbanos de la Bahía de Cádiz y Jerez.
                    </p>
                    <div style={{ padding: '0.8rem', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid var(--status-yellow)', borderRadius: '0 8px 8px 0' }}>
                        <strong style={{ color: 'var(--status-yellow)' }}>Dato Crítico:</strong> El Embalse de Guadalcacín, el mayor de la provincia, casi se secó por completo mostrando ruinas de antiguos cortijos bajo sus aguas.
                    </div>
                </div>
            </BaseCard>

            <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <p>Archivo Histórico Climatológico de Andalucía</p>
            </footer>
        </div>
    );
};
