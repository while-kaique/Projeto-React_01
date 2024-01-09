import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Message from '../layout/Message.jsx'

import Container from '../layout/Container.jsx'
import ProjectForm from '../projects/ProjectForm.jsx'
import ServiceForm from '../services/ServiceForm.jsx'

function Project () {

    const { id } = useParams()

    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


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



    function createService(project) {
        setMessage('e')
        console.log('começou a criar o serviço')

        const lastService = project.services[project.services.length - 1]
        console.log('Definiu o mais recente ' + lastService)

        const lastServiceCost = lastService.cost
        console.log('Definiu o custo do mais recente ' + lastServiceCost)

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        console.log('Definiu o novo custo ' + newCost)

        if(newCost > parseFloat(project.budget)) {
            console.log('Entrou no IF')
            setMessage('Orçamento Ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false;
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            console.log(project)
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function updateProject(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento total não pode ser menor que o custo do projeto!')
            setType('error')
            return;
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('O projeto foi atualizado com sucesso!')
            setType('sucess')

        })
        .catch(err => console.log(err + 'eeeeeeeeeeeeeeeee'))
    }

    return (
        <> 
            {project.name ? 
                (<div className={styles.project_details}>
                    <Container customClass="column">
                        <Message type={type} msg={message}/>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
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
                                    <ProjectForm handleSubmit={updateProject} btnText="Atualizar Projeto" projectData={project}/>
                                </div>
                            )}
                        </div>

                        { /*Área de Serviços*/ /*Área de Serviços*/ /*Área de Serviços*/ }
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviço</p>
                        </Container>
                        { /*Área de Serviços*/ /*Área de Serviços*/ /*Área de Serviços*/ }
                        
                    </Container>
                </div>)
            : (<Loading />)}
        </>
    )
}

export default Project