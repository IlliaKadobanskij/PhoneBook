import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import {Skeleton} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Grid from "@mui/material/Grid";
import React from "react";
import {ListItemIconStyles, ListItemTextStyles, ListStyles, ListSubheaderStyles, methodIcons} from "./Styles";


const ContactInfo = ({loading, contact}) => {
    return (
        <Grid container>
            <List
                style={ListStyles}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={ListSubheaderStyles} component="div" id="nested-list-subheader">
                        {loading ? (<Typography item variant={"h4"}>
                            {contact.contact_name}
                        </Typography>) : (<Skeleton animation="wave"/>)}

                    </ListSubheader>
                }
            >
                {loading ? (loading.map((method, index) => (
                        <ListItemButton key={index}>
                            <ListItemIcon style={ListItemIconStyles}>
                                {methodIcons[method.name]}
                            </ListItemIcon>
                            <div style={ListItemTextStyles}>{method.info}</div>
                        </ListItemButton>
                    ))
                ) : (<Skeleton sx={{m: '10px'}} animation="wave"/>)}

            </List>
        </Grid>
    )
}

export default ContactInfo