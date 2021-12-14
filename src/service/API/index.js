import axios from 'axios';
export default class API{
    static get(url, requestInfo) { 
        // requestInfo is for request, Exp: headers, authenticate data
            return new Promise((resolve, reject)=>{
                
               axios({
                   method: "GET",
                   url: url,
                   headers: {
                       "Accept" : "application/json",
                       "Content-type" : "application/json"
                   },
                   ...requestInfo
               }).then((res) => {
                   if(res.error){
                    reject(res.error)
                   }
                   else{
                    resolve(res.data);
                   }
               }).catch(err=>{ 
                reject({error: {msg: String(err)}});
             })
            })
        
    }

    static post(url, requestInfo){
        return new Promise((resolve, reject)=>{
            axios({
                method: "POST",
                url: url,
                headers: {
                    "Accept" : "application/json",
                    "Content-type" : "application/json"
                },
                ...requestInfo
            }).catch(err=>{ 
               reject({error: {msg: String(err)}});
            }).then((res) => {
                resolve(res.data);
            })
        })
    }
}