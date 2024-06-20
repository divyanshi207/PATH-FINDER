// comment bala sec
import { API } from "../../../service/api"; 
import { useContext } from "react";
import { Box, Typography, styled } from "@mui/material"

import { Delete } from "@mui/icons-material";

import { DataContext } from "../../../context/DataProvider";

const Componet = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding :10px;
`
const Conatiner= styled (Box)  `
    display:flex;
    margin-bottom:5px;
`

const Name=styled(Typography)`
    font-weight:600;
    font-size:18px;
    margin-right: 20px;
`

const StyleDate= styled(Typography) `
    color: #878787;
    font-size:15px;
    margin-top:2px;
`

const DeleteIcon =styled(Delete)`
    margin-left:auto;
`
const Comment=({comment, setToggle})=>{

    const {account} = useContext(DataContext);
    const removeComment=async()=>{
        try {
            let response =await API.deleteComment(comment._id);
            if(response.isSuccess){
                setToggle(prevState => !prevState);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Componet>
            <Conatiner>
                <Name>{comment.name}</Name>
                <StyleDate> {new Date(comment.date).toDateString()} </StyleDate>
                {comment.name === account.username  && <DeleteIcon onClick={ ()=> removeComment()}/>}
            </Conatiner>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Componet>
    )
}

export default Comment;