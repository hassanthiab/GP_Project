import "./WidgetSml.css";
import { Visibility } from "@material-ui/icons";
import React, {useState,useEffect} from "react"
import TablePagination from '@mui/material/TablePagination';
import axios from "../axios/axios";

export default function WidgetSml() {
  const [count, setCount] = useState('');
useEffect(() => {
axios().get('/api/admin/getCounts').then((response)=>{
  setCount(response.data)
}).catch((error)=>{if(!error.response)return})
}, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Numbers</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
       
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Number of trainers</span>
            <span className="widgetSmUserTitle">{count.tc}</span>
            <span className="widgetSmUsername">Number of users</span>
            <span className="widgetSmUserTitle">{count.uc}</span>
          </div>
     
        </li>

      </ul>

    </div>
  );
}