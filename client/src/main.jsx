import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ChapterPage from "./pages/ChapterPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/chapters/:chapterName",
    element: <ChapterPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
