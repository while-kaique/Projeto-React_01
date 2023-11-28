import styles from './NewProject.module.css'

import ProjectForm from '../projects/ProjectForm'

function NewProject (){
    return (
        <section className={styles.newProject_Container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto" />
        </section>
    )
}

export default NewProject