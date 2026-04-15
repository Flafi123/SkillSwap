import styles from './UserList.module.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import sorticon from '/src/shared/assets/icons/sort.png'
import { useAppSelector } from '../../app/store/store'
import { selectPopularUsers } from '../../entities/user/model/selectors'
import { selectNewUsers } from '../../entities/user/model/selectors'
import { selectRecommendedUsers } from '../../entities/user/model/selectors'
import { selectFilteredUsers } from '../../entities/user/model/selectors'
import { UserCard } from '../UserCard/UserCard'
import { isFiltersActive } from '../../entities/user/model/filterSlice'
import { Button } from '../../shared/ui/Button'
import { ArrowDown } from '../../shared/assets/icons'
import type { TSkill, TSubcategory, TUser } from '../../shared/utils/types'

const PAGE_SIZE = 20
const PREVIEW_COUNT = 3

const DEFAULT_SKILL: TSkill = {
  id: 0,
  categoryId: 0,
  subcategoryId: 0,
  userId: 0,
  title: 'Навыки не указаны',
  description: 'Пользователь еще не заполнил информацию о своих услугах',
  imagesUrl: [],
}

function useInfiniteVisibleCount(totalLength: number, resetKey: unknown) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(PAGE_SIZE, Math.max(0, totalLength)),
  )

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, Math.max(0, totalLength)))
  }, [totalLength, resetKey])

  const loadMore = useCallback(() => {
    setVisibleCount((v) => Math.min(v + PAGE_SIZE, totalLength))
  }, [totalLength])

  const hasMore = visibleCount < totalLength
  return { visibleCount, loadMore, hasMore }
}

