import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Skeleton} from "@mui/material";


function takePhone(contact) {
    let methods = contact.communication_methods
    let res = methods[0]

    Object.entries(methods).map((com_name) => {
            if (com_name[1].name === "phone") {
                res = com_name[1]
            }
        }
    )
    return res
}


const CommunicationMethod = ({contact}) => {


    const loading = contact;

    return (
        <Link to={`/contact/${contact.id}`}>
            <Paper sx={{mx: 'auto', p: 1, margin: "4px 10px"}}>
                <Grid container>
                    <Grid item alignContent={"center"}>
                        {loading ? (<Avatar sx={{m: '10px'}} src={`data:image/jpeg;base64,${contact.avatar_info}`}/>) : (
                            <Skeleton variant="circular" width={40} height={40} sx={{m: '10px'}} animation="wave"/>
                        )}
                    </Grid>
                    <Grid item xs>
                        {loading ? (<Typography sx={{mt: 1}} fontSize={12} fontWeight={"bold"} ml={5}
                                                align="left">{contact.contact_name}</Typography>) : (
                            <Skeleton width={"75%"} style={{margin: "10px 0 0 10px"}} animation="wave"/>
                        )}
                        {/*{loading ? (<Typography fontSize={12} ml={5}*/}
                        {/*                        align="left">{takePhone(contact).name}: {takePhone(contact).info}</Typography>) : (*/}
                        {/*    <Skeleton width={"75%"} style={{marginLeft: "10px"}} animation="wave"/>*/}
                        {/*)}*/}

                    </Grid>

                </Grid>
            </Paper>
        </Link>
    )
}

export default ListContact