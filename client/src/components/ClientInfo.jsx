import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"

const ClientInfo = ({ client }) => {


    return (
        <h5 className="">
            <ul className="list-group">
                <div className="list-group-item">
                    <FaIdBadge className="icon" /> {client.name}
                </div>
                <div className="list-group-item">
                    <FaPhone className="icon" /> {client.phone}
                </div>
                <div className="list-group-item">
                    <FaEnvelope className="icon" /> {client.email}
                </div>
            </ul>
        </h5>
    )
}

export default ClientInfo