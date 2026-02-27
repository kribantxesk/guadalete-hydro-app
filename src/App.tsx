import { useState, useEffect } from 'react';
import { StatusBanner } from './components/StatusBanner';
import { WeatherCard } from './components/WeatherCard';
import { RiverCard } from './components/RiverCard';
import { ReservoirCard } from './components/ReservoirCard';
import { TrafficCard } from './components/TrafficCard';
import { HydrogeologyCard } from './components/HydrogeologyCard';
import { CoastalCard } from './components/CoastalCard';
import { ForecastCard } from './components/ForecastCard';
import { MapCard } from './components/MapCard';
import { Navbar } from './components/Navbar';
import { HistoryView } from './views/HistoryView';

function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'history'>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('guadalete-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('guadalete-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://guadalete-hydro-api.onrender.com/api/status';
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener datos');
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refrescar cada 60s
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--status-red)' }}>Error conectando con el servidor: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>Cargando datos en tiempo real...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span style={{ fontSize: '1.8rem', marginRight: '0.2rem' }}>⛈️</span>
          RÍO GUADALETE
        </h1>
        <p className="app-subtitle">Informe Hidrográfico en Tiempo Real</p>
      </header>

      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
        {currentView === 'dashboard' ? (
          <>
            <div className="animate-fade-in"><StatusBanner status={data.status} time={data.time} warnings={data.warnings} /></div>
            <div className="animate-fade-in"><WeatherCard stations={data.weatherStations} /></div>
            <div className="animate-fade-in"><RiverCard stations={data.riverStations} /></div>
            <div className="animate-fade-in"><ReservoirCard stations={data.reservoirs} /></div>
            <div className="animate-fade-in"><TrafficCard traffic={data.traffic} /></div>

            <div className="grid-2 animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <HydrogeologyCard
                phreaticLevel={data.hydrogeology.phreaticLevel}
                karsticSaturation={data.hydrogeology.karsticSaturation}
                rain60Days={data.hydrogeology.rain60Days}
                saturationPct={data.hydrogeology.saturationPct}
              />
              <CoastalCard
                tides={data.coastal.tides}
                wind={data.coastal.wind}
              />
            </div>

            <div className="animate-fade-in"><ForecastCard description={data.forecast} /></div>

            <div className="animate-fade-in"><MapCard riverStations={data.riverStations} reservoirs={data.reservoirs} /></div>

            <footer className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              <p>Fuentes: SAIH Hidrosur, Weathercloud, DGT, AEMET</p>
              <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>BANO SOFT</p>
            </footer>
          </>
        ) : (
          <HistoryView />
        )}
      </main>
    </div>
  );
}

export default App;
