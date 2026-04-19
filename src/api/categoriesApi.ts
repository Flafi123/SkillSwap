import { request } from './base'
import type { TCategory } from '../shared/utils/types'
import { delay } from '../shared/lib/delay'

type TCategoryResponse = {
  categoryList: TCategory[]
}

//метод для получения всех категорий из json
export const getCategoriesApi = async (): Promise<TCategory[]> => {
  await delay()
  const data = await request<TCategoryResponse>('db/categories.json')
  return data.categoryList
}
