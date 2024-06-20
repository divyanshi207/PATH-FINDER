import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import {AddCircle as Add} from '@mui/icons-material';
import { useState ,useEffect, useContext} from "react";
import { useLocation ,useNavigate ,useParams} from "react-router-dom";
import {DataContext} from '../../context/DataProvider';
import {API} from '../../service/api'
// import { createPost } from "../../../../server/connector/post-controller";

const Image=styled('img')(
    {
        width:'95%',
        height:'55vh',
        justifyContent:'center',
        backgroundRepeat: 'repeat-x'
        // allignItem:'center'
        // objectFit:'cover'
    }
)
const center=styled(Box)`
    justify-content:center;
`
const Contain= styled(Box)(({ theme })=>({
    margin :'50px 70px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}))
const Form=styled(FormControl)`
margin-top:10px;
display: flex;
flex-direction:row;
`

const In=styled(InputBase)`
margin: 0 30px;
font-size:20px;
flex:1;
`

const CssForTextArea=styled(TextareaAutosize)`
    width:100%;
    margin-top:30px;
    font-size:20px;
    border:none;
    &: focus-visible{
        outline:none;
    }
`
const InitialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()
}


const Update=()=>{
    
    const [post, setPost]=useState(InitialPost);
    const [file, setFile]=useState('');
    const location=useLocation();
    const nagivate=useNavigate();
    const{id}=useParams();
    const {account}=useContext(DataContext)

    const url= post.picture ? post.picture :  'https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


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
    useEffect(()=>{
        const getImage= async()=>{
        try{
            if (file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);
            
            // aoi call for image upload get url from mangoo and dalo in neche balimline
                const response= await API.uploadFile(data);
                post.picture=response.data;
            }
        }
        catch(error){
            console.log("chiya error",error)
        }
    }
        getImage();
        post.categories=location.search?.split('=')[1] ||'All';
        post.username=account.username;

    },[file])

    const handleChange=(e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const updateBlogPost= async ()=>{
        try{
        let response=await API.updatePost(post);
        if(response.isSuccess){
            nagivate(`/details/${id}`);
        }
    }

    catch(error){
        console.log("Not Publish",error)
    }
    }
        return(
        <Contain>
        <center>
            <Image src={url} alt="Banner"  />
            
        </center>
        <Form>
            <label htmlFor="fileInput">
                <Add fontSize="large" color="action"/>
            </label>
            <input type="file" id="fileInput" style={{display:'none'}} onChange={(e)=> setFile(e.target.files[0])} />
            <In placeholder="Title" value={post.title} onChange={(e)=> handleChange(e)} name="title" />
            <Button variant="contained" onClick={()=> updateBlogPost()}>Update</Button>

        </Form>

        <CssForTextArea 
            minRows={5}
            placeholder="tell your story..."
            onChange={(e)=> handleChange(e)}
            name="description"
            value={post.description}
        />
        </Contain>
    )
}

export default Update;