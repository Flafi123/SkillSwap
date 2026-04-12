import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { MainLayout } from '../layouts/MainLayout'

const HomePage = lazy(() => import('../pages/Home'))
const FavoritesPage = lazy(() => import('../pages/Favorites'))
const ProfilePage = lazy(() => import('../pages/Profile'))
const SkillPage = lazy(() => import('../pages/Skill'))
const AuthStepFirstPage = lazy(() => import('../pages/Auth/Step1/Step1'))
const AuthStepSecondPage = lazy(() => import('../pages/Auth/Step2/Step2'))
const AuthStepThirdPage = lazy(() => import('../pages/Auth/Step3/Step3'))
const AuthStepSecondPage = lazy(() => import('../pages/Auth/Step2/Step2'))
const NotFoundPage = lazy(() => import('../pages/Error/NotFoundPage'))
const ServerErrorPage = lazy(() => import('../pages/Error/ServerErrorPage'))

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: 'skill/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SkillPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        children: [
          {
            path: 'step-1',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AuthStepFirstPage />
              </Suspense>
            ),
          },
          {
            path: 'step-2',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AuthStepSecondPage />
              </Suspense>
            ),
          },
          {
            path: 'step-3',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AuthStepThirdPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '500',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ServerErrorPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
