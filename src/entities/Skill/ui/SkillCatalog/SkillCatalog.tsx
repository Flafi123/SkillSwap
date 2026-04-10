import styles from './SkillCatalog.module.css'
import bagIcon from '../../../../shared/assets/icons/bag.png'
import paletteIcon from '../../../../shared/assets/icons/palette.png'
import earthIcon from '../../../../shared/assets/icons/earth.png'
import bookIcon from '../../../../shared/assets/icons/book.png'
import homeIcon from '../../../../shared/assets/icons/home.png'
import leafIcon from '../../../../shared/assets/icons/leaf.png'
import { useAppSelector } from '../../../../app/store/store'

const categoryIcons: Record<number, string> = {
  1: bagIcon,
  2: paletteIcon,
  3: earthIcon,
  4: bookIcon,
  5: homeIcon,
  6: leafIcon,
}

export const SkillCatalog = () => {
  const categories = useAppSelector((state) => state.skill.allCategories)
  const subcategories = useAppSelector((state) => state.skill.allSubcategories)

  return (
    <section className={styles.catalog}>
      {categories.map((category) => {
        const categorySubcategories = subcategories.filter(
          (subcategory) => subcategory.categoryId === category.id,
        )
        const categoryIcon = categoryIcons[category.id]

        return (
          <div key={category.id} className={styles.catalogBlock}>
            <div className={styles.blockHeader}>
              {categoryIcon && <img src={categoryIcon} alt="" aria-hidden="true" />}
              <h2 className={styles.blockTitle}>{category.title}</h2>
            </div>
            <ul className={styles.blockList}>
              {categorySubcategories.map((subcategory) => (
                <li key={subcategory.id} className={styles.blockItem}>
                  {subcategory.title}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
