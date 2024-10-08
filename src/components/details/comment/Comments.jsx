import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useState, useContext ,useEffect} from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from '../comment/Comment'

const Container=styled(Box)`
    margin-top:100px;
    display:flex;

`
const Image=styled('img')({

    width:50,
    height:50,
    borderRadius:'50%'
})

const StyleTextArea=styled(TextareaAutosize)`
    margin: 0 20px;
    height:100px;
    width:100%;
`

const initialValues={
    name:'',
    postId:'',
    comments:'',
    date:new Date()
}

const Comments=({post})=>{
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment]=useState(initialValues);
    const [comments, setComments]=useState([]);
    const {account}=useContext(DataContext);
    const [toggle, setToggle]=useState(false);

    useEffect(()=>{
        const getData=async()=>{
            try {
                let response= await API.getAllComments(post._id);
                if(response.isSuccess){
                    setComments(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    },[post,toggle])
    const handleChange=(e)=>{
        setComment({
            ...comment,
            name: account.username,
            postId:post._id,
            comments:e.target.value,
        })
    }

    const addComment=async(e)=>{
        try {
           let response= await API.newComment(comment);
           if(response.isSuccess){
            setComment(initialValues);
           }
           setToggle(prevState =>! prevState)
        } catch (error) {
            console.log(error);
        }
    }

    return(

        <Box>
            <Container>
                <Image src={url} alt="cmt-picture" />
                <StyleTextArea 
                    minRows={5}
                    placeholder="What's on your mind ?"
                    value={comment.comments}
                    onChange={(e)=> handleChange(e)}
                />
                <Button 
                variant="contained"
                 style={{height:40}} 
                onClick={(e)=>addComment(e)}
                >Post</Button>
            </Container>
            <Box>
                {
                comments && comments.length > 0 && comments.map(comment =>(
                    <Comment comment={comment} setToggle={setToggle}/>
                ))
                } 
            </Box>
        </Box>
    )
}

export default Comments;