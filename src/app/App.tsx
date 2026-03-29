import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import './index.css'
import '../shared/assets/fonts/fonts.css'

const App: React.FC = () => {
  return <RouterProvider router={appRouter} />
}

export default App
