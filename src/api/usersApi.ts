import { request } from './base'
import { postToStorage, patchToStorage } from './localStorageApi'

//вот это надо вынести в папку типов
export type TUser = {
  id: number
  name: string
  city: string
  birthDate: string
  gender: string
  email: string
  about: string
  skillOfferedId: number
  subcategoriesWanted: number[]
  favoritesSkills: number[]
  createdAt: string
  updatedAt: string
  avatarUrl: string
}

export type TRegisterData = {
  email: string
  password: string
  name: string
  city: string
  birthDate: string
  gender: string
  about?: string
  subcategoriesWanted: number[]
  avatarUrl: string
}
//

type TUserResponse = {
  users: TUser[]
}

//метод для получения всех пользователей из json
export const getUsersApi = async (): Promise<TUser[]> => {
  const data = await request<TUserResponse>('/db/users.json')
  return data.users
}

//обертка-метод для эмуляции создания нового пользователя(на самом деле записывается в localStorage)
export const registerUserApi = (data: TRegisterData) => {
  return postToStorage('draftUser', data)
}

//обертка-метод для эмуляции обновления информации о пользователе(на самом деле записывается в localStorage)
export const updateUserApi = (data: Partial<TRegisterData>) => {
  return patchToStorage('draftUser', data)
}
