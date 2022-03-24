import {styled} from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import {makeStyles} from "@mui/styles";

export const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export const footerStyles = makeStyles({
    footer_appBar: {
        width: "33%",
        minWidth: "400px",
        minHeight: "100px",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        padding: 0,
        borderRadius: "0 0 5px 5px",
    }
});