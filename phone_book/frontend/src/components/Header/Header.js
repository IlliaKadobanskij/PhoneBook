import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {headerStyles, Search, SearchIconWrapper, StyledInputBase} from "./Styles";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Header({search, setValue = null}) {
    const classes = headerStyles();

    const navigate = useNavigate();

    return (
        <AppBar className={classes.header_appBar}>
            <Grid container>
                <Grid item xs={2}>
                    <IconButton style={{width: "30px", height: '30px'}} onClick={() => navigate(-1)}>
                        <ArrowBackIcon style={{width: "30px", height: '30px'}}/>
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    {search ?
                        <Search className={classes.header_search}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Search>
                        :
                        <Link to={`/`}>
                            <Typography fontSize={'20px'} fontWeight={'bold'}>
                                Contacts
                            </Typography>
                        </Link>}
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header
