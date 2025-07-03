import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
        // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        // Update the Cache will be to handle more queries without slowing down your application
        /*  update(cache, { data: { deleteClient } }) {
             // Getting the query from the cache, this will not make a whole new request
             const { clients } = cache.readQuery({
                 query: GET_CLIENTS
             })
             // Write to the cache using the GET_CLIENTS 
             cache.writeQuery({
                 query: GET_CLIENTS,
                 // Setting clients in our data to filter out the one of the client that we want to delete
                 data: { clients: clients.filter(client => client.id !== deleteClient.id) }
             })
         } */
    })


    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger" onClick={deleteClient}><FaTrash /></button>
            </td>
        </tr>
    )
}

export default ClientRow