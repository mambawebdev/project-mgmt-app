import Spinner from '../components/Spinner'
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from './ProjectCard';


const Projects = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return null;
    if (error) return <p>Something went wrong</p>


    return (
        <>
            {
                data.projects.length > 0 ?
                    (<div className="row mt-4">
                        {
                            data.projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                    </div>)
                    :
                    (<p>No Projects.</p>)
            }
        </>
    )
}

export default Projects