import React from 'react'
import { Outlet } from 'react-router-dom'
// import { useLocation, Link } from "react-router-dom";
import { Footer } from '../widgets/Footer'
import { Header } from '../widgets/Header'

export const MainLayout: React.FC = () => {
  // const { pathname } = useLocation();

  //ниже функция для рассчета текущего пути и замены хэдэра
  // const getHeaderVariant = () => {
  //     if (pathname.startsWith("/profile")) return "profile";
  //     if (pathname.startsWith("/register")) return "auth";
  //     if (pathname.startsWith("/favorites")) return "favorites";
  //     if (pathname.startsWith("/skill")) return "skill";
  //     return "default";
  // };

  return (
    <div>
      <Header />

      {/* Линки ниже должен находиться внутри хэдэра */}
      {/* <Link to={'/register/step-1'}>
            <button>Зарегистрироваться</button>
            </Link>
            <Link to={'/profile'}>
            <button>Личный кабинет</button>
            </Link> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
