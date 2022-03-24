import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React from "react";
import {contactAvatarStyles} from "./Styles"

const ContactAvatar = ({contact=null, imageUrl=null}) => {

    let image;
    if (!contact && !imageUrl){
        image = ''
    }else if (contact || imageUrl){
        image = imageUrl ? imageUrl : `data:image/jpeg;base64,${contact.avatar_info}`
    }

    return (
        <Grid item>
            <Avatar
                style={contactAvatarStyles}
                component={Paper} elevation={4}
                src={image}/>
        </Grid>
    )
}

export default ContactAvatar