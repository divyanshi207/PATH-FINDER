
import { AppBar, Toolbar, Typography ,styled} from "@mui/material";
import React, { Component } from 'react'
import { Link } from "react-router-dom";

const Component1=styled(AppBar)`
    background: white;
    color: black;
`
const Container=styled(Toolbar)`
    justify-content: center;
    &> a{
        padding: 20px;
        color: black;
        text-decoration:none;
    }
`
const Header=()=>{
    return(
        <Component1>
            <Container>
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/contact">CONTACT</Link>
                <Link to="/login">LOGOUT</Link>
            </Container>
        </Component1>
    )
}

export default Header;