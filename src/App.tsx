import React, { useState } from 'react';
import { PivotGrid } from 'hyper-pivot';
import { Box, Typography, Paper, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, useTheme, useMediaQuery, Chip, Fade, Collapse, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StorageIcon from '@mui/icons-material/Storage';
import TuneIcon from '@mui/icons-material/Tune';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import { propCategories, PropCategory } from './propData';
import { useThemeMode } from './main';

const DW = 260;
const sampleData = [
  { Region: 'North', Country: 'USA', City: 'New York', Category: 'Electronics', SubCategory: 'Mobile', Product: 'iPhone 14', Sales: 4500, Qty: 12, Profit: 800 },
  { Region: 'North', Country: 'USA', City: 'Boston', Category: 'Electronics', SubCategory: 'Laptop', Product: 'MacBook Pro', Sales: 8000, Qty: 8, Profit: 1500 },
  { Region: 'South', Country: 'USA', City: 'Miami', Category: 'Furniture', SubCategory: 'Chair', Product: 'Ergonomic Chair', Sales: 1200, Qty: 20, Profit: 250 },
  { Region: 'South', Country: 'USA', City: 'Atlanta', Category: 'Furniture', SubCategory: 'Table', Product: 'Dining Table', Sales: 2500, Qty: 5, Profit: 600 },
  { Region: 'East', Country: 'UK', City: 'London', Category: 'Electronics', SubCategory: 'Mobile', Product: 'Samsung S23', Sales: 3800, Qty: 10, Profit: 500 },
  { Region: 'West', Country: 'Germany', City: 'Berlin', Category: 'Office Supplies', SubCategory: 'Pen', Product: 'Parker Pen', Sales: 400, Qty: 100, Profit: 120 },
  { Region: 'West', Country: 'Germany', City: 'Munich', Category: 'Furniture', SubCategory: 'Chair', Product: 'Office Chair', Sales: 1500, Qty: 15, Profit: 300 },
];

const catIcons: Record<string, React.ReactNode> = { storage: <StorageIcon fontSize="small" />, tune: <TuneIcon fontSize="small" />, palette: <PaletteIcon fontSize="small" />, toggle_on: <ToggleOnIcon fontSize="small" />, view_list: <ViewListIcon fontSize="small" />, code: <CodeIcon fontSize="small" /> };

const Code: React.FC<{ children: string; color?: string }> = ({ children, color = '#06B6D4' }) => (
  <Box sx={{ backgroundColor: 'rgba(0,0,0,0.5)', p: 2.5, borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
    <Typography component="pre" sx={{ m: 0, fontFamily: '"Fira Code", monospace', color, fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre' }}>{children}</Typography>
  </Box>
);

const ApiCard: React.FC<{ cat: PropCategory }> = ({ cat }) => {
  const [open, setOpen] = useState(true);
  return (
    <Paper elevation={0} sx={{ mb: 3, overflow: 'hidden', animation: 'slideUp 0.5s ease-out' }}>
      <Box onClick={() => setOpen(!open)} sx={{ p: 3, display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:hover': { backgroundColor: 'rgba(124,58,237,0.04)' } }}>
        <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>{catIcons[cat.icon]}</Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{cat.title}</Typography>
          <Typography variant="body2" color="text.secondary">{cat.description}</Typography>
        </Box>
        <Chip label={`${cat.props.length}`} size="small" sx={{ mr: 2, backgroundColor: 'rgba(124,58,237,0.15)', color: '#A78BFA', fontWeight: 700 }} />
        {open ? <ExpandLessIcon sx={{ color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
      </Box>
      <Collapse in={open}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <TableRow>
                {['Property', 'Type', 'Default', 'Description'].map(h => (
                  <TableCell key={h} sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cat.props.map(p => (
                <TableRow key={p.name} sx={{ transition: 'background 0.2s', '&:hover': { backgroundColor: 'rgba(124,58,237,0.04)' } }}>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}><Chip label={p.name} size="small" sx={{ backgroundColor: p.required ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.05)', color: p.required ? '#A78BFA' : 'text.primary', fontWeight: 600, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem' }} /></TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}><Typography sx={{ fontFamily: 'monospace', color: '#38BDF8', fontSize: '0.8rem' }}>{p.type}</Typography></TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}><Typography sx={{ fontFamily: 'monospace', color: '#34D399', fontSize: '0.8rem' }}>{p.defaultValue || '—'}</Typography></TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}><Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>{p.description}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Paper>
  );
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [section, setSection] = useState('demo');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggle } = useThemeMode();
  const isDark = mode === 'dark';

  const nav = [
    { id: 'demo', label: 'Interactive Demo', icon: <AutoAwesomeMosaicIcon fontSize="small" /> },
    { id: 'installation', label: 'Installation', icon: <TerminalIcon fontSize="small" /> },
    { id: 'customize', label: 'Customization', icon: <PaletteIcon fontSize="small" /> },
    { id: 'api', label: 'API Reference', icon: <CodeIcon fontSize="small" /> },
  ];
  const totalProps = propCategories.reduce((s, c) => s + c.props.length, 0);

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ py: 3 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, boxShadow: '0 0 20px rgba(124,58,237,0.4)', background: '#000', img: { width: '100%', height: '100%', objectFit: 'cover' } }}>
          <img src="/public/logo.png" alt="Hyper Pivot Logo" />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, lineHeight: 1.2 }}>Hyper Pivot</Typography>
          <Typography variant="caption" color="text.secondary">by code_radds</Typography>
        </Box>
      </Toolbar>
      <List sx={{ pt: 2, flexGrow: 1 }}>
        <Typography variant="overline" sx={{ px: 3, color: 'text.secondary', fontWeight: 600, letterSpacing: 1.2 }}>Docs</Typography>
        {nav.map((item, i) => (
          <ListItem key={item.id} disablePadding sx={{ mt: 0.5, animation: `slideUp 0.4s ease-out ${i * 0.08}s both` }}>
            <ListItemButton selected={section === item.id} onClick={() => { setSection(item.id); if (isMobile) setMobileOpen(false); }}>
              <ListItemIcon sx={{ color: section === item.id ? theme.palette.primary.light : 'text.secondary', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: section === item.id ? 600 : 500, fontSize: '0.9rem', color: section === item.id ? 'text.primary' : 'text.secondary' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3 }}><Typography variant="caption" color="text.secondary">v0.1.0 • MIT License</Typography></Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={0} sx={{ width: { md: `calc(100% - ${DW}px)` }, ml: { md: `${DW}px` } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: 'none' } }}><MenuIcon /></IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            <IconButton onClick={toggle} sx={{ mr: 1, border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', '&:hover': { transform: 'rotate(180deg)', backgroundColor: 'rgba(124,58,237,0.1)' } }}>
              {isDark ? <LightModeIcon sx={{ color: '#EAB308', fontSize: 20 }} /> : <DarkModeIcon sx={{ color: '#7C3AED', fontSize: 20 }} />}
            </IconButton>
          </Tooltip>
          <Chip label={`${totalProps} Props`} size="small" sx={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: '#fff', fontWeight: 600, borderRadius: 2, animation: 'pulse 2s infinite' }} />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DW }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DW } }}>{drawer}</Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: DW } }} open>{drawer}</Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 6 }, width: { md: `calc(100% - ${DW}px)` }, mt: 8 }}>
        <Fade in timeout={500} key={section}>
          <Box sx={{ maxWidth: 1000, mx: 'auto' }}>

            {/* Hero */}
            <Box sx={{ mb: 6, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: -120, left: -120, width: 350, height: 350, background: `radial-gradient(circle, ${isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.06)'} 0%, transparent 70%)`, animation: 'glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.05)'} 0%, transparent 70%)`, animation: 'glow 5s ease-in-out 1s infinite', pointerEvents: 'none' }} />
              <Typography variant="h2" sx={{ position: 'relative', fontWeight: 800, mb: 2, background: isDark ? 'linear-gradient(135deg, #FFFFFF 0%, #A1A1AA 100%)' : 'linear-gradient(135deg, #18181B 0%, #52525B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'slideUp 0.6s ease-out' }}>
                {nav.find(i => i.id === section)?.label}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ position: 'relative', fontWeight: 400, maxWidth: 700, lineHeight: 1.6, animation: 'slideUp 0.6s ease-out 0.1s both' }}>
                {section === 'demo' && "Drag fields to dynamically pivot your data. Built for modern enterprise React apps."}
                {section === 'installation' && "Add Hyper Pivot to your project in seconds. Zero bloat, perfect MUI integration."}
                {section === 'customize' && "Full theme & color control. Make it yours with a few lines of config."}
                {section === 'api' && `Explore all ${totalProps} props across ${propCategories.length} categories. Fully typed.`}
              </Typography>
            </Box>

            {/* Demo */}
            {section === 'demo' && (
              <Paper elevation={0} sx={{ height: 650, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.5s ease-out 0.2s both' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                  {['#EF4444', '#EAB308', '#22C55E'].map(c => <Box key={c} sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.3)' } }} />)}
                  <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary', fontFamily: 'monospace' }}>preview.tsx</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
                  <PivotGrid data={sampleData} initialRows={['Region', 'Country']} initialColumns={['Category']} initialValues={['Sales']} initialAggregation="sum" themeMode={mode} />
                </Box>
              </Paper>
            )}

            {/* Installation */}
            {section === 'installation' && (
              <Box>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, animation: 'slideUp 0.5s ease-out 0.15s both' }}>
                  <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))', color: 'primary.light', fontSize: '0.9rem', mr: 2, animation: 'float 3s ease-in-out infinite' }}>1</Box>
                    Install Packages
                  </Typography>
                  <Code>npm install hyper-pivot @mui/material @emotion/react @emotion/styled</Code>
                </Paper>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, animation: 'slideUp 0.5s ease-out 0.3s both' }}>
                  <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))', color: 'primary.light', fontSize: '0.9rem', mr: 2, animation: 'float 3s ease-in-out 0.5s infinite' }}>2</Box>
                    Quick Start
                  </Typography>
                  <Code color="#E2E8F0">{`import { PivotGrid } from 'hyper-pivot';

const data = [
  { Region: 'North', Sales: 4500, City: 'New York' },
  { Region: 'South', Sales: 1200, City: 'Miami' },
];

export function Dashboard() {
  return (
    <PivotGrid
      data={data}
      initialRows={['Region']}
      initialValues={['Sales']}
      initialAggregation="sum"
      themeMode="dark"
      features={{ export: true, pagination: true }}
      onCellClick={(cell) => console.log(cell)}
    />
  );
}`}</Code>
                </Paper>
              </Box>
            )}

            {/* Customization */}
            {section === 'customize' && (
              <Box>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, animation: 'slideUp 0.5s ease-out 0.15s both' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>🎨 Theme Mode</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Switch between light, dark, or auto (inherits from your MUI ThemeProvider).</Typography>
                  <Code color="#E2E8F0">{`<PivotGrid
  data={myData}
  themeMode="dark"    // 'light' | 'dark' | 'auto'
/>`}</Code>
                </Paper>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, animation: 'slideUp 0.5s ease-out 0.3s both' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>🎯 Custom Colors</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Override any color token to match your brand identity.</Typography>
                  <Code color="#E2E8F0">{`<PivotGrid
  data={myData}
  colors={{
    primary: '#7C3AED',
    secondary: '#06B6D4',
    headerBackground: '#1E1B4B',
    headerText: '#E0E7FF',
    rowHover: 'rgba(124, 58, 237, 0.08)',
    grandTotalBackground: '#312E81',
    divider: 'rgba(255, 255, 255, 0.06)',
    textPrimary: '#FAFAFA',
    textSecondary: '#A1A1AA',
  }}
/>`}</Code>
                  <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['#7C3AED', '#06B6D4', '#1E1B4B', '#E0E7FF', '#312E81', '#EF4444', '#22C55E', '#EAB308'].map(c => (
                      <Tooltip key={c} title={c}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: c, border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'scale(1.2) rotate(5deg)', boxShadow: `0 0 20px ${c}60` } }} />
                      </Tooltip>
                    ))}
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, animation: 'slideUp 0.5s ease-out 0.45s both' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>📐 Layout Control</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Position the sidebar, toggle sections, and control column widths.</Typography>
                  <Code color="#E2E8F0">{`<PivotGrid
  data={myData}
  layout={{
    sidebarPosition: 'left',   // 'left' | 'right' | 'both' | 'none'
    sidebarWidth: 320,
    sidebarSections: {
      rows: true,
      columns: true,
      values: true,
      allFields: true,
      search: true,
      aggregationPicker: true,
    },
    minColumnWidth: 120,
    stickyColumnWidth: 200,
  }}
/>`}</Code>
                </Paper>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, animation: 'slideUp 0.5s ease-out 0.6s both' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>⚡ Feature Flags</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Toggle every feature independently. Ship exactly what your users need.</Typography>
                  <Code color="#E2E8F0">{`<PivotGrid
  data={myData}
  features={{
    dragAndDrop: true,
    pagination: true,
    expandCollapse: true,
    grandTotal: true,
    search: true,
    export: true,            // CSV & Excel export
    groupedFlatToggle: true, // Switch grouped ↔ flat view
    refreshButton: true,
    performanceMetrics: true, // Show processing time chips
    columnExpansion: true,
  }}
/>`}</Code>
                </Paper>
              </Box>
            )}

            {/* API Reference */}
            {section === 'api' && (
              <Box>
                {propCategories.map((cat, i) => (
                  <Box key={cat.id} sx={{ animation: `slideUp 0.5s ease-out ${0.1 + i * 0.08}s both` }}>
                    <ApiCard cat={cat} />
                  </Box>
                ))}
              </Box>
            )}

          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
