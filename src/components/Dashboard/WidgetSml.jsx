import "./WidgetSml.css";
import { Visibility } from "@material-ui/icons";
import React, {useState,useEffect} from "react"
import TablePagination from '@mui/material/TablePagination';
import axios from "../axios/axios";

export default function WidgetSml() {
  const [count, setCount] = useState('');
  const [errors, setErrors] = useState({PricePerMin:''});
  const [input, setInput] = useState({PricePerMin:''});
useEffect(() => {
axios().get('/api/admin/getCounts').then((response)=>{
  setCount(response.data)
  setInput({PricePerMin:response.data.ppm})
}).catch((error)=>{if(!error.response)return})
}, []);

let changed = (event, inputId) => {
  
  let Sinput = { ...input };
  Sinput[inputId] = event.target.value;
  setInput(Sinput);


};
const editPrice=()=>{
  axios().put('/api/admin/editPrice/1',{'PricePerMin':input['PricePerMin']}).then((response)=>{
    setErrors({PricePerMin:""})
    var myToastEl = document.getElementById('myToastEl1')
    var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
    var myToastEl = document.getElementById('toast-body')
    myToastEl.innerHTML="the price has modified";
    myToast.show()
    
  }).catch((error)=>{
    if(!error.response)return
    let Reserrors = error.response.data.errors;

    let stateErrrors = { ...errors };
  if(!Reserrors) return;
    Object.keys(errors).forEach((element) => {
      if (Object.keys(Reserrors).includes(element)) {
        stateErrrors[element] = Reserrors[element];
      } else {
        stateErrrors[element] = "";
      }
    });

    setErrors(stateErrrors);

  })
}

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">-</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
       
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Number of trainers</span>
            <span className="widgetSmUserTitle">{count.tc}</span>
            <span className="widgetSmUsername">Number of users</span>
            <span className="widgetSmUserTitle">{count.uc}</span>
      
          </div>
    
          <div className="widgetSmUser" style={{marginLeft:"10%"}}>
            <div class="form-outline">
                      <input type={'text'} value={input['PricePerMin']} onChange={(event) => changed(event,"PricePerMin")}  id="PricePerMin" class="form-control" />
                      <label class="form-label" for="room">PricePerMin</label>
                      <label style={{ color: "#960000", fontWeight: "bold" }}>
                   {errors['PricePerMin']} 
                  </label>
                    </div>
       
                    <input  style={{width:'50%'}} class="btn btn-primary btn-lg" type="submit" onClick={editPrice} value="save" />
          </div>
        </li>

      </ul>

    </div>
  );
}