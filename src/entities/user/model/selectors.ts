import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/store'

const selectUsers = (state: RootState) => state.user.allUsers
const selectSkills = (state: RootState) => state.skill.allSkills
const selectFilters = (state: RootState) => state.filter

// Достаём отфильтрованных пользователей из селектора
// UserList - достает всегда отфильтрованных
//   const filteredUsers = useAppSelector(selectFilteredUsers)

export const selectFilteredUsers = createSelector(
  [selectUsers, selectSkills, selectFilters],
  (users, skills, filters) => {
    return (
      users
        .filter((user) => {
          const usersSkills = skills.filter((skill) => skill.userId === user.id)
          if (filters.skillsType === 'canTeach') {
            if (
              filters.selectedSubcategoryIds.length > 0 &&
              !usersSkills.some((skill) =>
                filters.selectedSubcategoryIds.includes(skill.subcategoryId),
              )
            ) {
              return false
            }
          } else if (filters.skillsType === 'wantToLearn') {
            if (
              filters.selectedSubcategoryIds.length > 0 &&
              !user.subcategoriesWanted.some((subId) =>
                filters.selectedSubcategoryIds.includes(subId),
              )
            ) {
              return false
            }
          }

          if (filters.searchText) {
            const searchLower = filters.searchText.toLowerCase()
            const hasMatch = usersSkills.some((skill) =>
              skill.title.toLowerCase().includes(searchLower),
            )
            if (!hasMatch) return false
          }

          if (filters.gender !== 'all' && user.gender !== filters.gender) return false

          if (filters.city.length > 0 && !filters.city.includes(user.city)) return false

          return true
        })
        //добавила сортировку конечного списка по алфавиту(видела в ТЗ)
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    )
  },
)

export const selectPopularUsers = createSelector([selectUsers], (users) => {
  const allFavorites: number[] = users.flatMap((user) => user.favoritesSkills ?? [])
  const skillCountMap: Record<number, number> = {}
  allFavorites.forEach((skillId) => {
    skillCountMap[skillId] = (skillCountMap[skillId] || 0) + 1
  })
  return [...users].sort((a, b) => {
    const aScore = skillCountMap[a.skillOfferedId] || 0
    const bScore = skillCountMap[b.skillOfferedId] || 0

    //если разное количество очков, то по популярности
    if (bScore !== aScore) {
      return bScore - aScore
    }

    //если одинаковое между двумя - по алфавиту
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base',
    })
  })
})

export const selectNewUsers = createSelector([selectUsers], (users) => {
  return [...users].sort((a, b) => {
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0

    //если разные даты, то по новизне
    if (bTime !== aTime) {
      return bTime - aTime
    }

    //если одинаковое между двумя - по алфавиту
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base',
    })
  })
})

export const selectRecommendedUsers = createSelector([selectUsers], (users) => {
  const shuffledUsers = [...users].sort(() => Math.random() - 0.5)
  return shuffledUsers.slice(0, 6)
})
