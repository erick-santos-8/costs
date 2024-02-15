import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProjects from "./components/pages/NewProjects";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Projects from "./components/pages/Projects";

import Container from "./components/layout/Container"; // Certifique-se de que o caminho está correto

function App() {
  return (

    <Router>

      <Navbar/>

      <Container customClass="min-height">
      <Routes>
        <Route path="/" element= {< Home />}/>
        <Route path="/projects" element= {< Projects />}/>
        <Route path="/company" element= {< Company />}/>
        <Route path="/contact" element= {< Contact />}/>
        <Route path="newprojects" element= {< NewProjects />}/>
      </Routes>
      </Container>
      <Footer/>

    </Router>
  );
}

export default App;
