import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./root"
import './index.css'
import ErrorPage from './error-page'
import Papers from './papers'
import RayTracing from './papers/ray_tracing'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "papers",
    element: <Papers />,
  },
  {
    path: "papers/ray_tracing",
    element: <RayTracing />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
