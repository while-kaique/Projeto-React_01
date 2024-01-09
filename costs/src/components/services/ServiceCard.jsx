import { Link } from "react-router-dom"
import styles from "../projects/ProjectCard.module.css"

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ServiceCard ({ id, name, cost, description, handleRemove }){

    function remove(e){
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p></p>

            <p>
                <span>Custo total:</span> R${cost}
            </p>
            
            <p>
                <span>Descrição:</span> {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard