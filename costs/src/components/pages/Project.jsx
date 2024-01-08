import styles from './Project.module.css'

import {useParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

import Container from '../layout/Container.jsx'
import ProjectForm from '../projects/ProjectForm.jsx'

function Project () {

    const { id } = useParams()
    const navigate = useNavigate()

    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [updId, setUpdId] = useState(0)

    useEffect(()=> {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json'
                }
            }).then(resp => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
        }, 500)    
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function updateProject(project) {
        console.log(id)
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then(data => {
            setUpdId(updId + 1)
            console.log(updId)
            console.log(updId)
            console.log(updId)
            console.log(updId)
            console.log(updId)
            console.log(updId)
            const state = {message: 'Projeto atualizado com sucesso!'}
            navigate("/projects", { state, updId })
        })
        .catch(err => console.log(err + 'eeeeeeeeeeeeeeeeeeeeeeeeee'))
    }

    return (
        <> 
            {project.name ? 
                (<div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento Total:</span> {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={updateProject} btnText="Atualizar Projeto"/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>)
            : (<Loading />)}
        </>
    )
}

export default Project