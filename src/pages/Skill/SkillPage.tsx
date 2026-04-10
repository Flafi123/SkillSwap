import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/store/store'
import type { TSubcategory } from '../../shared/utils/types'
import { Button } from '../../shared/ui/Button'
import { IconButton } from '../../shared/ui/IconButton'
import { SkillCard } from '../../shared/ui/SkillCard'
import { OfferCreatedModal } from '../../widgets/Modals/OfferCreatedModal'
import { UserList } from '../../widgets/UserList/UserList'
import { UserCard } from '../../widgets/user-card'
import styles from './Skill.module.css'
import likeOutlineIcon from '../../shared/assets/icons/like-outline.png'
import shareIcon from '../../shared/assets/icons/share.png'
import moreSquareIcon from '../../shared/assets/icons/more-square.png'

const FALLBACK_IMAGE = '/images/skills/sk1-1.png'

const getSafeSubcategories = (
  wantedIds: number[] | undefined,
  allSubcategories: TSubcategory[],
): TSubcategory[] => {
  const selected = (wantedIds || [])
    .map((id) => allSubcategories.find((sub) => sub.id === id))
    .filter((sub): sub is TSubcategory => Boolean(sub))

  if (selected.length >= 2) {
    return selected
  }

  const fallback = allSubcategories.filter(
    (sub) => !selected.some((existing) => existing.id === sub.id),
  )
  return [...selected, ...fallback].slice(0, 2)
}

const SkillPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  const skillId = Number(id)

  const skill = useAppSelector((state) =>
    state.skill.allSkills.find((currentSkill) => currentSkill.id === skillId),
  )

  const user = useAppSelector((state) =>
    state.user.allUsers.find((currentUser) => currentUser.id === skill?.userId),
  )

  const allSubcategories = useAppSelector((state) => state.skill.allSubcategories)
  const allCategories = useAppSelector((state) => state.skill.allCategories)
  const profileUser = useAppSelector((state) => state.user.profileUser)

  const userSubcategories = useMemo(
    () => getSafeSubcategories(user?.subcategoriesWanted, allSubcategories),
    [user?.subcategoriesWanted, allSubcategories],
  )

  const categoryText = useMemo(() => {
    if (!skill) return ''

    const categoryTitle = allCategories.find((category) => category.id === skill.categoryId)?.title
    const subcategoryTitle = allSubcategories.find(
      (subcategory) => subcategory.id === skill.subcategoryId,
    )?.title

    return [categoryTitle, subcategoryTitle].filter(Boolean).join(' / ')
  }, [skill, allCategories, allSubcategories])

  if (!skill || !user) {
    return (
      <section className={styles.page}>
        <div className={styles.notFoundCard}>
          <h1 className={styles.notFoundTitle}>Навык не найден</h1>
          <p className={styles.notFoundText}>
            Проверьте корректность ссылки или выберите другой навык.
          </p>
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </section>
    )
  }

  const handleOfferClick = () => {
    if (!profileUser) {
      navigate('/register/step-1')
      return
    }

    setIsOfferModalOpen(true)
  }

  return (
    <section className={styles.page}>
      <div className={styles.topSection}>
        <UserCard
          variant="detailed"
          user={user}
          skill={skill}
          subcategories={userSubcategories}
          className={styles.userCard}
        />

        <div className={styles.skillColumn}>
          <div className={styles.actions}>
            <Link to="/favorites" aria-label="Открыть избранное">
              <IconButton
                icon={<img src={likeOutlineIcon} alt="избранное" />}
                type="button"
                className={styles.actionButton}
              />
            </Link>
            <IconButton
              icon={<img src={shareIcon} alt="поделиться" />}
              type="button"
              aria-label="Поделиться"
              className={styles.actionButton}
            />
            <IconButton
              icon={<img src={moreSquareIcon} alt="дополнительно" />}
              type="button"
              aria-label="Дополнительные действия"
              className={styles.actionButton}
            />
          </div>

          <SkillCard
            title={skill.title}
            category={categoryText}
            description={skill.description}
            images={skill.imagesUrl.length > 0 ? skill.imagesUrl : [FALLBACK_IMAGE]}
          >
            <Button className={styles.exchangeButton} onClick={handleOfferClick}>
              Предложить обмен
            </Button>
          </SkillCard>
        </div>
      </div>

      <UserList variant="skillpage" />

      <OfferCreatedModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />
    </section>
  )
}

export default SkillPage
