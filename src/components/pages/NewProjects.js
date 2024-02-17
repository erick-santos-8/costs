import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm"
import styles from "./NewProjects.module.css"
function NewProjects(){
    const navigate = useNavigate();

    function createPost(project){
        //initialize cost and services
        project.cost = 0
        project.services = []

            fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
            //mandando os dados para o servidor 
        }).then((resp)=> resp.json())
        .then((data) => navigate('/projects',{state: {message: "Projeto criado com sucesso"}}))
        
        .catch(err => console.log(err))
    }
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie o seu projeto para adicionar aos serviços depois</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProjects