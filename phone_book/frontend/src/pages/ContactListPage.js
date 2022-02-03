import React, {useState, useEffect} from "react";

const ContactsListPage = () => {

    let [contacts, setContacts] = useState([])

    useEffect(() => {
        getContacts()
    }, [])

    let getContacts = async () => {

        let response = await fetch('http://127.0.0.1:8000/api/profiles/')
        let data = await response.json()
        setContacts(data)
    }

    return (
        <div>
            <div className="contacts-list">
                {contacts.map((contact, index) => (
                    <div>
                        <h3>{contact.contact_name}</h3>
                        <h3>{contact.communication_method[0].name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ContactsListPage