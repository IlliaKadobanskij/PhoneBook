import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

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

    return (
        <Box sx={{
            width: "33%",
            minWidth: "400px",
            minHeight: "700px",
            mx: 'auto',
            overflow: 'hidden',
            backgroundColor: "lightgray",
            borderRadius: "5px 5px 0 0",
        }}>
            <AppBar style={{
                position: "fixed",
                width: "33%",
                minWidth: "400px",
                margin: "auto",
                left: 0,
                right: 0,
                padding: "40.5px",
                borderRadius: "5px 5px 0 0",
            }} mb={2}>

            </AppBar>
            <Footer/>
        </Box>
    )
}

export default ContactPage
