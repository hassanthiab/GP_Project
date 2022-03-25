import axios from 'axios'


let api=({token=null}={})=>{
  const api=axios.create({
    baseURL:'http://localhost:8000',
    withCredentials:true
  })

if(token){
  api.defaults.headers.common['Authorization']=`Bearer ${token}`
}

return api

}
export default api