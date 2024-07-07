// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ChapterPage from "./pages/ChapterPage";
import MentorMenteeMatching from "./components/MentorMenteeMatching";
import Login from "./components/Login";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    path: "/mentor-mentee-matching",
    element: <ProtectedRoute><MentorMenteeMatching /></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
