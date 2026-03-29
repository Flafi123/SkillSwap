import styles from './Logo.module.css';
import logo from '../../assets/logo.svg';

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Logo" className={styles.logoImage} />
      <span className={styles.text}>SkillSwap</span>
    </div>
  );
};