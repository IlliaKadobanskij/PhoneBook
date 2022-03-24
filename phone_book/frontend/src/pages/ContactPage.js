import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import ContactAvatar from "../components/ContactAvatar/ContactAvatar";
import EditButton from "../components/EditButton/EditButton";
import ContactInfo from "../components/ContactInfo/ContactInfo";

const ContactPage = () => {
    let {id} = useParams();
    let [contact, setContact] = useState("")

    useEffect(() => {
        getContact()
    }, [id])

    let getContact = async () => {
        let response = await fetch(`/api/profiles/${id}/`)
        let data = await response.json()
        setContact(data)
    }

    const loading = contact.communication_methods;

    return (
        <Box style={{
            width: "33%",
            minWidth: "400px",
            minHeight: "1000px",
            margin: '0 auto',
            overflow: 'hidden',
            backgroundColor: "lightgray",
            borderRadius: "5px 5px 0 0",
        }}>
            <Header search={false}/>
            <Paper style={{
                margin: "130px 30px 0 30px",
                height: "700px"
            }}>
                <Grid container>
                    <ContactAvatar contact={contact}/>
                    <EditButton id={id}/>
                </Grid>

                <ContactInfo loading={loading} contact={contact}/>
            </Paper>
            <Footer/>
        </Box>
    )
}

export default ContactPage
