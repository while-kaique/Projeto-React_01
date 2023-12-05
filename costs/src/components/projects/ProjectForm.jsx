import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm ({handleSubmit, projectData ,btnText}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {return res.json()})
        .then(data => {
            setCategories(data)
        })
        .catch(error => {console.log(error)})
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        handleSubmit(project) 
    }
    
    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }
    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div><Input handleOnChange={handleChange} text='Nome do projeto:' name='name' id='nomeid' type='text' placeholder='Insira o nome do projeto' value={project.name ? project.name : ''}/></div>
            <div><Input handleOnChange={handleChange} text='Orçamento:' name='budget' id='nome2id' type='number' placeholder='Insira o orçamento total' value={project.budget ? project.budget : ''} /></div>
            <div>
                <Select handleOnChange={handleCategory} name="category_id" text="Selecione a categoria" options={categories} value={project.category ? project.category.id : ''}/>
            </div>
            <div><SubmitButton text={btnText}/></div>
        </form>
    )
}

export default ProjectForm