import React,{useEffect,useState} from 'react'
import "./TrainerCard.css"
import img from "../../Images/LoginBackground.jpg"
import { Link } from 'react-router-dom'
import axios from "../axios/axios";
function Trainercard() {
  const [ddata, setData] = useState([""]);
  const [error, setError] = useState(false);
  useEffect(() => {
    
    axios()
    .get("/api/trainers")
    .then((response) => {
      console.log(response.data[0].profile_picture)
      setData(response.data)
     
    })
    .catch((error) => {
      setError(true)
      if(!error.response)
    return
  
  
  }
    
    );
  
  }, []);

let trainers=[]
ddata.forEach((e,i)=>{
  trainers.push(
  <div key={ddata[i].id} class="carda" style={{backgroundImage:ddata[i].profile_picture?'url(http://localhost:8000/storage/'+ddata[i].profile_picture+')': 'url(http://localhost:8000/storage/bpp.webp)',backgroundRepeat: 'no-repeat',backgroundSize:'contain'}}>

  <div class="content1">
  <h2 class="title">{ddata[i].name+'('+ddata[i].email+')'}</h2>



      <p class="copy">Check out our Courses and have beautiful time with us </p><Link to={"/courses/"+ddata[i].id}> <button class="btn">Check Courses</button></Link>
  </div>
</div>)
}
)

  return (
   error?"": <div class={"page-content1"}>

    {trainers}  
     
      </div>

  
   
  )
}

export default Trainercard
