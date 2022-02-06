import React from "react";
import {Link} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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

const ListContact = ({contact}) => {
    return (
        <Link to={`/contact/${contact.id}`}>
            <Paper sx={{maxWidth: 400, my: 1, mx: 'auto', p: 2}}>
                <Grid container>
                    <Grid item alignContent={"center"}>
                        <Avatar sx={{mx: '10px'}} src={contact.avatar}/>
                    </Grid>
                    <Grid item xs>
                        <Typography sx={{mt:1}} fontSize={12} fontWeight={"bold"} ml={5}
                                    align="left">{contact.contact_name}</Typography>
                        <Typography fontSize={12} ml={5}
                                    align="left">{takePhone(contact).name}: {takePhone(contact).info}</Typography>

                    </Grid>
                    <Grid item alignContent={"center"}>
                        <Grid item>
                            <EditIcon/>
                        </Grid>
                        <Grid item>
                            <DeleteIcon/>
                        </Grid>

                    </Grid>

                </Grid>
            </Paper>
        </Link>
    )
}

export default ListContact