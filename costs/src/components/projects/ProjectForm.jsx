import { useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm ({btnText}){

    const [categories, setCategories] = useState([])

    fetch("http://localhost:5000/categories", {
        method: "GET",
        
    })

    return (
        <form className={styles.form}>
            <div><Input text='Nome do projeto:' name='name' id='nomeid' type='text' placeholder='Insira o nome do projeto' /></div>
            <div><Input text='Orçamento:' name='budget' id='nome2id' type='number' placeholder='Insira o orçamento total' /></div>
            <div>
                <Select name="category_id" text="Selecione a categoria"/>
            </div>
            <div><SubmitButton text={btnText}/></div>
        </form>
    )
}

export default ProjectForm