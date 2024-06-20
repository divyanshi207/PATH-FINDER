
import { request, response } from "express";
import jwt from 'jsonwebtoken';
import User from "../model/user.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Token from "../model/token.js";
dotenv.config();

export const signupUser= async(request,response)=>{
    console.log("entered")
    //jb api banate h to yha 2 chej aati h response request
    // front end jo b aata h bo request k andr
    // backend se front end k bhjna h to response
    try {
        //{hassed password banane k liye salt bnaya jese pass h 12345 to ye koi acces na kr paye to iske liye hassed password banaya}
        // const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(request.body.password,10);

        const user={username: request.body.username,
            name:request.body.name,
            password:hashedPassword
        };
        // fronht end k object ata h pura to req,body krke access kr lete h
        const newUser=new User(user);
        await newUser.save();
        return response.status(200).json({msg:'signup successfull'})
    } catch (error) {
        return response.status(500).json({msg:'Error in backend'})
    }

}

export const loginUser= async(request,response)=>{
    let user=await User.findOne({username : request.body.username})
    if(!user){
        return response.status(400).json({msg:'Username not found'})
    }
    try{
       let match=await bcrypt.compare(request.body.password,user.password)
       if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15min'});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const newToken=new Token({token:refreshToken})
            await newToken.save();

            return response.status(200).json({accessToken: accessToken ,
                 refreshToken: refreshToken,
                 name:user.name,
                 username:user.username })

       }else{
        return response.status(400).json({msg:'Wrong Password'})
       }
    }
    catch(error){
        return response.status(500).json({msg:'Error while logging in TRY AGAIN'})
    }
}