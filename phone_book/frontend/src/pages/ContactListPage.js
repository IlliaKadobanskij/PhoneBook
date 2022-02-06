import React, {useState, useEffect} from "react";
import ListContact from "../components/ListContact";

import Box from '@mui/material/Box';



const ContactsListPage = () => {

    let [contacts, setContacts] = useState([])

    useEffect(() => {
        getContacts()
    }, [])

    let getContacts = async () => {

        let response = await fetch('/api/profiles/')
        let data = await response.json()
        setContacts(data)
    }

    return (
        <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}}>
            {contacts.map((contact, index) => (
                <ListContact key={index} contact={contact}/>
            ))}
        </Box>
    )

}

export default ContactsListPage