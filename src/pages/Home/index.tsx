import React from 'react'
// import { Link } from 'react-router-dom' // линк нужно вставить туда, где будет кнопка «Подробнее»

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Страница — главная</h1>
      {/* <Link to={`/skill/${skill.id}`}> */}
      <button type="button">Подробнее</button>
      {/* </Link> */}
    </div>
  )
}
