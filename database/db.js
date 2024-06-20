import mongoose from "mongoose"


 const Connection= async(username,password)=>{
     const URL=`mongodb+srv://${username}:${password}@pathfinder.wghhqsl.mongodb.net/?retryWrites=true&w=majority&appName=PathFinder`
    try{
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log('DB connected succesfully');
    }catch(error){
        console.log('error while connecting DB',error);
    }
}
export default Connection;
