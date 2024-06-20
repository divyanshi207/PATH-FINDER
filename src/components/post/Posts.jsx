
import { useState, useEffect } from "react"
import {API} from '../../service/api'
import { Box ,Grid,styled} from "@mui/material";
import Post from "./Post";
import { useSearchParams ,Link } from "react-router-dom";

const Posts=()=>{

    const [posts, setPosts]=useState([]);
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category')

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                let response=await API.getAllPosts({category : category ||''});
                if(response.isSuccess){
                    setPosts(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[category])

    return (
        <>
            {
                posts && posts.length >0 ? posts.map(post=>(
                    <Grid item lg={3} sm={4} xs={12} style={{marginBottom:10}} >
                        <Link to={`details/${post._id}`} style={{color:'inherit', textDecoration:'none'}} >
                            <Post post={post}/>
                        </Link>
                        
                    </Grid>
                )): <Box style={{color: '#878787', margin: '30px 80px', fontSize:18}} >
                        No data is available for selected category
                    </Box>
                    
            }
        </>
    )
}


export default Posts

