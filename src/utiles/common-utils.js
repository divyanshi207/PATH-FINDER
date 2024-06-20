

export const getAccessToken=()=>{
    return sessionStorage.getItem('accessToken')
}


// home page m publish krne m post ka agar description bda h to ... aajaye isliye
export const addElipsis=(str,limit)=>{
    if(str.length >limit){
        return str.substring(0,limit)+'...'
    }
    else{
        return str;
    }
}

export const getType=(value,body)=>{
    if(value.params){
        return{params:body}
    }else if(value.query){
        if(typeof body==='object'){
            return {query:body._id}
        }
        else{
            return {query : body}
        }
    }
    return {};
}