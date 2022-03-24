import Footer from "../components/Footer/Footer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "../components/Header/Header";
import NewContactForm from "../components/NewContactForm/NewContactForm";



const NewContactPage = () => {

    return (
        <Box sx={{
            width: "33%",
            minWidth: "400px",
            minHeight: "1000px",
            mx: 'auto',
            overflow: 'hidden',
            backgroundColor: "lightgray",
            borderRadius: "5px 5px 0 0",
        }}>
            <Header search={false}/>
            <Paper style={{
                margin: "130px 30px 0 30px",
                height: "700px"
            }}>
                <NewContactForm />
            </Paper>
            <Footer/>
        </Box>
    )
}

export default NewContactPage
