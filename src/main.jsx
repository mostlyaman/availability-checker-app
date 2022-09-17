import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Client from './components/Client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import axios from 'axios'

async function getExpert() {

}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/client/:name",
    element: <Client />,
    loader: async () => {
      return (await axios.get('http://localhost:3000/expert')).data
    },
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
