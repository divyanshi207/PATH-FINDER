//idhr blog m click krne p  blog ki details dekhnge or useContext se jo blog jisne lekha h uske m bs edit delete button aygaa
import { useState,useEffect,useContext } from 'react';
 
import {Box , Typography, styled} from '@mui/material'

import {Link, useParams,useNavigate} from 'react-router-dom'

import {Edit, Delete }from '@mui/icons-material';

import {API} from'../../service/api'

import { DataContext } from '../../context/DataProvider';

import Comments from './comment/Comments';

const Container= styled(Box)(({ theme })=>({
    margin :'30px 40px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}))
    

const Image=styled('img')({
    width:'100%',
    height: '55vh',
    objectFit:'cover'
    
})

const Heading = styled(Typography)`
    font-size:30px;
    font-weight:600;
    text-align:center;
    word-break:break-word;
    margin : 30px 0 10px 0;
`
const EditIcon=styled(Edit)`
     margin :5px;
     padding: 5px;
     border: 2px solid #878787;
     border-radius:10px;
`
const DeleteIcon=styled(Delete)`
     margin :5px;
     padding: 5px;
     border: 2px solid #878787;
     border-radius:10px;
`
const Author=styled(Box)`
    display:flex;
    margin : 18px 0;
    color: #878787;
    padding:10px;
`
const DetailView=()=>{

    const [post,setPost]=useState({});

    const {id}=useParams();
    const{account}=useContext(DataContext);
    const navigate=useNavigate();

    const url= post.picture ? post.picture : "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    useEffect(()=>{
        const fecthData=async()=>{
            try {
               let response=await API.getPostById(id);
               if(response.isSuccess){
                setPost(response.data);
               }
            } catch (error) {
                console.log(error);
            }
        }
        fecthData();
    },[])

    const deletePost=async()=>{
        try {
            let response=await API.deletePost(post._id);
            if(response.isSuccess){
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container>
            <Image src={url} alt='picture' />
            <Box style={{float: 'right'}} >
                { // post ka username agr acc k username se equal h to edit delete button delkana
                    account.username===post.username &&
                    <>
                        <Link to={`/update/${post._id}`} >
                            <EditIcon color='primary' />
                        </Link>
                        <DeleteIcon onClick={()=> deletePost()}color='error' />
                    </>
                }
            </Box>
            <Heading >{post.title}</Heading >

            <Typography style={{wordBreak:'break-word' , margin:'auto'}}>{post.description}</Typography>

            <Author>
                <Typography>
                    Author: <Box component={'span'} style={{fontWeight:'600'}}>
                    {post.username}
                    </Box>   
                </Typography>
                <Typography style={{marginLeft:'auto'}} >{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

                
                <Comments post={post} />
        </Container>
    )
}



export default DetailView;