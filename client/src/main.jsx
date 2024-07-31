// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ChapterPage from "./pages/ChapterPage";
import MentorMenteeMatchingPage from "./pages/MentorMenteePage";
import EmailFinderPage from "./pages/EmailFinderPage";
import ToolsPage from "./pages/ToolsPage";
import AuthProvider from "./context/AuthContext";
import SchoolDetailsPage from "./pages/SchoolDetailsPage";
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
        <ToolsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/mentor-mentee-matching-system",
    element: (
      <ProtectedRoute>
        <MentorMenteeMatchingPage />
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
