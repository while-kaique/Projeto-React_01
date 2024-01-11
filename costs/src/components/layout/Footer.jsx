import {FaLinkedin, FaGithub} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer () {
    return (
    <footer className={styles.footer}>
        <ul className={styles.social-list}>
            <li><a href="https://github.com/while-kaique">
                <FaGithub />
            </a></li>
            <li><a href="https://www.linkedin.com/in/kaique-breno-246a13227/">
                <FaLinkedin />
            </a></li>
        </ul>
        <p className={styles.copy-right}><span>Costs</span> &copy; 2021</p>
    </footer>
    )
}

export default Footer