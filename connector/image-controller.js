

const url='http://localhost:8000';
export const uploadImage=(request,response)=>{
    console.log('IM IN')
    if(!request.file){
        return response.status(404).json({msg:"FILE NOT FOUND"});
    }

    const imageUrl=`${url}/file/${request.file.filename}`

    return response.status(200).json(imageUrl);
}