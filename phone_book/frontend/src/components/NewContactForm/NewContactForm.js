import Grid from "@mui/material/Grid";
import {Button, NativeSelect, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect, useState} from "react";
import ContactAvatar from "../ContactAvatar/ContactAvatar";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {TextFieldStyles} from "./Styles";


const NewContactForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [contactName, setContactName] = useState("");
    const [methodList, setMethodList] = useState([
        {
            name: "",
            info: ""
        }
    ]);

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

    const handleServiceAdd = () => {
        setMethodList([...methodList, {name: "", info: ""}]);
    };


    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const createCommunicationMethods = async (profileId) => {
        if (methodList.length === 1 && (!methodList[0].name && !methodList[0].info)) {
            return
        }
        methodList.map(method => {
            method['profile'] = profileId
        })

        await fetch('/api/list_communication_methods/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(methodList),
        })
            .then(res => {
                console.log('response:', res);
                return res
            })
            .then(async res => {
                let error;
                if (!res.ok) {
                    await res.text().then(text => {
                        error = text;
                    })
                    navigate(`/update_contact/${profileId}`, {
                        state: {
                            passedMethodList: methodList,
                            error: error,
                        }
                    });
                } else {
                    navigate(`/contact/${profileId}`)
                }
            })
            .catch(error => console.log(error))


    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData(event.currentTarget);

        uploadData.append('contact_name', contactName)

        if (selectedImage) {
            uploadData.append('avatar', selectedImage)
        }

        fetch('/api/profiles/', {
            method: 'POST',
            body: uploadData,

        })
            .then(response => response.json())
            .then(response => {
                if (methodList && methodList[0].name) {
                    createCommunicationMethods(response.id)
                } else {
                    navigate(`/contact/${response.id}`)
                }
            })
            .catch(error => console.log(error))
    };

    return (
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
                <ContactAvatar imageUrl={imageUrl}/>
            </label>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        style={TextFieldStyles}
                        type="text"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={contactName}
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
                                        defaultValue={"phone"}
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
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 5}}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewContactForm