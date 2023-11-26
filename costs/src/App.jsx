import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Company from './components/pages/Company';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/company' element={<Company />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/newproject' element={<NewProject />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
