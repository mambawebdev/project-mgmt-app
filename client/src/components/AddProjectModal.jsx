import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { GET_CLIENTS } from "../queries/clientQueries"
import { ADD_PROJECT } from "../mutations/projectMutations"

const AddProjectModal = () => {


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clientId, setClientId] = useState('')
    const [status, setStatus] = useState('new')

    // Using the ADD_PROJECT function to mutate data

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        // Update the cache
        update(cache, { data: { addProject } }) {
            // reading the current list of projects from the cache by using GET_PROJECTS query
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            // writing a new version of the GET_PROJECTS query result to the cache
            // It combines the existing projects array with the new addProject result
            // Updating the cache when the mutation happens
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })

        }
    })

    // Get Clients

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault()
        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all the fields')
        }

        addProject(name, description, clientId, status)

        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    };

    if (loading) return null;
    if (error) return 'Something went wrong'


    return (
        <>
            {
                !loading && !error && (
                    <>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                            <div className="d-flex align-items-center">
                                <FaList className="icon" />
                                <div className="">New Project</div>
                            </div>
                        </button>
                        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="addProjectModalLabel">Add New Project</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={onSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
                                                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Status</label>
                                                <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="new" className="">Not Started</option>
                                                    <option value="progress" className="">In Progress</option>
                                                    <option value="completed" className="">Completed</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Client</label>
                                                <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                                    <option value="">Select Client</option>
                                                    {
                                                        data.clients.map((client) => (
                                                            <option key={client.id} value={client.id} className="">{client.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default AddProjectModal

