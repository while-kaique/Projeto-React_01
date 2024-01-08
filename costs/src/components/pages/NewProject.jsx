import { useNavigate } from 'react-router-dom'

import styles from './NewProject.module.css'

import ProjectForm from '../projects/ProjectForm'

function NewProject (){
    
    const navigate = useNavigate()

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then(data => {
            const state = {message: "Projeto criado com sucesso"}
            navigate("/projects",{ state })
        })
        .catch(err => console.log(err))
    }
    return (
        <section className={styles.newProject_Container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </section>
    )
}

export default NewProject