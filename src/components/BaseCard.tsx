import React from 'react';
import { type LucideIcon } from 'lucide-react';
import './Card.css';

interface BaseCardProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    alertLevel?: 'None' | 'Yellow' | 'Red';
}

export const BaseCard: React.FC<BaseCardProps> = ({ title, icon: Icon, children, className = '', style, alertLevel = 'None' }) => {
    return (
        <div className={`glass-card ${className} ${alertLevel !== 'None' ? `alert-${alertLevel.toLowerCase()}` : ''}`} style={style}>
            <div className="card-header">
                <Icon className="card-icon" size={24} />
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};
