import AddClientModal from "../components/AddClientModal"
import AddProjectModal from "../components/AddProjectModal"
import Clients from "../components/Clients"
import Projects from "../components/Projects"


const Home = () => {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientModal />
                <AddProjectModal />
            </div>
            <Projects />
            <hr className="mb-1" />
            <Clients />
        </>
    )
}

export default Home