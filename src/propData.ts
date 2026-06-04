// All PivotGrid props organized by category for the documentation
export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface PropCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  props: PropDoc[];
}

export const propCategories: PropCategory[] = [
  {
    id: 'data',
    title: 'Data Source',
    icon: 'storage',
    description: 'Configure where your data comes from — local JSON arrays or remote server endpoints.',
    props: [
      { name: 'data', type: 'Record<string, any>[]', required: false, description: 'Local flat JSON array. Keys are auto-detected as pivot fields.' },
      { name: 'dataSource', type: 'ServerDataSource', required: false, description: 'Server-side data source with URL, headers, query builder, and response transformer for large datasets.' },
      { name: 'fields', type: 'PivotFieldMeta[]', required: false, description: 'Explicit field metadata (name, type, label, format). Auto-inferred from data if omitted.' },
    ]
  },
  {
    id: 'config',
    title: 'Initial Configuration',
    icon: 'tune',
    description: 'Pre-configure the pivot layout so users see meaningful data on first render.',
    props: [
      { name: 'initialRows', type: 'string[]', required: false, description: 'Fields placed in the Row axis on mount.', defaultValue: '[]' },
      { name: 'initialColumns', type: 'string[]', required: false, description: 'Fields placed in the Column axis on mount.', defaultValue: '[]' },
      { name: 'initialValues', type: 'string[]', required: false, description: 'Numeric fields used for aggregated cell values.', defaultValue: '[]' },
      { name: 'initialAggregation', type: "'sum' | 'avg' | 'count' | 'min' | 'max'", required: false, description: 'Default aggregation function applied to value fields.', defaultValue: "'sum'" },
      { name: 'initialFilters', type: 'PivotFilter[]', required: false, description: 'Pre-applied filters. Each filter specifies a field and allowed values.' },
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'palette',
    description: 'Full visual control — theme, colors, layout, sizing, and typography.',
    props: [
      { name: 'height', type: 'string | number', required: false, description: 'Container height. Accepts CSS values or pixel numbers.', defaultValue: "'100%'" },
      { name: 'width', type: 'string | number', required: false, description: 'Container width.', defaultValue: "'100%'" },
      { name: 'themeMode', type: "'light' | 'dark' | 'auto'", required: false, description: 'Color scheme. "auto" inherits from parent MUI ThemeProvider.', defaultValue: "'light'" },
      { name: 'colors', type: 'PivotGridColors', required: false, description: 'Override individual colors: primary, headerBackground, headerText, rowHover, grandTotalBackground, divider, etc.' },
      { name: 'layout', type: 'PivotGridLayout', required: false, description: 'Control sidebar position (left/right/both/none), sidebar width, visible sections, min column width, and sticky column width.' },
      { name: 'fontScale', type: 'number', required: false, description: 'Global font size multiplier. 1.0 is default, 1.2 makes everything 20% larger.', defaultValue: '1' },
      { name: 'title', type: 'string', required: false, description: 'Title displayed in the toolbar header.' },
      { name: 'subtitle', type: 'string', required: false, description: 'Subtitle shown below the title in the toolbar.' },
      { name: 'showToolbar', type: 'boolean', required: false, description: 'Show/hide the entire toolbar row.', defaultValue: 'true' },
      { name: 'sx', type: 'SxProps', required: false, description: 'MUI sx prop passed to the root container for custom overrides.' },
    ]
  },
  {
    id: 'features',
    title: 'Feature Flags',
    icon: 'toggle_on',
    description: 'Toggle individual features on/off to tailor the component to your use case.',
    props: [
      { name: 'features.dragAndDrop', type: 'boolean', required: false, description: 'Enable drag-and-drop field reorganization.', defaultValue: 'true' },
      { name: 'features.pagination', type: 'boolean', required: false, description: 'Enable built-in pagination with configurable page sizes.', defaultValue: 'true' },
      { name: 'features.expandCollapse', type: 'boolean', required: false, description: 'Allow expanding/collapsing grouped row hierarchies.', defaultValue: 'true' },
      { name: 'features.grandTotal', type: 'boolean', required: false, description: 'Show a Grand Total row at the bottom.', defaultValue: 'true' },
      { name: 'features.search', type: 'boolean', required: false, description: 'Enable the search bar in the sidebar to filter available fields.', defaultValue: 'true' },
      { name: 'features.export', type: 'boolean', required: false, description: 'Show export buttons (CSV, Excel).', defaultValue: 'true' },
      { name: 'features.groupedFlatToggle', type: 'boolean', required: false, description: 'Allow switching between Grouped and Flat table views.', defaultValue: 'true' },
      { name: 'features.refreshButton', type: 'boolean', required: false, description: 'Show a refresh button in the toolbar.', defaultValue: 'true' },
      { name: 'features.performanceMetrics', type: 'boolean', required: false, description: 'Display processing time, cache status, and row count chips.', defaultValue: 'true' },
      { name: 'features.columnExpansion', type: 'boolean', required: false, description: 'Enable expanding/collapsing column group hierarchies.', defaultValue: 'true' },
    ]
  },
  {
    id: 'pagination',
    title: 'Pagination',
    icon: 'view_list',
    description: 'Configure pagination behavior for large datasets.',
    props: [
      { name: 'defaultPageSize', type: 'number', required: false, description: 'Number of rows per page when pagination is enabled.', defaultValue: '100' },
      { name: 'pageSizeOptions', type: 'number[]', required: false, description: 'Array of page size options shown in the pagination control.', defaultValue: '[100, 500, 1000, 2500]' },
    ]
  },
  {
    id: 'callbacks',
    title: 'Callbacks & Render Props',
    icon: 'code',
    description: 'Hook into lifecycle events and customize cell rendering.',
    props: [
      { name: 'onConfigChange', type: '(config) => void', required: false, description: 'Fired when the user changes rows, columns, values, or aggregation via the UI.' },
      { name: 'onCellClick', type: '(cell) => void', required: false, description: 'Fired when a data cell is clicked. Receives rowPath, columnPath, field, and value.' },
      { name: 'onDataLoaded', type: '(metadata) => void', required: false, description: 'Fired after data processing completes. Receives totalRows, processingTime, isCached.' },
      { name: 'onError', type: '(error: Error) => void', required: false, description: 'Error handler for data fetching or processing failures.' },
      { name: 'renderCell', type: '(value, field, rowPath) => ReactNode', required: false, description: 'Custom cell renderer. Return any React node to replace the default number display.' },
      { name: 'renderHeader', type: '(label, level) => ReactNode', required: false, description: 'Custom column header renderer for full control over header appearance.' },
      { name: 'renderLoading', type: '() => ReactNode', required: false, description: 'Custom loading state component shown while data is being processed.' },
      { name: 'renderEmpty', type: '() => ReactNode', required: false, description: 'Custom empty state component shown when no data matches the current configuration.' },
    ]
  }
];
