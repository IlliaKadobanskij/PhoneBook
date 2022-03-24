import React, {useState, useEffect} from "react";
import ListContact from "../components/ListContact/ListContact";
import Box from '@mui/material/Box';
import Footer from "../components/Footer/Footer";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";


const ContactsListPage = () => {

    let [contacts, setContacts] = useState([])
    let [value, setValue] = useState('')

    const filteredContacts = contacts.filter(contact => {
        return contact.contact_name.toLowerCase().includes(value.toLowerCase())
    })

    useEffect(() => {
        getContacts()
    }, [])

    let getContacts = async () => {

        let response = await fetch('/api/profiles/')
        let data = await response.json()
        setContacts(data)
    }

    return (
        <Box sx={{
            width: "33%",
            minWidth: "400px",
            minHeight: "1000px",
            margin: '0 auto',
            overflow: 'hidden',
            backgroundColor: "lightgray",
            borderRadius: "5px 5px 0 0",
        }}>
            <Header search={true} setValue={setValue}/>
            <Grid margin="100px 0">
                {filteredContacts.map((contact, index) => (
                    <ListContact key={index} contact={contact}/>
                ))}
            </Grid>
            <Footer/>
        </Box>
    )
}

export default ContactsListPage