// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {ChapterPage} from "./pages";
import {MentorMenteePage} from "./pages";
import {EmailFinderPage} from "./pages";
import SavedSchoolsPage from "./pages/SavedSchoolsPage";
import {ToolsDashboardPage} from "./pages";
import SchoolRadiusPage from "./pages/SchoolRadiusPage";
import AuthProvider from "./context/AuthContext";
import {SchoolDetailsPage} from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chapters/:chapterName",
    element: <ChapterPage />,
  },
  {
    path: "/tools",
    element: (
      <ProtectedRoute>
        <ToolsDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/mentor-mentee-matching-system",
    element: (
      <ProtectedRoute>
        <MentorMenteePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/email-finder-system",
    element: (
      <ProtectedRoute>
        <EmailFinderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/school/:schoolName",
    element: (
      <ProtectedRoute>
        <SchoolDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/saved-schools",
    element: (
      <ProtectedRoute>
        <SavedSchoolsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/school-finder",
    element: (
      <ProtectedRoute>
        <SchoolRadiusPage />
      </ProtectedRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);