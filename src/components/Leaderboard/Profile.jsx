import React from 'react'
import { useState,useEffect } from 'react'
import axios from "../axios/axios";

function Profile({ Leaderboard }) {

  
  return (
    <div id="profile">
    {Item(Leaderboard)}
    </div>
  )
}

function Item(data){
    return (
    <React.Fragment>
  {
                data.map((value, index) => (
                    <div className="flex" key={index} style={{justifyContent:'center'}}>
                        <div className="item">
                      

                            <img style={{width:'50px',height:'50px'}}   src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${value.profile_picture?value.profile_picture:'bpp.webp'}`} alt="" />
                            <div className="info">
                                <h3 className='name text-dark'>{value.name} </h3>    
                           
                            </div>
                            <strong style={{fontSize:25}}>({value.points} pts)</strong>                
                        </div>
                    
                    </div>
                    )
                )
            }

    </React.Fragment>
                
  
       

        
    )
}

export default Profile;
