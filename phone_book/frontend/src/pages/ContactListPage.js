import React, {useState, useEffect} from "react";
import ListContact from "../components/ListContact";

import Box from '@mui/material/Box';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    color: 'darkgray',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'darkgray',
    '& .MuiInputBase-input': {
        fontSize: "15px",
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const ContactsListPage = () => {

    let [contacts, setContacts] = useState([])
    let [value, setValue] = useState('')

    const filteredContacts = contacts.filter(contact => {
        return contact.contact_name.toLowerCase().includes(value.toLowerCase())
    })

    useEffect(() => {
        getContacts()
    }, [])

    let getContacts = async () => {

        let response = await fetch('/api/profiles/')
        let data = await response.json()
        setContacts(data)
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
                padding: "25px",
                borderRadius: "5px 5px 0 0",
            }} mb={2}>
                <Search style={{
                    width: "75%",
                    margin: "auto",
                    borderRadius: "50px",
                }}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Search>
            </AppBar>

            <Grid margin="100px 0">
                {filteredContacts.map((contact, index) => (
                    <ListContact key={index} contact={contact}/>
                ))}
            </Grid>

            <Footer/>
        </Box>
    )
}

export default ContactsListPage