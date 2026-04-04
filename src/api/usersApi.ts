import { request } from './base'
import { delay } from '../shared/lib/delay'
import { postToStorage, patchToStorage } from './localStorageApi'
import type { TUser, TRegisterData } from '../shared/utils/types'

type TUserResponse = {
  users: TUser[]
}

//метод для получения всех пользователей из json
export const getUsersApi = async (): Promise<TUser[]> => {
  await delay()
  const data = await request<TUserResponse>('/db/users.json')
  return data.users
}

//обертка-метод для эмуляции создания нового пользователя(на самом деле записывается в localStorage)
export const registerUserApi = async (data: TRegisterData): Promise<TUser> => {
  await delay()
  const newUser: TUser = {
    ...data,
    id: Date.now(),
    subcategoriesWanted: data.subcategoriesWanted,
    favoritesSkills: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return postToStorage('draftUser', newUser)
}

//обертка-метод для эмуляции обновления информации о пользователе(на самом деле записывается в localStorage)
export const updateUserApi = async (data: Partial<TUser>): Promise<TUser> => {
  await delay()
  return patchToStorage('draftUser', {
    ...data,
    updatedAt: new Date().toISOString(),
  })
}
