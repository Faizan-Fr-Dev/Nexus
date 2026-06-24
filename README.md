# 💼 Business Nexus

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Business Nexus** is a modern, high-fidelity platform designed to bridge the gap between startup founders (Entrepreneurs) and venture capital partners (Investors). Built as a single-page application (SPA) with a premium aesthetic, it enables seamless profile creation, smart matches, collaborative workflows, chat communications, scheduling, video conferencing, document vaults, and deals pipeline management.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **👥 Dual-Role Architecture** | Dynamic user experience tailored for either **Entrepreneurs** or **Investors** with unique views, dashboards, and metrics. |
| **📊 Custom Dashboards** | Interactive statistics, quick actions, pending requests tracking, wallet balance, and personalized recommendations. |
| **🔍 Search & Match Directories** | Interactive discovery tables where Entrepreneurs search for Investors based on stage and ticket size, and Investors discover startups by industry and funding needs. |
| **💬 Direct Real-time Chat** | Integrated chat workspace with status notifications, message logs, and quick action redirects. |
| **📅 FullCalendar Scheduler** | Complete schedule management dashboard utilizing **FullCalendar** to configure availability slots, request new meetings, and accept bookings. |
| **📁 Secure Document Vault** | File sharing interface built with `react-dropzone` allowing entrepreneurs to upload pitch decks, financials, and legal files. |
| **🎥 Video Call Simulator** | Integrated web page simulating real-time video conferencing for investor-startup pitches. |
| **💼 Wallet & Deals Pipeline** | Ledger tracking and investment pipelines displaying active deals, pending terms, and closing status. |

---

## 🛠️ Technology Stack

*   **Core:** [React 18](https://react.dev/) & [Vite](https://vitejs.dev/) (fast ESM-based bundling)
*   **Routing:** [React Router DOM v6](https://reactrouter.com/) (protected routes, layouts, dynamic parameters)
*   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) for responsive, highly customized glassmorphic design
*   **Icons:** [Lucide React](https://lucide.dev/) (modern pixel-perfect icon pack)
*   **Calendar:** `@fullcalendar/react`, `@fullcalendar/daygrid`, `@fullcalendar/timegrid`, `@fullcalendar/interaction`
*   **File Uploads:** `react-dropzone`
*   **Alerts/Toasts:** `react-hot-toast`
*   **Utility:** `date-fns` & `axios`

---

## 📂 Project Structure

Here is a look at the major folder contents:

```text
Nexus/
├── public/                 # Static assets
└── src/
    ├── components/         # Reusable presentation components
    │   ├── collaboration/  # Collaboration cards and request elements
    │   ├── investor/       # Investor directory and info cards
    │   ├── layout/         # Navigation, Sidebar, and Dashboard shell layouts
    │   └── ui/             # Reusable UI controls (Buttons, Cards, Badges)
    ├── context/            # Global state context providers (Auth, Theme)
    ├── data/               # Simulation data layers (Users, Meetings, Messages, Requests)
    ├── pages/              # Routing pages
    │   ├── auth/           # Login & Registration views
    │   ├── chat/           # Chat window and active messaging log
    │   ├── dashboard/      # Custom Role dashboards
    │   ├── deals/          # Deal pipeline management page
    │   ├── documents/      # Pitch decks and document manager page
    │   ├── financials/     # Wallet page and investment tracker
    │   ├── profile/        # Detail pages for profiles
    │   ├── schedule/       # Calendar page
    │   └── settings/       # Account and profile configuration page
    ├── App.jsx             # Main router configuration
    ├── main.jsx            # React root mount
    └── index.css           # Global stylesheet containing Tailwind directives
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16.x or newer) and `npm` installed.

### Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/business-nexus.git
    cd business-nexus/Nexus
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open the local address printed in the terminal (usually `http://localhost:5173`) in your web browser.

4.  **Production Build**
    To build a optimized distribution folder:
    ```bash
    npm run build
    ```
    This produces a ready-to-deploy static website in the `dist/` directory.
