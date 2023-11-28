import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButtom from '../layout/LinkButtom'
function Home (){
    return (
        <section className={styles.home_section}>
            <h1>Bem Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButtom to='/newproject' text="Criar Projeto"/>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home