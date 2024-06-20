import React from 'react'
import { useState,useContext } from 'react';
import {Box, TextField,Button,styled,Typography} from '@mui/material'
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


const Component=styled(Box)`
width:400px;
box-shadow: 4px 1px 4px 1px rgb(0,0,0.5);
margin:auto;
`
const Image=styled('h1')({
  justifyContent:'center',
  color:'#181818',
  margin: 'auto',
  display: 'flex',
  padding:'50px 0 0'
});

const LoginButton=styled(Button)`
background:rgb(30, 48, 49);
text-transform:none;
color:white;
height:48px;
`
const SignupButton=styled(Button)`
background:white;
text-transform:none;
color:blue;
height:35px;
box-shadow:0 2px 4px rgb(0 0 0/20%);
`
const Text=styled(Typography)`
font-size:14px;
color:#878787;
`
//jb kpo html k tag m styled material ui bala dlna rhe to ese krte h
const Image1=styled('h4')({
  justifyContent:'center',
  color:'rgb(16, 27, 24)',
  margin: 'auto',
  display: 'flex',
});
// jb material ui nale se banate h to ese krte h backticks se
const Wrapper=styled(Box)`
padding: 25px 35px;
display:flex;
flex:1;
flex-direction:column;
&> div, &> button,&> p{
  margin-top:20px;
}
`

const loginInitialValues={
  username:'',
  password:''
}
//store krwane k liye signup k values
const signupInitialValues={
  name:'',
  username:'',
  password:''
}

const Login=({isUserAuthenticated})=> {
  const [account, toggleAccount]=useState('login');
  const [signup,setSignup]=useState(signupInitialValues);
  const[error,showError]=useState('');
 const[login,setLogin]=useState(loginInitialValues);

 const {setAccount}= useContext(DataContext);
 const navigate=useNavigate();


  const toggleSignup=()=>{
    //ye login se signup page pr jane k liye h
    if(account==='login'){
    toggleAccount('signup');}
  else{
    toggleAccount('login');
  }
   }
  const onInputChange=(e)=>{
    setSignup({...signup,[e.target.name]:e.target.value});
  }
    
  const signupUser= async()=>{
    try{
        let response=await API.userSignup(signup);
        if(response.isSuccess){
          showError('');
          setSignup(signupInitialValues);
          toggleAccount('login');
        }
        else{
          showError('something went wrong');
        }
      }
      catch(error){
        showError('something went wrong');
        console.log('errorrrrrrrrr')
      }
    }
    const onValueChange=(e)=>{
      setLogin({...login,[e.target.name]:e.target.value})
    }
    const loginUser=async()=>{
      try{
        let response=await API.userLogin(login);
        if(response.isSuccess){
            showError('')

            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
            setAccount({username: response.data.username , name: response.data.name});

            isUserAuthenticated(true);
            navigate('/');
            
        }else{
            showError('something went wrong')
        }
      }
      catch{
        showError('something went wrong');
        console.log('not logges in')
      }
    }

  return (
    <Box>
      <Component>
      <Box>
       <Image>Path Finder</Image>
       <Image1>Career Path Made Easy. Connect. Learn. Succeed.</Image1>
       {
        account==='login'?
          <Wrapper>
            <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter username"/>
      <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name="password"  label="Enter password"/>
      <LoginButton variant="contained" onClick={()=>{loginUser()}}>Login</LoginButton>
      <Text style={{textAlign:'center'}}>OR</Text>
      <SignupButton style={{color: 'black'}} onClick={()=>toggleSignup()}>Create An Acoount</SignupButton>
      </Wrapper> 
      :

      <Wrapper>
        {/* teeno m same function call kre h onInputChange to differntiate kese krnge ki e.target.value name ki h ya pass h ya username h to iske liye apn n name dal display */}
        <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='name' label="Enter name"/>
        <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='username' label="Enter username"/>
        <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='password'label="Enter password"/>

        {error && <Typography>{error}</Typography>}
        <SignupButton style={{color: 'black'}} onClick={()=> signupUser()}>Signup</SignupButton>
        <Text style={{textAlign:'center'}}>OR</Text>
        <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an acoount</LoginButton >
      </Wrapper>
}
      </Box>
      </Component>
      
    </Box>
  )
}

export default Login