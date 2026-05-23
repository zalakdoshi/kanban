# 📋 Collaborative Kanban Board Application

A premium, interactive Kanban Board web application built with **React** that features **Role-Based Access Control (RBAC)**, real-time-like workspace synchronization, user-friendly **Drag-and-Drop** interactions, employee productivity tracking, and a **dynamic Light/Dark theme switch**.

🔗 **Live Demo:** [kanbannnn.vercel.app](https://kanbannnn.vercel.app)

This application was developed as part of an Internship Project, utilizing modern React hooks, Context API for lightweight state management, and HTML5 Drag and Drop API.

---

## ✨ Features

### 🔐 Role-Based Access Control (RBAC)
- Pre-configured user roles with different access levels:
  - **Admin**: Full control to create, edit, delete, and reassign tasks. Access to employee productivity analytics.
  - **Employee**: Can view their assigned tasks, drag tasks between columns to update status, and manage their workflow.

### 📊 Interactive Kanban Columns
- Four visual boards for task lifecycles:
  - 📥 **To Do**: Ready to be worked on.
  - ⏳ **In Progress**: Tasks currently being worked on.
  -  **Completed**: Completed tasks.
  - 📋 **List**: Backlog or general listing of references.
- Drag & Drop interface for quick, seamless task movements.

### 📈 Employee Analytics (Admin Only)
- Dedicated **Work Tracking Dashboard** for Admins to view task progress statistics, completion ratios, and overall task distribution for employees.

### 🌓 Dynamic Dark Mode
- Dark mode toggle that immediately applies a stunning, accessible dark UI theme.
- Remembers preferences across browser sessions using `localStorage`.

### 💾 Fully Persisted Local Storage
- Local sessions, tasks, column status, and visual configurations are preserved so you never lose your progress.

---

## 🛠️ Tech Stack

- **Core**: React 19.x & JavaScript (ES6+)
- **Routing**: React Router v7
- **State & Theme Management**: React Context API (`AuthContext`, `TaskContext`, `ThemeContext`)
- **Querying**: TanStack React Query (v5)
- **Styling**: Modern CSS Variables & Responsive Flex/Grid Layouts

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your system.

### Installation
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/zalakdoshi/kanban.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kanban_app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application
To run the app in development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will auto-reload when you edit files.

---

## 🔑 Predefined Accounts & Logins

Use the following credentials to log in and explore the role-based features:

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` | Full Access + Employee Work Tracking |
| **Employee** | `employee` | `emp123` | Individual Kanban Board Task Management |

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI Components
│   ├── Header.jsx       # Navigation, Auth Status, and Theme Toggle
│   ├── KanbanColumn.jsx # Column Wrapper for Drag/Drop
│   ├── TaskCard.jsx     # Card component with actions
│   ├── TaskModal.jsx    # Pop-up for Creating/Editing tasks
│   └── TrackingModal.jsx# Analytics and productivity graphs
├── contexts/            # Context API Providers
│   ├── AuthContext.jsx  # Authentication logic & credentials
│   ├── TaskContext.jsx  # Task operations and statistics
│   └── ThemeContext.jsx # Dark/Light theme toggle mechanism
├── pages/               # Main Page Views
│   ├── Login.jsx        # Credentials Login screen
│   └── Dashboard.jsx    # Kanban board view
├── App.js               # Root layout
└── AppRoutes.jsx        # Routing configuration
```
