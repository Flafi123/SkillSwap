import { request } from './base'
import { postToStorage, patchToStorage } from './localStorageApi'

//вот это надо вынести в папку типов
export type TSkill = {
  id: number
  categoryId: number
  subcategoryId: number
  userId: number
  title: string
  description: string
  imagesUrl: string[]
  updatedAt?: string
}
//

type TSkillResponse = {
  skills: TSkill[]
}

//метод для получения всех навыков из json
export const getSkillsApi = async (): Promise<TSkill[]> => {
  const data = await request<TSkillResponse>('/db/skills.json')
  return data.skills
}

//метод для получения всех навыков, принадлежащих к какой-либо категории(нужно для фильтрации)
export const getSkillsByCategoryIdApi = async (categoryId: number): Promise<TSkill[]> => {
  const allSkills = await getSkillsApi()
  const skillsByCategoryId = allSkills.filter((skill) => skill.categoryId === categoryId)
  return skillsByCategoryId
}

//метод для получения всех навыков, принадлежащих к какой-либо подкатегории(нужно для фильтрации)
export const getSkillsBySubcategoryIdApi = async (subcategoryId: number): Promise<TSkill[]> => {
  const allSkills = await getSkillsApi()
  const skillsBySubcategoryId = allSkills.filter((skill) => skill.subcategoryId === subcategoryId)
  return skillsBySubcategoryId
}

//метод для получения навыка по ID(используется на странице с роутом /skill/:id)
export const getSkillsByIdApi = async (id: number): Promise<TSkill> => {
  const skills = await getSkillsApi()
  const skill = skills.find((s) => s.id === id)
  if (!skill) {
    throw new Error('Такой навык не найден или не существует')
  }
  return skill
}

//обертка-метод для эмуляции создания нового навыка(на самом деле записывается в localStorage)
export const createSkillApi = (data: TSkill) => {
  return postToStorage('draftSkill', data)
}

//обертка-метод для эмуляции обновления информации о навыке(на самом деле записывается в localStorage)
export const updateSkillApi = (data: Partial<TSkill>) => {
  return patchToStorage('draftSkill', data)
}
