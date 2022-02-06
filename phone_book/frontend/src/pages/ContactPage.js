import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const ContactPage = () => {

    let { id } = useParams();
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
        <div>
            <h1>hello</h1>
            <h1>{contact.contact_name}</h1>
        </div>
    )
}

export default ContactPage