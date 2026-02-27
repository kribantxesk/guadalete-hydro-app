import React, { useEffect, useState } from 'react';
import { ThermometerSnowflake, Waves, Droplet, Activity } from 'lucide-react';
import { BaseCard } from '../components/BaseCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const HistoryView: React.FC = () => {
    const [historyData, setHistoryData] = useState<Record<string, any[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'https://guadalete-hydro-api.onrender.com/api/history';
                const res = await fetch(apiUrl);
                if (!res.ok) throw new Error('Error al conectar con la base de datos histórica');
                const json = await res.json();

                if (json.error) throw new Error(json.error);

                setHistoryData(json.riverHistory);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '8px', color: 'var(--text-primary)' }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
                    <p style={{ margin: 0, color: '#3b82f6' }}>Nivel: {payload[0].value}m</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                Datos Históricos y Tendencias (Últimas 24h)
            </h2>

            {loading && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    <Activity className="animate-pulse" style={{ margin: '0 auto', marginBottom: '1rem' }} />
                    <p>Consultando base de datos Supabase...</p>
                </div>
            )}

            {error && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--status-yellow)', background: 'rgba(245,158,11,0.1)', borderRadius: '8px' }}>
                    <p>⚠️ {error}</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Asegúrate de haber configurado Supabase en el backend.</p>
                </div>
            )}

            {!loading && !error && historyData && Object.keys(historyData).length > 0 && (
                <>
                    {Object.entries(historyData).map(([stationName, data]) => (
                        <div key={stationName} className="animate-fade-in">
                            <BaseCard title={`Evolución: ${stationName}`} icon={Activity}>
                                <div style={{ height: '250px', width: '100%', marginTop: '1rem' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                                            <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickMargin={10} minTickGap={20} />
                                            <YAxis stroke="var(--text-secondary)" fontSize={12} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area type="monotone" dataKey="level" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLevel)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </BaseCard>
                        </div>
                    ))}
                </>
            )}

            {!loading && !error && historyData && Object.keys(historyData).length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    <p>La base de datos está conectada pero aún no hay suficientes lecturas (espera 15 minutos).</p>
                </div>
            )}

            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }} className="animate-fade-in">
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

                <BaseCard title="Lluvias Torrenciales de Semana Santa (Marzo 2024)" icon={Droplet} alertLevel="Yellow">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Tras un invierno extremadamente seco, la borrasca Nelson cruzó la península durante la Semana Santa dejando precipitaciones históricas. En solo una semana, la cuenca del Guadalete pasó de un estado de pre-alerta por sequía a tener que abrir compuertas puntualmente.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                            <span style={{ color: 'var(--text-primary)' }}>Recuperación Exprés</span>
                            <span style={{ color: 'var(--status-yellow)', fontWeight: 'bold' }}>Del 15% al 70% en 10 días</span>
                        </div>
                    </div>
                </BaseCard>

                <BaseCard title="Sequía Extrema (1995)" icon={Droplet} alertLevel="Yellow">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            La peor sequía del siglo XX en España tuvo su pico en 1995. Los pantanos de la provincia de Cádiz bajaron al 10% de su capacidad. Se impusieron cortes de agua de hasta 10 horas diarias en los núcleos urbanos de la Bahía y Jerez.
                        </p>
                    </div>
                </BaseCard>

                <BaseCard title="El Año de los Diluvios (Marzo 1881)" icon={Waves} alertLevel="Red">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Uno de los desastres hidrológicos más antiguos documentados en Jerez. Las lluvias torrenciales provocaron que el río Guadalete arrasara con puentes, molinos y cientos de cabezas de ganado, aislando la ciudad.
                        </p>
                        <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--status-red)', borderRadius: '0 8px 8px 0' }}>
                            <strong style={{ color: 'var(--status-red)' }}>Dato Histórico:</strong> El agua alcanzó cotas de hasta 6 metros por encima de su cauce habitual en El Portal.
                        </div>
                    </div>
                </BaseCard>

                <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <p>Archivo Histórico Climatológico de Andalucía</p>
                </footer>
            </div>
        </div>
    );
};
