import {styled} from "@mui/material/styles";
import {Icon} from "@iconify/react/dist/iconify";
import React from "react";

export const MethodIcon = styled(Icon)({
    color: "black",
    width: "37px",
    height: "37px"
});

export const methodIcons = {
    "phone": (<MethodIcon icon="ant-design:phone-filled"/>),
    "telegram": (<MethodIcon icon="icon-park:telegram"/>),
    "skype": (<MethodIcon icon="brandico:skype"/>),
    "email": (<MethodIcon icon="eva:email-fill"/>),
};

export const ListStyles = {
    width: '100%',
    maxWidth: 450,
    backgroundColor: 'background.paper',
    paddingTop: "30px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "auto",
    bottom: "90px",
    height: "510px",
}

export const ListSubheaderStyles = {
    marginBottom: "20px",
    marginLeft: "10px"
}

export const ListItemTextStyles = {
    fontSize: "22px",
    marginLeft: "10px"
}
export const ListItemIconStyles = {
    marginLeft: "10px"
}
