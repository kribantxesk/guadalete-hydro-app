import React from 'react';
import { LayoutDashboard, History } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
    currentView: 'dashboard' | 'history';
    onViewChange: (view: 'dashboard' | 'history') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
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
        </nav>
    );
};
