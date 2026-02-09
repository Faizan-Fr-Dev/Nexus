# Nexus App Architecture Overview

This document provides a high-level overview of the Business Nexus application structure, data flow, and key components.

## 1. Main Components

The application is built using **React** with **TypeScript** and **Vite**.

*   **`App.tsx`**: The application entry point. It handles client-side routing using `react-router-dom` and wraps the app in the `AuthProvider`.
*   **`context/AuthContext.tsx`**: Manages global authentication state (current user, login/register logic) and provides the `useAuth` hook.
*   **`components/layout/DashboardLayout.tsx`**: The main shell for all authenticated pages. It ensures a consistent look and feel (Navigation, Sidebar) across the app.
*   **`pages/`**: Contains the view logic, organized by feature (e.g., `auth/`, `dashboard/`, `profile/`).

## 2. Dashboard Structure

The dashboard uses a nested layout strategy handled by `DashboardLayout.tsx`.

*   **Protection**: The layout checks `isAuthenticated`. If false, it redirects to `/login`.
*   **Layout Grid**:
    *   **`Navbar`**: Top navigation bar (Logo, User Profile, Notifications).
    *   **`Sidebar`**: Vertical navigation menu (Links to Dashboard, Messages, Settings, etc.).
    *   **`Main Content`**: The `<Outlet />` component renders the specific page content (e.g., `EntrepreneurDashboard`) inside the main area.

**Visual Hierarchy:**
```
[   Navbar   ]
[ S |        ]
[ i |  Page  ]
[ d | Content]
[ e |        ]
```

## 3. Data Flow

The application currently uses a **Mock Data** approach suitable for prototyping.

*   **Source of Truth**: Data files in `src/data/` (e.g., `users.ts`, `messages.ts`). These act as a temporary "database".
*   **State Management**:
    *   **Global**: `AuthContext` holds the `user` session state.
    *   **Local**: Individual components (like pages) import the mock data arrays directly and often use `useState` to handle local filtering or UI interaction.
*   **Authentication**:
    1.  User submits form (Login/Register).
    2.  `AuthContext` verifies against `src/data/users.ts`.
    3.  If successful, the user object is stored in `localStorage` and State.
    4.  App rerenders and `DashboardLayout` allows access.

## Directories at a Glance

*   `src/components`: Reusable UI elements (Buttons, Inputs) and Layouts.
*   `src/context`: Global state providers (Auth).
*   `src/data`: Mock JSON-like data.
*   `src/pages`: Full page views tied to Routes.
*   `src/types`: TypeScript interfaces for strong typing (User, Message, etc.).
