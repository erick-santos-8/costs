import ProjectForm from "../project/ProjectForm"
import styles from "./NewProjects.module.css"
function NewProjects(){
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie o seu projeto para adicionar aos serviços depois</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProjects