---
applyTo: '**'
---
You are a Frontend Developer. Your task is to create a user interface for a Hotel & Restaurant ERP admin dashboard. The interface must be responsive, accessible, and visually appealing, using modern frontend technologies and best practices. Pay attention to typography, color schemes, spacing, and alignment for a polished final product. Test the interface across different browsers and devices for compatibility and performance.

## Layout Requirements:
- Fixed Header: Stays at the top of the viewport when scrolling.
- Fixed Footer: Stays at the bottom of the viewport when scrolling. Footer is simple, showing version, time, and copyright.
- Fixed Sidebar: Stays in place while the main content scrolls. Sidebar contains main menus and expandable/collapsible submenus.
- Container: Main content area is scrollable, with header, footer, and sidebar fixed.
- Floating Action Button (FAB): Circular, positioned at the bottom right, with a blue accent and icon.

## Sidebar & Menu:
- Sidebar includes menus and submenus relevant to Hotel & Restaurant ERP (Dashboard, Bookings, Rooms, Restaurant, Inventory, Employees, Finance, Suppliers, Customers, Reports, Tasks, Settings, Help).
- Submenus expand/collapse with animation and +/- icons.
- Submenu text is indented to start directly under the parent menu label, not under the icon. Hover background for submenu links spans the full sidebar width.

## Design & Style:
- Color Scheme: White background for main content, blue for interactive elements (buttons, links, FAB).
- Typography: Use 'Poppins' font, easy to read, with appropriate sizes and weights.
- Spacing & Alignment: Consistent margins and padding for a clean, balanced layout.
- Hover Effects: Sidebar and submenu links have animated hover/focus effects with full-width backgrounds.

## User Information Form:
- If present, includes fields for User Name, Email, Mobile Number, User Role (Admin, User, Guest), Status (Active, Inactive).
- Use clear labels, input types, dropdowns, and form validation.

## Accessibility & Responsiveness:
- Use semantic HTML and ARIA roles for navigation and content.
- Ensure layout adapts to various screen sizes, including mobile.

## Footer:
- Footer is simple, fixed, and does not include accent bar or extra links.
- Responsive layout for footer sections.

## General:
- Use only assets/icons provided in the assets/icons folder.
- Keep code modular and maintainable.
- All changes should be tested for usability and visual consistency.

---

## Hotel & Restaurant ERP Admin Dashboard – Next Steps Instructions

### 1. Add/Enhance Dashboard Widgets
- Implement dashboard widgets for KPIs (e.g., occupancy rate, revenue, bookings, restaurant sales).
- Use cards with icons from the assets/icons folder.
- Widgets should be responsive and visually consistent with the current design.
- Add hover/focus effects and ensure accessibility.

### 2. User Management Module
- Create a user management section with a table/list of users.
- Include actions: Add, Edit, Delete, Activate/Deactivate.
- Use modal dialogs for forms, with validation and clear labels.
- Ensure the table is responsive and supports sorting/filtering.

### 3. Booking Calendar Integration
- Integrate a calendar view for bookings.
- Allow users to view, add, and edit bookings directly from the calendar.
- Use accessible controls and ensure mobile compatibility.

### 4. Restaurant Menu Management
- Build a section for managing restaurant menu items.
- Support adding/editing/removing menu items, categories, and prices.
- Use forms with validation and dropdowns for categories.

### 5. Inventory Alerts & Notifications
- Add notification badges for low stock or expiring items in the inventory menu.
- Use icons and color cues for alerts.
- Ensure notifications are accessible and dismissible.

### 6. Reports & Analytics
- Create a reports section with charts and downloadable data (CSV, PDF).
- Use accessible chart libraries and ensure color contrast.
- Add filters for date range, category, and type.

### 7. Settings & Preferences
- Implement a settings page for user preferences (theme, language, notifications).
- Use toggles, dropdowns, and save/cancel actions.
- Ensure all settings are accessible and persist across sessions.

### 8. Help & Support Section
- Add a help section with FAQs, contact form, and documentation links.
- Use clear navigation and accessible form controls.

### General Guidelines
- Use only assets/icons from the assets/icons folder.
- Maintain modular, maintainable code.
- Test all changes for usability, accessibility, and visual consistency.
- Use semantic HTML and ARIA roles.
- Ensure responsiveness for all new features.

