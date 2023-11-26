import { Link } from 'react-router-dom'

import Container from './Container'

import style from './Navbar.module.css'

import logo from '../../img/costs_logo.png'
 
function Navbar () {
    return (
        <nav>
            <Container>
                <Link to='/'><img src={logo} alt="Logo_Costs" /></Link>
                <Link to="/">Home</Link>
                <Link to="/contact">Contato</Link>
                <Link to="/company">Empresa</Link>
                <Link to="/NewProject">Novo Projeto</Link>
                <li>Contato</li>
            </Container>
        </nav>
    )
}

export default Navbar