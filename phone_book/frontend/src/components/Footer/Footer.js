import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import {footerStyles, StyledFab} from "./Styles";


function Footer() {
    const classes = footerStyles();
    return (
        <AppBar className={classes.footer_appBar} position={"relative"}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer">
                    <MenuIcon/>
                </IconButton>
                <Link to={'/new_contact'}>
                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon/>
                    </StyledFab>
                </Link>
                <Box sx={{flexGrow: 1}}/>
                <IconButton color="inherit">
                    <SearchIcon/>
                </IconButton>
                <IconButton color="inherit">
                    <MoreIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Footer