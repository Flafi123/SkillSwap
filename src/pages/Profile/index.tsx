import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1>Страница - профиль.</h1>
      <Link to={'/favorites'}>
        <button>Избранное</button>
      </Link>
    </div>
  )
}

export default ProfilePage
