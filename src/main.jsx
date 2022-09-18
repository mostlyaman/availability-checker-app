import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Client from './components/Client'
import Expert from './components/Expert'
import CreateExpert from './components/CreateExpert'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import axios from 'axios'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      return (await axios.get('http://localhost:3000/expert')).data
    }
  },
  {
    path: "/client/:name",
    element: <Client />,
    loader: async () => {
      return (await axios.get('http://localhost:3000/expert')).data
    },
  },
  {
    path: "/expert/:name",
    element: <Expert />,
    loader: async () => {
      return (await axios.get('http://localhost:3000/expert')).data
    }
  },
  {
    path: '/create-expert/:name',
    element: <CreateExpert />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
