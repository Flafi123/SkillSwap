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
    return users.filter((user) => {
      const usersSkills = skills.filter((skill) => skill.userId === user.id)
      if (filters.skillsType === 'canTeach') {
        if (
          filters.selectedSubcategoryIds.length > 0 &&
          !usersSkills.some((skill) => filters.selectedSubcategoryIds.includes(skill.subcategoryId))
        ) {
          return false
        }
      } else if (filters.skillsType === 'wantToLearn') {
        if (
          filters.selectedSubcategoryIds.length > 0 &&
          !user.subcategoriesWanted.some((subId) => filters.selectedSubcategoryIds.includes(subId))
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
  },
)
