import { request } from './base'

//вот это надо вынести в папку типов
export type TCategory = {
  id: number
  title: string
}
//

type TCategoryResponse = {
  categoryList: TCategory[]
}

//метод для получения всех категорий из json
export const getCategoriesApi = async (): Promise<TCategory[]> => {
  const data = await request<TCategoryResponse>('/db/categories.json')
  return data.categoryList
}
