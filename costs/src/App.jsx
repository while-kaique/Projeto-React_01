// Importando pacotes necessários
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Importando páginas
import Company from './components/pages/Company';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

// Importando componentes
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'

// Criando aplicação "App" que está indexada ao arquivo html index.html
function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/projects' element={<Projects />}/>
          <Route exact path='/company' element={<Company />}/>
          <Route exact path='/contact' element={<Contact />}/>
          <Route exact path='/newproject' element={<NewProject />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
