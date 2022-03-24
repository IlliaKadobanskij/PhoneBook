import Grid from "@mui/material/Grid";
import {Alert, Button, NativeSelect, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ContactAvatar from "../ContactAvatar/ContactAvatar";


const UpdateContactForm = () => {

    const [errorMessage, setErrorMessage] = useState(null);

    const location = useLocation();
    let {id} = useParams();

    let passedMethodList = null;
    let error = null;

    try{
        passedMethodList = location.state.passedMethodList
    }catch (e){}
    try{
        error = location.state.error
    }catch (e){}

    const [data, setData] = useState([])

    useEffect(async () => {
        let res = await fetch("/api/profiles/" + id);
        res = await res.json();
        setData(res);
        if (typeof res.communication_methods !== 'undefined' && res.communication_methods.length > 0) {
            setMethodList(res.communication_methods)
        } else {
            if (passedMethodList) {
                setMethodList(passedMethodList)
            } else {
                setMethodList([{name: "", info: ""}])
            }
        }
        if (error){
            setErrorMessage(error)
        }

    }, [])

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [contactName, setContactName] = useState("");
    const [methodList, setMethodList] = useState([
        {
            name: "",
            info: ""
        }]);

    let navigate = useNavigate();


    const handleMethodChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...methodList];
        list[index][name] = value;
        setMethodList(list);
    };

    const handleMethodRemove = (index) => {
        const list = [...methodList];
        list.splice(index, 1);
        setMethodList(list);
    };

    const handleDelete = () => {
        fetch(`/api/profiles/${id}/`, {
            method: 'DELETE',
        })
            .then(response => console.log(response.text()))
            .then(navigate('/'))
            .then(window.location.reload())
            .catch(error => console.log(error))
    };

    const handleServiceAdd = () => {
        setMethodList([...methodList, {name: "", info: ""}]);
    };

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const updateCommunicationMethods = (profileId) => {
        methodList.map(method => {
            method['profile'] = profileId
        })

        fetch('/api/list_communication_methods/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(methodList),
        })
            .then(res => {
                if (!res.ok) {
                    res.text().then(text => {
                        setErrorMessage(text)
                    })
                } else {
                    navigate(`/contact/${profileId}`)
                }
            })
            .catch(error => console.log(error))
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        const uploadData = new FormData(event.currentTarget);

        if (contactName) {
            uploadData.append('contact_name', contactName)
        }
        if (selectedImage) {
            uploadData.append('avatar', selectedImage)

            fetch(`/api/profiles/${id}/`, {
                method: 'PUT',
                body: uploadData,

            })
                .then(response => response.json())
                .then(response => {
                    updateCommunicationMethods(response.id)
                })
                .catch(error => console.log(error))
        }

        fetch(`/api/profiles/${id}/`, {
            method: 'PATCH',
            body: uploadData,

        })
            .then(response => response.json())
            .then(response => {
                updateCommunicationMethods(response.id)
            })
            .catch(error => console.log(error))

    };
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{display: 'none'}}
                        onChange={e => setSelectedImage(e.target.files[0])}
                    />
                    <Grid container>
                        <Grid item>
                            <label htmlFor="select-image">
                                <ContactAvatar imageUrl={imageUrl} contact={data}/>
                            </label>
                        </Grid>
                        <Grid style={{margin: "0 20px 0 auto"}} item>
                            <Button variant="contained" style={{
                                marginTop: "10px",
                                backgroundColor: "#e02e2e",
                            }} onClick={handleDelete}>
                                <DeleteIcon style={{
                                    width: "30px",
                                    height: "30px",
                                    color: "black"
                                }}/>
                            </Button>
                        </Grid>
                    </Grid>

                    {(errorMessage) ? <Alert sx={{margin: "0 auto"}} severity="error">
                                {errorMessage.split('"')[3]}
                        </Alert> : ''}

                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                style={{
                                    width: "200px",
                                    margin: "10px",
                                }}
                                type="text"
                                InputLabelProps={{shrink: true}}
                                label={"Name"}
                                variant="outlined"
                                value={contactName ? contactName : data.contact_name}
                                onChange={(evt) => setContactName(evt.target.value)}
                            />
                        </Grid>
                        <Grid alignItems={"center"} container className="form-field">
                            {methodList.map((singleMethod, index) => (
                                <Grid container key={index} className="services">
                                    <Grid container className="first-division">
                                        <Grid item xs={1}>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <NativeSelect
                                                style={{marginTop: '5px'}}
                                                name="name"
                                                id="name"
                                                value={singleMethod.name}
                                                onChange={(e) => handleMethodChange(e, index)}
                                            >
                                                <option value={""}/>
                                                <option value={"phone"}>phone</option>
                                                <option value={"telegram"}>telegram</option>
                                                <option value={"skype"}>skype</option>
                                                <option value={"email"}>email</option>

                                            </NativeSelect>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                name="info"
                                                type="text"
                                                id="info"
                                                value={singleMethod.info}
                                                onChange={(e) => handleMethodChange(e, index)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item className="second-division">
                                            {methodList.length !== 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => handleMethodRemove(index)}
                                                    className="remove-btn"
                                                >
                                                    <DeleteIcon style={{'color': "red"}}/>
                                                </Button>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {methodList.length - 1 === index && methodList.length < 4 && (
                                                <Button
                                                    type="button"
                                                    onClick={handleServiceAdd}
                                                    className="add-btn"
                                                >
                                                    <span>Add a Method</span>
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} sx={{mb: 3}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 5,}}
                            >
                                Save
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
    )
}

export default UpdateContactForm