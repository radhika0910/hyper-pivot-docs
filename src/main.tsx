import React, { createContext, useContext, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { CssBaseline, ThemeProvider, createTheme, GlobalStyles } from '@mui/material'

/* ── Theme Toggle Context ───────────────────────────────────── */
interface ThemeCtx { mode: 'dark' | 'light'; toggle: () => void }
export const ThemeModeContext = createContext<ThemeCtx>({ mode: 'dark', toggle: () => {} });
export const useThemeMode = () => useContext(ThemeModeContext);

function Root() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const toggle = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#7C3AED', light: '#A78BFA', dark: '#5B21B6' },
      secondary: { main: '#06B6D4' },
      ...(mode === 'dark' ? {
        background: { default: '#000000', paper: '#0A0A0A' },
        text: { primary: '#FAFAFA', secondary: '#A1A1AA' },
        divider: 'rgba(255, 255, 255, 0.08)',
      } : {
        background: { default: '#FAFAFA', paper: '#FFFFFF' },
        text: { primary: '#18181B', secondary: '#71717A' },
        divider: 'rgba(0, 0, 0, 0.08)',
      }),
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.04em' },
      h2: { fontWeight: 800, letterSpacing: '-0.03em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none' as const, fontWeight: 600 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiPaper: { styleOverrides: { root: {
        backgroundImage: 'none',
        backgroundColor: mode === 'dark' ? 'rgba(15,15,15,0.6)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        boxShadow: mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.06)',
      }}},
      MuiDrawer: { styleOverrides: { paper: {
        backgroundColor: mode === 'dark' ? '#000' : '#FAFAFA',
        borderRight: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
      }}},
      MuiAppBar: { styleOverrides: { root: {
        backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
        color: mode === 'dark' ? '#FAFAFA' : '#18181B',
      }}},
      MuiListItemButton: { styleOverrides: { root: {
        borderRadius: 12, margin: '4px 12px', padding: '8px 16px', transition: 'all 0.2s',
        '&.Mui-selected': { backgroundColor: 'rgba(124,58,237,0.15)', '&:hover': { backgroundColor: 'rgba(124,58,237,0.25)' } },
        '&:hover': { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
      }}},
    },
  }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{
          '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap')",
          'body': { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
          '::-webkit-scrollbar': { width: 8, height: 8 },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: 4 },
          '@keyframes float': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
          '@keyframes glow': { '0%,100%': { opacity: 0.4, transform: 'scale(1)' }, '50%': { opacity: 0.7, transform: 'scale(1.05)' } },
          '@keyframes slideUp': { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          '@keyframes gradientShift': { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
          '@keyframes pulse': { '0%,100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(124,58,237,0)' } },
        }} />
        <App />
        <Analytics />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><Root /></React.StrictMode>,
)
