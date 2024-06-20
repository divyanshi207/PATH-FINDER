import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../utiles/common-utils";

const Container=styled(Box)`
color:#EEEEEE;
background :url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
// filter: blur(1px); 
    border: 1px solid #d3cede;
    border-radius:5px;
    height: 180px;
    margin:5px;
    margin-left:20px;
    display: flex;
    allign-items: center;
    flex-direction:column;

    &>p {
        padding :0 5px 5px 5px;
    }

`
const Text=styled(Typography)`
    color:#B4B4B8;
    font-size:12px;
   
    
`
const Type=styled(Typography)`
    font-weight:660;
    font-size:'18px;
    text-align:center;

`

const Image=styled('img')({
    width: '100%',
    borderRadius: '3px 3px 0 0',
    objectFit:'cover',
    height:'150',
    margin:'10',
    opacity:'0.8'
})

const Details= styled(Typography)`

    font-size:15px;
    word-break:break-word;
    text-align:center;
    color:#E3E1D9;
`

const Post=({post})=>{
    const pGet=()=>{
        const post1= decodeURI(post.categories);
        return post1;
    } 
    return(
        <Container style={{opacity:'0.9'}}  >
            {/* <Image src="https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="blog" /> */}
            <Type style={{textAlign:'center' , marginTop:10}}>{addElipsis(post.title,20)}</Type>
            <Details>{addElipsis(post.description,100)}</Details>
            <Text>{post.username}</Text>
            <Text>{pGet()}</Text>
        </Container>
    )
}

export default Post;

