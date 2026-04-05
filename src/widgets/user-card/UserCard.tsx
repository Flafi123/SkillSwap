import clsx from 'clsx'
import { useId } from 'react'
import { Button } from '../../shared/ui/Button'
import styles from './UserCard.module.css'

export interface UserCardProps {
  variant?: 'compact' | 'detailed'
  avatarSrc: string
  avatarAlt?: string
  name: string
  city: string
  age: number
  canTeachSkills: string[]
  wantToLearnSkills: string[]
  about?: string
  /** В избранном: залитое сердце; иначе — только контур */
  isLiked?: boolean
  onLikeClick?: () => void
  onDetailsClick?: () => void
  className?: string
}

function LikeIcon({ liked }: { liked: boolean }) {
  return (
    <svg
      className={clsx(styles.likeIcon, liked ? styles.likeIconActive : styles.likeIconInactive)}
      viewBox="2 3.45 20 17.9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  )
}

export const UserCard = ({
  variant = 'compact',
  avatarSrc,
  avatarAlt,
  name,
  city,
  age,
  canTeachSkills,
  wantToLearnSkills,
  about,
  isLiked = false,
  onLikeClick,
  onDetailsClick,
  className,
}: UserCardProps) => {
  const profileHeadingId = useId()
  const teachHeadingId = useId()
  const learnHeadingId = useId()
  const teachToShow = variant === 'compact' ? canTeachSkills.slice(0, 1) : canTeachSkills

  return (
    <article className={clsx(styles.card, styles[variant], className)}>
      <section className={styles.topSection} aria-labelledby={profileHeadingId}>
        <div className={styles.header}>
          <img className={styles.avatar} src={avatarSrc} alt={avatarAlt ?? name} width={100} height={100} />
          <div className={styles.userInfo}>
            <h3 id={profileHeadingId} className={styles.name}>
              {name}
            </h3>
            <p className={styles.meta}>
              {city}, {age} лет
            </p>
          </div>
        </div>
        {variant === 'compact' && (
          <button
            type="button"
            className={styles.likeButton}
            onClick={onLikeClick}
            aria-pressed={isLiked}
            aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <LikeIcon liked={isLiked} />
          </button>
        )}
        {variant === 'detailed' && about != null && about !== '' && <p className={styles.about}>{about}</p>}
      </section>

      <div className={styles.skillsColumn}>
        <section className={styles.section} aria-labelledby={teachHeadingId}>
          <h4 id={teachHeadingId} className={styles.sectionTitle}>
            Может научить:
          </h4>
          <ul className={styles.skillList}>
            {teachToShow.map((skill) => (
              <li key={skill}>
                <span className={styles.skillTag}>{skill}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby={learnHeadingId}>
          <h4 id={learnHeadingId} className={styles.sectionTitle}>
            Хочет научиться:
          </h4>
          <ul className={styles.skillList}>
            {wantToLearnSkills.map((skill) => (
              <li key={skill}>
                <span className={styles.skillTag}>{skill}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {variant === 'compact' && (
        <div className={styles.footer}>
          <Button type="button" variant="primary" className={styles.detailsButton} onClick={onDetailsClick}>
            Подробнее
          </Button>
        </div>
      )}
    </article>
  )
}
