## 0.2.0 (2026-03-03)

### Feat

- fetch wallets for Transactions page and clean up UI
- redesign Transactions table with modern UI, search, pagination, and type indicators
- add Transactions page with table, components, and sidebar integration
- make wallet stat card trend dynamic based on balance changes
- add lucide icon selection for wallets and store icon keys in database
- close Add Wallet modal on successful creation
- implement dynamic wallet stats with reusable components and Inertia data loading
- add toast notifications with type-based color variants
- add wallet creation flow with migrations, controller, and modal integration
- add Add Wallet dialog modal with form inputs (name, value, icon, color, description)
- add custom dashboard and line chart to auth view
- update hero section layout and styling

### Fix

- correct button routes and remove unused function

### Refactor

- centralize wallet balance updates and fix transaction schema for system operations
- extract guest navbar and hero into layout-based components
- consolidate authenticated layout with sidebar and dynamic page header
- simplify dashboard layout and move wallet logic to page
- convert AddWalletModal from JSX to TSX with full type fixes
