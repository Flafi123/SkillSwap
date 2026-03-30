import styles from './SkillCatalog.module.css'
import bagIcon from '../../../../shared/assets/icons/bag.png'
import paletteIcon from '../../../../shared/assets/icons/palette.png'
import earthIcon from '../../../../shared/assets/icons/earth.png'
import bookIcon from '../../../../shared/assets/icons/book.png'
import homeIcon from '../../../../shared/assets/icons/home.png'
import leafIcon from '../../../../shared/assets/icons/leaf.png'

export const SkillCatalog = () => {
  return (
    <section className={styles.catalog}>
      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={bagIcon} alt="иконка портфеля-дипломата" />
          <h2 className={styles.blockTitle}>Бизнес и карьера</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Управление командой</li>
          <li className={styles.blockItem}>Маркетинг и реклама</li>
          <li className={styles.blockItem}>Продажи и переговоры</li>
          <li className={styles.blockItem}>Личный бренд</li>
          <li className={styles.blockItem}>Резюме и собеседование</li>
          <li className={styles.blockItem}>Тайм-менеджмент</li>
          <li className={styles.blockItem}>Проектное управление</li>
          <li className={styles.blockItem}>Предпринимательство</li>
        </ul>
      </div>

      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={paletteIcon} alt="иконка палитры" />
          <h2 className={styles.blockTitle}>Творчество и искусство</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Рисование и иллюстрация</li>
          <li className={styles.blockItem}>Фотография</li>
          <li className={styles.blockItem}>Видеомонтаж</li>
          <li className={styles.blockItem}>Музыка извук</li>
          <li className={styles.blockItem}>Актёрское мастерство</li>
          <li className={styles.blockItem}>Креативное письмо</li>
          <li className={styles.blockItem}>Арт-терапия</li>
          <li className={styles.blockItem}>Декор и DIY</li>
        </ul>
      </div>

      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={earthIcon} alt="иконка глобуса" />
          <h2 className={styles.blockTitle}>Иностранные языки</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Английский</li>
          <li className={styles.blockItem}>Французский</li>
          <li className={styles.blockItem}>Испанский</li>
          <li className={styles.blockItem}>Немецкий</li>
          <li className={styles.blockItem}>Китайский</li>
          <li className={styles.blockItem}>Японский</li>
          <li className={styles.blockItem}>Подготовка к экзаменам (IELTS, TOEFL)</li>
        </ul>
      </div>

      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={bookIcon} alt="иконка книги" />
          <h2 className={styles.blockTitle}>Образование и развитие</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Личностное развитие</li>
          <li className={styles.blockItem}>Навыки обучения</li>
          <li className={styles.blockItem}>Когнитивные техники</li>
          <li className={styles.blockItem}>Скорочтение</li>
          <li className={styles.blockItem}>Навыки преподавания</li>
          <li className={styles.blockItem}>Коучинг</li>
        </ul>
      </div>

      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={homeIcon} alt="иконка дома" />
          <h2 className={styles.blockTitle}>Дом и уют</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Уборка и организация</li>
          <li className={styles.blockItem}>Домашние финансы</li>
          <li className={styles.blockItem}>Приготовление еды</li>
          <li className={styles.blockItem}>Домашние растения</li>
          <li className={styles.blockItem}>Ремонт</li>
          <li className={styles.blockItem}>Хранение вещей</li>
        </ul>
      </div>

      <div className={styles.catalogBlock}>
        <div className={styles.blockHeader}>
          <img src={leafIcon} alt="иконка листа" />
          <h2 className={styles.blockTitle}>Здоровье и лайфстайл</h2>
        </div>
        <ul className={styles.blockList}>
          <li className={styles.blockItem}>Йога и медитация</li>
          <li className={styles.blockItem}>Питание и ЗОЖ</li>
          <li className={styles.blockItem}>Ментальное здоровье</li>
          <li className={styles.blockItem}>Осознанность</li>
          <li className={styles.blockItem}>Физические тренировки</li>
          <li className={styles.blockItem}>Сон и восстановление</li>
          <li className={styles.blockItem}>Баланс жизни и работы</li>
        </ul>
      </div>
    </section>
  )
}
