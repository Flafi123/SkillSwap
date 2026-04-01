import { request } from './base'

//вот это надо вынести в папку типов
export type TSubcategory = {
  id: number
  title: string
  categoryId: number
}
//

type TSubcategoryResponse = {
  subcategoryList: TSubcategory[]
}

//метод для получения всех подкатегорий из json
export const getSubcategoriesApi = async (): Promise<TSubcategory[]> => {
  const data = await request<TSubcategoryResponse>('/db/subcategories.json')
  return data.subcategoryList
}

//метод для получения всех подкатегорий по ID категории(используется на странице регистрации - шаг 2)
export const getSubcategoriesByCategoryIdApi = async (
  categoryId: number,
): Promise<TSubcategory[]> => {
  const allSubcategories = await getSubcategoriesApi()
  const subcategoriesByCategoryId = allSubcategories.filter((sub) => sub.categoryId === categoryId)
  return subcategoriesByCategoryId
}
