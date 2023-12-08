import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButtom from "../layout/LinkButtom"
import ProjectCard from "../projects/ProjectCard"
import { useState, useEffect } from "react"


function Projects (){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMesssage] = useState('')

    const location = useLocation()

    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(resp => resp.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(err => console.log(err))
        }, 1000);
    }, [])

    function removeProject (id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMesssage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButtom to="/newproject" text="Criar Projeto" />
            </div>
            <h1>Meu Projeto</h1>
            {projectMessage && <Message type="sucess" msg={projectMessage}/>}
            {message && <Message type="sucess" msg={message}/>}
            <Container customClass="start">
                {projects.length > 0 && 
                projects.map((project)=>{
                    return <ProjectCard 
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                })}

                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects