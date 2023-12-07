import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import Container from '../layout/Container'
import LinkButtom from "../layout/LinkButtom"
import ProjectCard from "../projects/ProjectCard"
import { useState, useEffect } from "react"


function Projects (){

    const [projects, setProjects] = useState([])

    const location = useLocation()

    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(resp => {
            return resp.json()
        })
        .then(data => {
            console.log(data)
            setProjects(data)
        })
        .catch(err => console.log(err))

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButtom to="/newproject" text="Criar Projeto" />
            </div>
            <h1>Meu Projeto</h1>
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
                    />
                })
                }
            </Container>
        </div>
    )
}

export default Projects