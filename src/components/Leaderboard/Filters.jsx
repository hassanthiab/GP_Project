import React from 'react'
import {Leaderboard} from './Data.js'
import { useState,useEffect } from 'react'
import Profiles from './Profile.jsx';
import "./leaderboard.css"
import axios from "../axios/axios";
function Filters() {
    
    const [period, setPeriod] = useState(0);
    const [Leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        axios().get('api/getPoints').then((response) => { 
            setLeaderboard(response.data)
    
        }).catch((error) => {
          if(!error.response) return
    
        })
       
      }, []);

 

  return (
<div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="duration">
            <button data-id='0'>All-Time</button>
        </div>

        <Profiles Leaderboard={Leaderboard}></Profiles>

    </div>
  )
}


export default Filters
