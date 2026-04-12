import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation, Link } from 'react-router-dom'
import { Footer } from '../widgets/Footer'
import { Header } from '../widgets/Header'

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation()

  //ниже функция для рассчета текущего пути и замены хэдэра
  const getHeaderVariant = () => {
    if (pathname.startsWith('/register')) return 'auth'
    return 'default'
  }
  const variant = getHeaderVariant()


  return (
    <div>
      <Header variant={variant} />
      <main>
        <Outlet />
      </main>
      {variant !== 'auth' && <Footer />}
      <Footer />
    </div>
  )
}
