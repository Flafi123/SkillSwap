import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '../pages/Home'
import { FavoritesPage } from '../pages/Favorites'
import { ProfilePage } from '../pages/Profile'
import { SkillPage } from '../pages/Skill'
import { AuthStepFirstPage } from '../pages/Auth/Step1'
import { AuthStepSecondPage } from '../pages/Auth/Step2'
import { AuthStepThirdPage } from '../pages/Auth/Step3'
import { NotFoundPage } from '../pages/Error/NotFoundPage'
import { ServerErrorPage } from '../pages/Error/ServerErrorPage'
import { MainLayout } from '../layouts/MainLayout'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'skill/:id',
        element: <SkillPage />,
      },
      {
        path: 'register',
        children: [
          { path: 'step-1', element: <AuthStepFirstPage /> },
          { path: 'step-2', element: <AuthStepSecondPage /> },
          { path: 'step-3', element: <AuthStepThirdPage /> },
        ],
      },
      {
        path: '500',
        element: <ServerErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
