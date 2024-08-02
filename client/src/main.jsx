// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {ChapterPage} from "./pages";
import {MentorMenteePage} from "./pages";
import {EmailFinderPage} from "./pages";
import {ToolsDashboardPage} from "./pages";
import AuthProvider from "./context/AuthContext";
import {SchoolDetailsPage} from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
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
    path: "/tools/email-finder-system/*",
    element: (
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<EmailFinderPage />} />
          <Route path="display/:schoolName" element={<SchoolDetailsPage />} />
        </Routes>
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
