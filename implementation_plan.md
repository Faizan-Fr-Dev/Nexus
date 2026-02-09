# Implementation Plan: Meeting Scheduling Feature

This plan outlines the steps to integrate a full meeting scheduling system into the Nexus dashboard.

## Goal
Enable users to manage their schedule, define availability, and request/accept meetings with other users.

## User Review Required
> [!IMPORTANT]
> I will be using **FullCalendar** as the primary UI library as suggested. This adds a few dependencies to the project.

## Proposed Changes

### 1. Dependencies
*   `@fullcalendar/react`
*   `@fullcalendar/daygrid` (Month view)
*   `@fullcalendar/timegrid` (Week/Day view)
*   `@fullcalendar/interaction` (Click & Drag support)

### 2. Data Layer (Mock)
#### [NEW] [meetings.js](file:///f:/Nexus/Nexus/src/data/meetings.js)
*   Define `Meeting` type: `{ id, hostId, attendeeId, start, end, status, title, description }`.
*   Mock initial data for 2-3 upcoming meetings.
*   Functions: `getMeetingsForUser`, `createMeeting`, `updateMeetingStatus`.

### 3. Components & Pages
#### [NEW] [SchedulePage.jsx](file:///f:/Nexus/Nexus/src/pages/schedule/SchedulePage.jsx)
*   Main calendar view using FullCalendar.
*   Allows toggling between "My Schedule" and "Availability" modes.
*   Clicking a slot opens a modal to add availability or view meeting details.

#### [NEW] [MeetingRequestModal.jsx](file:///f:/Nexus/Nexus/src/components/schedule/MeetingRequestModal.jsx)
*   A modal to request a meeting with another user (Investor/Entrepreneur).

#### [MODIFY] [Sidebar.jsx](file:///f:/Nexus/Nexus/src/components/layout/Sidebar.jsx)
*   Add "Schedule" link to the navigation menu.

### 4. Dashboard Integration
#### [MODIFY] [EntrepreneurDashboard.jsx](file:///f:/Nexus/Nexus/src/pages/dashboard/EntrepreneurDashboard.jsx)
#### [MODIFY] [InvestorDashboard.jsx](file:///f:/Nexus/Nexus/src/pages/dashboard/InvestorDashboard.jsx)
*   Replace the hardcoded "Upcoming Meetings" card with a real list of the next upcoming confirmed meetings.

## Verification Plan
*   **Manual Test**:
    1.  Navigate to `/schedule`.
    2.  Verify the calendar renders.
    3.  Click a date to "book" or "set availability".
    4.  Check if the Dashboard "Upcoming Meetings" widget updates.
