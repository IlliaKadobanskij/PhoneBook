import React from "react";
import {Link} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Skeleton} from "@mui/material";
import {ListContactStyles} from "./Styles";


function showMethods(contact, loading, classes) {
    let methods = contact.communication_methods
    let res = methods[0]

    if (res != null){
        Object.entries(methods).map((com_name) => {
            if (com_name[1].name === "phone") {
                res = com_name[1]
            }
        })
        return <div>{loading ? (<Typography className={classes.listContact_typography_lower}
                                                align="left">{res.name}: {res.info}</Typography>) : (
                            <Skeleton className={classes.listContact_typographySk} animation="wave"/>
                        )}</div>
    }
}


const ListContact = ({contact}) => {
    const classes = ListContactStyles();
    const loading = contact;

    return (
        <Link to={`/contact/${contact.id}`}>
            <Paper className={classes.listContact_paper}>
                <Grid container>
                    <Grid item alignContent={"center"}>
                        {loading ? (<Avatar className={classes.listContact_avatar} src={`data:image/jpeg;base64,${contact.avatar_info}`}/>) : (
                            <Skeleton variant="circular" className={classes.listContact_avatarSk} animation="wave"/>
                        )}
                    </Grid>
                    <Grid item xs>
                        {loading ? (<Typography className={classes.listContact_typography_higher} align="left">{contact.contact_name}</Typography>) : (
                            <Skeleton className={classes.listContact_typographySk} animation="wave"/>
                        )}
                        {showMethods(contact, loading, classes)}

                    </Grid>

                </Grid>
            </Paper>
        </Link>
    )
}

export default ListContact