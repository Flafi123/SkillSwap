//используем в компоненте UserList и UserCard(через пропс передаем)
export type TUser = {
  id: number
  name: string
  city: string
  birthDate: string
  gender?: string
  email?: string
  password?: string
  about?: string
  skillOfferedId: number
  subcategoriesWanted: number[]
  favoritesSkills?: number[]
  createdAt?: string
  updatedAt?: string
  avatarUrl: string | File
}

//понадобится тому, кто будет делать компонент с формой регистрации(можете изменять под себя, если понадобится)
export type TRegisterData = {
  email: string
  password: string
  name: string
  city: string
  birthDate: string
  gender: string
  about?: string
  categoryId: string
  subcategoryId: string

  subcategoriesWanted: number[]
  avatarUrl: string | File
}

//нужно тому, кто будет делать SkillCard
export type TSkill = {
  id: number
  categoryId: number
  subcategoryId: number
  userId: number
  title: string
  description: string
  imagesUrl: string[] | File[]
  updatedAt?: string
}

export type TSubcategory = {
  id: number
  title: string
  categoryId: number
}

export type TCategory = {
  id: number
  title: string
}
