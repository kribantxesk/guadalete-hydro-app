import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export const ReloadPrompt: React.FC = () => {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r: ServiceWorkerRegistration | undefined) {
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error: Error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setNeedRefresh(false)
    }

    if (!needRefresh) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            zIndex: 9999,
            backgroundColor: 'var(--bg-secondary)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '300px'
        }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Nueva versión disponible</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Haz clic en recargar para actualizar la app.</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                    onClick={() => updateServiceWorker(true)}
                    style={{ flex: 1, padding: '0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Recargar
                </button>
                <button
                    onClick={() => close()}
                    style={{ flex: 1, padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}