function InfiniteScrollSentinel({
  hasMore,
  onLoadMore,
}: {
  hasMore: boolean
  onLoadMore: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const onLoadMoreRef = useRef(onLoadMore)
  onLoadMoreRef.current = onLoadMore

  useEffect(() => {
    const el = ref.current
    if (!el || !hasMore) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onLoadMoreRef.current()
      },
      { root: null, rootMargin: '240px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasMore])

  if (!hasMore) return null
  return <li ref={ref} className={styles.infiniteSentinel} aria-hidden />
}

function listFingerprint(users: TUser[]) {
  if (users.length === 0) return '0'
  const last = users.length - 1
  return `${users.length}:${users[0]?.id ?? ''}:${users[last]?.id ?? ''}`
}

type CardGridProps = {
  users: TUser[]
  listClassName: string
  resetKey: unknown
  allSubcategories: TSubcategory[]
  allSkills: TSkill[]
  usePreview?: boolean
}

function UserCardGrid({
  users,
  listClassName,
  resetKey,
  allSubcategories,
  allSkills,
  usePreview = false,
}: CardGridProps) {
  const [isExpanded, setIsExpanded] = useState(!usePreview)

  useEffect(() => {
    setIsExpanded(!usePreview)
  }, [resetKey, usePreview])

  const { visibleCount, loadMore, hasMore } = useInfiniteVisibleCount(users.length, resetKey)
  const slice = users.slice(0, isExpanded ? visibleCount : PREVIEW_COUNT)
  const shouldShowPreviewButton = usePreview && !isExpanded && users.length > PREVIEW_COUNT

  return (
    <>
      <ul className={listClassName}>
        {slice.map((user) => {
          const userSubs = allSubcategories.filter((sub) => user.subcategoriesWanted.includes(sub.id))
          const userSkill = allSkills.find((skill) => skill.userId === user.id)
          return (
            <UserCard
              key={user.id}
              user={user}
              subcategories={userSubs}
              skill={userSkill || DEFAULT_SKILL}
            />
          )
        })}
        {isExpanded && <InfiniteScrollSentinel hasMore={hasMore} onLoadMore={loadMore} />}
      </ul>
      {shouldShowPreviewButton && (
        <div className={styles.showAllContainer}>
          <Button variant="tertiary" className={styles.showAllButton} onClick={() => setIsExpanded(true)}>
            Смотреть все
            <span className={styles.showAllIcon}>
              <ArrowDown />
            </span>
          </Button>
        </div>
      )}
    </>
  )
}

type SkillPair = { user: TUser; userSkill?: TSkill }

function SkillCardGrid({
  pairs,
  listClassName,
  resetKey,
  allSubcategories,
  usePreview = false,
}: {
  pairs: SkillPair[]
  listClassName: string
  resetKey: unknown
  allSubcategories: TSubcategory[]
  usePreview?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(!usePreview)

  useEffect(() => {
    setIsExpanded(!usePreview)
  }, [resetKey, usePreview])

  const { visibleCount, loadMore, hasMore } = useInfiniteVisibleCount(pairs.length, resetKey)
  const slice = pairs.slice(0, isExpanded ? visibleCount : PREVIEW_COUNT)
  const shouldShowPreviewButton = usePreview && !isExpanded && pairs.length > PREVIEW_COUNT

  return (
    <>
      <ul className={listClassName}>
        {slice.map(({ user, userSkill }) => {
          const userSubs = allSubcategories.filter((sub) => user.subcategoriesWanted.includes(sub.id))
          return (
            <UserCard
              key={user.id}
              user={user}
              subcategories={userSubs}
              skill={userSkill || DEFAULT_SKILL}
            />
          )
        })}
        {isExpanded && <InfiniteScrollSentinel hasMore={hasMore} onLoadMore={loadMore} />}
      </ul>
      {shouldShowPreviewButton && (
        <div className={styles.showAllContainer}>
          <Button variant="tertiary" className={styles.showAllButton} onClick={() => setIsExpanded(true)}>
            Смотреть все
            <span className={styles.showAllIcon}>
              <ArrowDown />
            </span>
          </Button>
        </div>
      )}
    </>
  )
}

function HomepageFilteredSection({
  displayedUsers,
  filteredUsersLength,
  filteredScrollResetKey,
  isNewFirst,
  toggleSort,
  allSubcategories,
  allSkills,
}: {
  displayedUsers: TUser[]
  filteredUsersLength: number
  filteredScrollResetKey: string
  isNewFirst: boolean
  toggleSort: () => void
  allSubcategories: TSubcategory[]
  allSkills: TSkill[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsExpanded(false)
  }, [filteredScrollResetKey])

  const { visibleCount, loadMore, hasMore } = useInfiniteVisibleCount(
    displayedUsers.length,
    filteredScrollResetKey,
  )
  const slice = displayedUsers.slice(0, isExpanded ? visibleCount : PREVIEW_COUNT)
  const shouldShowPreviewButton = !isExpanded && displayedUsers.length > PREVIEW_COUNT

  return (
    <div className={styles.container}>
      <section className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>Подходящие предложения: {filteredUsersLength}</h2>
        <div className={styles.resultsActions}>
          {shouldShowPreviewButton && (
            <Button variant="tertiary" className={styles.showAllButton} onClick={() => setIsExpanded(true)}>
              Смотреть все
              <span className={styles.showAllIcon}>
                <ArrowDown />
              </span>
            </Button>
          )}
          <Button variant="tertiary" onClick={toggleSort}>
            <img src={sorticon} alt="сортировка" className={styles.imgBtn} />
            {isNewFirst ? 'Сначала новые' : 'По алфавиту'}
          </Button>
        </div>
      </section>
      <ul className={styles.userList}>
        {slice.map((user) => {
          const userSubs = allSubcategories.filter((sub) =>
            user.subcategoriesWanted.includes(sub.id),
          )
          const userSkill = allSkills.find((skill) => skill.userId === user.id)
          return (
            <UserCard
              key={user.id}
              user={user}
              subcategories={userSubs}
              skill={userSkill || DEFAULT_SKILL}
            />
          )
        })}
        {isExpanded && <InfiniteScrollSentinel hasMore={hasMore} onLoadMore={loadMore} />}
      </ul>
    </div>
  )
}

function HomepageDefaultSections({
  usersPopular,
  usersNew,
  usersRecommended,
  allSubcategories,
  allSkills,
}: {
  usersPopular: TUser[]
  usersNew: TUser[]
  usersRecommended: TUser[]
  allSubcategories: TSubcategory[]
  allSkills: TSkill[]
}) {
  const popularKey = listFingerprint(usersPopular)
  const newKey = listFingerprint(usersNew)
  const recommendedKey = listFingerprint(usersRecommended)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <section className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Популярное</h2>
        </section>
        <UserCardGrid
          users={usersPopular}
          listClassName={styles.userList}
          resetKey={popularKey}
          allSubcategories={allSubcategories}
          allSkills={allSkills}
          usePreview
        />
      </section>

      <section className={styles.section}>
        <section className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Новое</h2>
        </section>
        <UserCardGrid
          users={usersNew}
          listClassName={styles.userList}
          resetKey={newKey}
          allSubcategories={allSubcategories}
          allSkills={allSkills}
          usePreview
        />
      </section>

      <section className={styles.section}>
        <section className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Рекомендуем</h2>
        </section>
        <UserCardGrid
          users={usersRecommended}
          listClassName={styles.userList}
          resetKey={recommendedKey}
          allSubcategories={allSubcategories}
          allSkills={allSkills}
          usePreview
        />
      </section>
    </div>
  )
}

export const UserList = ({
  variant = 'homepage',
  currentCategoryId,
  currentUserId,
}: {
  variant?: 'homepage' | 'skillpage' | 'favoritpage'
  currentCategoryId?: number
  currentUserId?: number
}) => {
  const [isNewFirst, setIsNewFirst] = useState(true)
  const toggleSort = () => {
    setIsNewFirst(!isNewFirst)
  }

  const filters = useAppSelector((state) => state.filter)
  const allUsers = useAppSelector((state) => state.user.allUsers)
  const usersPopular = useAppSelector(selectPopularUsers)
  const usersNew = useAppSelector(selectNewUsers)
  const usersRecommended = useAppSelector(selectRecommendedUsers)
  const allSubcategories = useAppSelector((state) => state.skill.allSubcategories)
  const allSkills = useAppSelector((state) => state.skill.allSkills)
  const filteredUsers = useAppSelector(selectFilteredUsers)
  const filteredPlusNewUsers = useAppSelector((state) => selectNewUsers(state, filteredUsers))
  const displayedUsers = isNewFirst ? filteredUsers : filteredPlusNewUsers
  const favoriteSkillIds = useAppSelector((state) => state.user.profileUser?.favoritesSkills || [])

  const filteredScrollResetKey = useMemo(
    () =>
      [
        filters.skillsType,
        filters.gender,
        [...filters.selectedCategoryIds].sort((a, b) => a - b).join(','),
        [...filters.selectedSubcategoryIds].sort((a, b) => a - b).join(','),
        [...filters.city].sort((a, b) => a.localeCompare(b)).join(','),
        filters.searchText,
        String(isNewFirst),
      ].join('\u0001'),
    [
      filters.skillsType,
      filters.gender,
      filters.selectedCategoryIds,
      filters.selectedSubcategoryIds,
      filters.city,
      filters.searchText,
      isNewFirst,
    ],
  )

  const filtersActive =
    filters.skillsType !== initialState.skillsType ||
    filters.gender !== initialState.gender ||
    filters.selectedCategoryIds.length > 0 ||
    filters.selectedSubcategoryIds.length > 0 ||
    filters.city.length > 0 ||
    filters.searchText.trim() !== ''

  if (allSubcategories.length === 0) return null

  if (variant === 'homepage') {
    if (filtersActive) {
      return (
        <HomepageFilteredSection
          displayedUsers={displayedUsers}
          filteredUsersLength={filteredUsers.length}
          filteredScrollResetKey={filteredScrollResetKey}
          isNewFirst={isNewFirst}
          toggleSort={toggleSort}
          allSubcategories={allSubcategories}
          allSkills={allSkills}
        />
      )
    }
    return (
      <HomepageDefaultSections
        usersPopular={usersPopular}
        usersNew={usersNew}
        usersRecommended={usersRecommended}
        allSubcategories={allSubcategories}
        allSkills={allSkills}
      />
    )
  }

  if (variant === 'skillpage') {
    if (!currentCategoryId) return null
    const usersWithSkills = allUsers.map((user) => {
      const userSkill = allSkills.find((skill) => skill.userId === user.id)
      return { user, userSkill }
    })
    const similarUsers = usersWithSkills.filter(
      ({ user, userSkill }) =>
        userSkill?.categoryId === currentCategoryId && user.id !== currentUserId,
    )
    const skillResetKey = `${currentCategoryId}:${currentUserId ?? ''}:${listFingerprint(similarUsers.map((p) => p.user))}`

    return (
      <div className={styles.container}>
        <section className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Похожие предложения</h2>
        </section>
        <SkillCardGrid
          pairs={similarUsers}
          listClassName={styles.userListSkill}
          resetKey={skillResetKey}
          allSubcategories={allSubcategories}
        />
      </div>
    )
  }

  if (variant === 'favoritpage') {
    const favoriteUsers = allUsers.filter((user) => favoriteSkillIds.includes(user.skillOfferedId))
    const favKey = `${favoriteSkillIds.slice().sort((a, b) => a - b).join(',')}:${listFingerprint(favoriteUsers)}`

    return (
      <div className={styles.container}>
        <UserCardGrid
          users={favoriteUsers}
          listClassName={styles.userList}
          resetKey={favKey}
          allSubcategories={allSubcategories}
          allSkills={allSkills}
        />
      </div>
    )
  }

  return null
}
