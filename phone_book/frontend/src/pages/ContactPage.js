import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Skeleton} from "@mui/material";
import {Icon} from '@iconify/react';
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";


const MethodIcon = styled(Icon)({
    color: "black",
    width: "27px",
    height: "27px"
});


const ContactPage = () => {

    const methodIcons = {
        "phone": (<MethodIcon icon="ant-design:phone-filled"/>),
        "telegram": (<MethodIcon icon="icon-park:telegram"/>),
        "skype": (<MethodIcon icon="brandico:skype"/>),
        "email": (<MethodIcon icon="eva:email-fill"/>),
    };

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
                padding: "25px",
                borderRadius: "5px 5px 0 0",
            }} mb={2}>
                <Link to={`/`}>
                    <Typography fontSize={'20px'} fontWeight={'bold'}>
                        Contacts
                    </Typography>
                </Link>
            </AppBar>
            <Paper style={{
                margin: "130px 30px 0 30px",
                height: "530px"
            }}>
                <Avatar
                    component={Paper} elevation={4}
                    sx={{
                        bottom: "40px",
                        right: "20px",
                        width: "150px",
                        height: "150px",
                        border: "2px solid white",
                        zIndex: "2",
                    }} src={`data:image/jpeg;base64,${contact.avatar_info}`}/>
                <Grid container>
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                        style={{
                            paddingTop: "30px",
                            border: "1px solid lightgray",
                            borderRadius: "5px",
                            margin: "auto",
                            bottom: "90px",
                            height: "350px",
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader style={{
                                marginBottom: "20px"
                            }} component="div" id="nested-list-subheader">
                                {loading ? (<Typography item variant={"h5"}>
                                    {contact.contact_name}
                                </Typography>) : (<Skeleton animation="wave"/>)}

                            </ListSubheader>
                        }
                    >
                        {loading ? (loading.map((method, index) => (
                                <ListItemButton key={index}>
                                    <ListItemIcon>
                                        {methodIcons[method.name]}
                                    </ListItemIcon>
                                    <ListItemText primary={method.info}/>
                                </ListItemButton>
                            ))
                        ) : (<Skeleton sx={{m: '10px'}} animation="wave"/>)}

                    </List>
                </Grid>
            </Paper>
            <Footer/>
        </Box>
    )
}

export default ContactPage
