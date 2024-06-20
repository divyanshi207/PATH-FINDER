import axios from 'axios';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import { getAccessToken,getType } from '../utiles/common-utils';
const API_URL = 'http://localhost:8000';

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
       "Accept": "application/json, form-data", 
        "Content-Type": "application/json"
    }
   
});

axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url= config.url +'/'+ config.TYPE.query;
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function (error){
        return Promise.reject(ProcessError(error));
    }
)
// if success ->return{isSuccess:true,data:object}
//if fail-> return{isfailure:true,status :string,msg:string,code:int}

const processResponse =(response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const ProcessError= async(error)=>{
    if(error.response){
        //request made and server responded with a status other
        //that falls out of range2.x.x(200)
        console.log('error response c',error)
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){

        //request made but no response was recieved
        // backend connect nhi hua
        console.log('error request b')
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }
    else{
        //font end mistake
        console.log('error network font end',error)
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}

const API={};
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body, showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method ==='DELETE' ? {} : body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}
export {API};