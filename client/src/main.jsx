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
import {AnimationLayout} from "./components"
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
    element: (
      <AnimationLayout>
        <ChapterPage />
      </AnimationLayout>
    ),
  },
  {
    path: "/tools",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <ToolsDashboardPage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/mentor-mentee-matching-system",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <MentorMenteePage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/email-finder-system",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <EmailFinderPage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/school/:schoolName",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <SchoolDetailsPage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/saved-schools",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <SavedSchoolsPage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/school-finder",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <SchoolRadiusPage />
        </AnimationLayout>
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