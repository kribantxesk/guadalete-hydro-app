import React from 'react';
import { LayoutDashboard, History, Sun, Moon } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
    currentView: 'dashboard' | 'history';
    onViewChange: (view: 'dashboard' | 'history') => void;
    theme?: 'light' | 'dark';
    onThemeToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, theme = 'dark', onThemeToggle }) => {
    return (
        <nav className="navbar">
            <button
                className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => onViewChange('dashboard')}
            >
                <LayoutDashboard size={18} />
                <span>Tiempo Real</span>
            </button>
            <button
                className={`nav-button ${currentView === 'history' ? 'active' : ''}`}
                onClick={() => onViewChange('history')}
            >
                <History size={18} />
                <span>Hitos Históricos</span>
            </button>

            <div style={{ flex: 1 }}></div>

            {onThemeToggle && (
                <button
                    className="nav-button"
                    onClick={onThemeToggle}
                    title="Alternar tema"
                    style={{ padding: '0.5rem' }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            )}
        </nav>
    );
};
