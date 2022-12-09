import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Root from "./root"
import './index.css'
import ErrorPage from './error-page'
import Papers, { RayTracing } from './papers'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/papers",
    element: <Papers />,
  },
  {
    path: "/papers/ray_tracing",
    element: <RayTracing />,
  },
], {
  basename: import.meta.env.GITHUB_PAGES
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
