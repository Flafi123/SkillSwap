import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import './index.css'
import '../shared/assets/fonts/fonts.css'
import {
  getAllSkills,
  getAllCategories,
  getAllSubcategories,
} from '../entities/Skill/model/skillSlice'
import { getAllUsers } from '../entities/user/model/userSlice'
import { useAppDispatch } from './store/store'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const init = async () => {
      await dispatch(getAllSkills())
      await dispatch(getAllCategories())
      await dispatch(getAllSubcategories())
      await dispatch(getAllUsers())
    }
    init()
  }, [dispatch])

  return <RouterProvider router={appRouter} />
}

export default App
