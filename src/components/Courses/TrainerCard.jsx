import React,{useEffect,useState} from 'react'
import "./TrainerCard.css"
import img from "../../Images/LoginBackground.jpg"
import { Link } from 'react-router-dom'
import axios from "../axios/axios";
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
function Trainercard() {
  const [ddata, setData] = useState([""]);
  const [username, setUsername] = useState("");

  const [error, setError] = useState(false);
  const a = localStorage.getItem("type");


  useEffect(() => {

    axios()
    .get("/api/" + a + "user")  .then((response) => {
      setUsername(response.data.username)
     
    })
    .catch((error) => {
      setError(true)
      if(!error.response)
    return});

    axios()
    .get("/api/trainers")
    .then((response) => {
      console.log(response.data[0].profile_picture)
      setData(response.data)

       })
 
    .catch((error) => {
      setError(true)
      if(!error.response)
    return });
  
  }, []);

  const like=(id)=>{
    axios()
    .post("/api/like/"+id)
    .then((response) => {
      axios()
      .get("/api/trainers")
      .then((response) => {
        console.log(response.data[0].profile_picture)
        setData(response.data)
       
      })
      .catch((error) => {
        setError(true)
        if(!error.response)
      return});



    })
    .catch((error) => {
      setError(true)
      if(!error.response)
    return});



  }
  
  const disLike=(id)=>{
    axios()
    .post("/api/disLike/"+id)
    .then((response) => {
      axios()
      .get("/api/trainers")
      .then((response) => {
        console.log(response.data[0].profile_picture)
        setData(response.data)
       
      })
      .catch((error) => {
        setError(true)
        if(!error.response)
      return});



    })
    .catch((error) => {
      setError(true)
      if(!error.response)
    return});
  }
let trainers=[]
ddata.forEach((e,i)=>{
  trainers.push(
    <div key={ddata[i]?ddata[i].trainer.id:''} class="carda" style={{backgroundImage:ddata[i]?ddata[i].trainer.profile_picture?`url(http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/`+ddata[i].trainer.profile_picture+')': `url(http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/bpp.webp)`:'',backgroundRepeat: 'no-repeat',backgroundSize:'cover',backgroundPosition: 'center'}}>
  <div class="content1">
  
  <h2 class="title">{ddata[i]?ddata[i].trainer.name+'('+ddata[i].trainer.email+')':''}</h2>


      <p class="copy">Check out our Courses and have beautiful time with us </p><Link to={ddata[i]?"/courses/"+ddata[i].trainer.id:''}> <button class="btn">Check Courses</button></Link>
    {  ddata[i]?
    a=='admin/'?
    <div> 
     
    <Button disabled onClick={like} style={{margin:'auto',color:'white'}} ><ThumbUpIcon /></Button>{ddata[i].likesCount}
     <Button disabled onClick={disLike} style={{margin:'auto',color:'white'}}><ThumbDownIcon /></Button>{ddata[i].dislikesCount}

     </div>:<div> 
     
     <Button onClick={()=>like(ddata[i]?ddata[i].trainer.id:'')} style={{margin:'auto',color:ddata[i].likes.includes(username)?'':'white'}} ><ThumbUpIcon /></Button>{ddata[i].likesCount}
     <Button onClick={()=>disLike(ddata[i]?ddata[i].trainer.id:'')} style={{margin:'auto',color:ddata[i].disLikes.includes(username)?'red':'white'}}><ThumbDownIcon /></Button>{ddata[i].dislikesCount}

     </div>:
   
        ''
    }
  </div>

</div>

)

}
)

  return (
   error?"": <div class={"page-content1"}>

    {trainers}  
     
      </div>

  
   
  )
}

export default Trainercard
