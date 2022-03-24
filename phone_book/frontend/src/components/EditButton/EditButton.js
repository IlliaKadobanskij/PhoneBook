import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import React from "react";
import {ButtonStyles, EditIconStyles, GridStyles} from "./Styles";

const EditButton = ({id}) => {

    return (
        <Grid style={GridStyles} item>
            <Button href={`/update_contact/${id}`} variant="contained" style={ButtonStyles}>
                <EditIcon style={EditIconStyles}/>
            </Button>
        </Grid>
    )
}

export default EditButton