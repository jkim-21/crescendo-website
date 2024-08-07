// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import {AnimationLayout} from "./components"
import { ThemeProvider } from "@mui/material/styles";
import {theme, tableTheme} from "./themes/theme"
import {
  ChapterPage, 
  ToolsDashboardPage, 
  MentorMenteePage, 
  EmailFinderPage, 
  SchoolDetailsPage, 
  SavedInformationPage,
  SchoolRadiusPage
} from "./pages";

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
          <ThemeProvider theme={tableTheme}>
            <EmailFinderPage />
          </ThemeProvider>
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/email-finder-system/school/:schoolName",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <SchoolDetailsPage />
        </AnimationLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools/saved-information",
    element: (
      <ProtectedRoute>
        <AnimationLayout>
          <SavedInformationPage />
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