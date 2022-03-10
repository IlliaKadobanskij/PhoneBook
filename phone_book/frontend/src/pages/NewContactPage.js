import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button, TextField} from "@mui/material";
import {Icon} from '@iconify/react';
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";


const MethodIcon = styled(Icon)({
    color: "black",
    width: "27px",
    height: "27px"
});


const NewContactPage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [contactName, setContactName] = useState("");

    const [serviceList, setServiceList] = useState([{service: ""}]);

    const handleServiceChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, {service: ""}]);
    };

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData(event.currentTarget);

        uploadData.append('contact_name', contactName)
        uploadData.append('avatar', selectedImage)

        console.log(serviceList)

        fetch('/api/profiles/', {
            method: 'POST',

            body: uploadData,

        })
            .then(res => console.log(res))
            .catch(error => console.log(error))

    };

    const methodIcons = {
        "phone": (<MethodIcon icon="ant-design:phone-filled"/>),
        "telegram": (<MethodIcon icon="icon-park:telegram"/>),
        "skype": (<MethodIcon icon="brandico:skype"/>),
        "email": (<MethodIcon icon="eva:email-fill"/>),
    };

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


                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        name="avatar"
                        style={{display: 'none'}}
                        onChange={e => setSelectedImage(e.target.files[0])}
                    />
                    <label htmlFor="select-image">
                        <Avatar
                            src={imageUrl}
                            component={Paper}
                            elevation={4}
                            sx={{
                                bottom: "40px",
                                right: "20px",
                                width: "150px",
                                height: "150px",
                                border: "2px solid white",
                                zIndex: "2",
                            }}/>
                    </label>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                style={{
                                    width: "200px",
                                    margin: "5px"
                                }}
                                type="text"
                                name="name"
                                label="Name"
                                variant="outlined"
                                value={contactName}
                                onChange={(evt) => setContactName(evt.target.value)}
                            />
                        </Grid>

                        <Grid container className="form-field">
                            {serviceList.map((singleService, index) => (
                                <Grid container key={index} className="services">
                                    <Grid container className="first-division">
                                        <Grid item xs={4}>
                                            <TextField
                                                name="service"
                                                type="text"
                                                id="service"
                                                value={singleService.service}
                                                onChange={(e) => handleServiceChange(e, index)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                name="service"
                                                type="text"
                                                id="service"
                                                value={singleService.service}
                                                onChange={(e) => handleServiceChange(e, index)}
                                                required
                                            />
                                        </Grid>
                                        <Grid xs={4} item className="second-division">
                                        {serviceList.length !== 1 && (
                                            <Button
                                                type="button"
                                                onClick={() => handleServiceRemove(index)}
                                                className="remove-btn"
                                            >
                                                <span>X</span>
                                            </Button>
                                        )}
                                    </Grid>
                                        <Grid item xs={12}>
                                            {serviceList.length - 1 === index && serviceList.length < 4 && (
                                                <Button
                                                    type="button"
                                                    onClick={handleServiceAdd}
                                                    className="add-btn"
                                                >
                                                    <span>Add a Service</span>
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid className="output">
                            {serviceList &&
                                serviceList.map((singleService) => (
                                    console.log(singleService.service)
                                ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Footer/>
        </Box>
    )
}

export default NewContactPage
