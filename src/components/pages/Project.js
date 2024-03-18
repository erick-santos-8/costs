import { parse, v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message"
import ServiceForm from "../service/ServiceForm"

import styles from "./Project.module.css"

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, SetShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((err) => console.log(err));
  });

  function editPost(project){
    setMessage("")


    if (project.budget < project.cost){
      setMessage("O orcamento nao pode ser menor que os custos!")
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
    },  
      body: JSON.stringify(project),
  })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)

      setMessage("Projeto alterado com sucesso!")
      setType("success")
    })
    .catch((err) => console.log(err))
  }

  function createService(){
    setMessage("")
    const lastService = project.services[project.services.length -1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    
    //maximum value validation
    if(newCost > parseFloat(project.budget)){
      setMessage("Orçamento ultrapassado! Verifique o valor do serviço")
      setType("error")
      project.services.pop()
      return false
    }
    
    //add service cost to project total cost
    project.cost = newCost

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    }).then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err)=> console.log(err))
  }

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm(){
    SetShowServiceForm(!showServiceForm);
  }
  
  return <>{project.name ?( 
    <div className={styles.project_details}>
      <Container customClass="column">
        {message && <Message type={type} msg={message}/>}
        <div className={styles.details_container}>
          <h1>Projeto: {project.name}</h1>
          <button onClick={toggleProjectForm} className={styles.btn}>
            {!showProjectForm ? "Editar Projeto" : "Fechar"}
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Categoria: </span> {project.category.name}
              </p>
              <p>
                <span>Total de Orçamento: </span> {project.budget}
              </p>
              <p>
                <span>Total Utilizado: </span> {project.cost}
              </p>
            </div>
          ) : (
            <div className={styles.project_info}>
              <ProjectForm btnText="Finalizar Edicao" projectData={project} handleSubmit={editPost}/>
            </div>
          )}
        </div>
        <div className={styles.service_form_container}>
          <h2>Adicione um servico: </h2>
          <button onClick={toggleServiceForm} className={styles.btn}>
            {!showServiceForm ? "Adicionar servico" : "Fechar"}
          </button>
          <div className={styles.project_info}>
            {showServiceForm &&
            (
              <ServiceForm handleSubmit = {createService} projectData = {project} btnText="Adicionar Serviço"/>
            )
            }
          </div>
        </div>
        <h2>Servicos</h2>
        <Container customClass="start">
          <p>Itens de servico</p>
        </Container>
      </Container>  
    </div>
    ) :( <Loading/>)}</>
}
export default Project;
