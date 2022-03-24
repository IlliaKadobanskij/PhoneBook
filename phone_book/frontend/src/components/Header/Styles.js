import {makeStyles} from "@mui/styles";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


export const Search = styled('div')(({theme}) => ({
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

export const SearchIconWrapper = styled('div')(({theme}) => ({
    color: 'darkgray',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
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

export const headerStyles = makeStyles({
    header_appBar: {
        position: "fixed",
        width: "33%",
        minWidth: "400px",
        margin: "auto",
        left: 0,
        right: 0,
        padding: "25px",
        borderRadius: "5px 5px 0 0",
        marginBottom: "16px"
    },
    header_search: {
        width: "75%",
        margin: "auto",
        borderRadius: "50px",
    }
});