//middleware banaye iska kam h api call se phle kuch krna h to ye kr dega

import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';

const storage= new GridFsStorage({
    url :`mongodb+srv://divyanshi28agr16:xyz@pathfinder.wghhqsl.mongodb.net/?retryWrites=true&w=majority&appName=PathFinder`,
    options:{useNewUrlParser: true},
    file:(request,file)=>{
        const match=["image/png","image/jpg"];
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});