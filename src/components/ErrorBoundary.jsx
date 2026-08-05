import { Component } from 'react';
import { C, GRADIENT } from '../styles/theme';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('FixGo crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{
        minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: C.bg, padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 340 }}>
          <h1 style={{ color: C.text, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ceva n-a mers bine</h1>
          <p style={{ color: C.textMuted, fontSize: 13, marginBottom: 20 }}>
            A apărut o eroare neașteptată. Reîncarcă pagina — dacă problema persistă, spune-ne ce ai făcut înainte să apară.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: GRADIENT, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 12 }}
          >
            Reîncarcă aplicația
          </button>
        </div>
      </div>
    );
  }
}
