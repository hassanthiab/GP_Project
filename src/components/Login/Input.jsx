import styled from "styled-components";
import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import { borderColor } from "@mui/system";
export default function Input(props)
{
    return(
        <div class="container " >

            <label style={{color:"white"}}>{props.input_label}</label>
        <StyInput class="form-control" style={{borderColor:props.bordercolor}} onChange={props.onChange} type={props.type} value={props.value} name={props.name} placeholder={props.placeholder}></StyInput>
   

      </div>
    );


}
const StyInput = styled.input`
background: rgba(255,255,255,0.7);
box-shadow: 0 8px 32px 0 rgba (31,38,135, 0.37);
border-radius: 2rem;
width: 100%;
margin: 0.5rem 0 0.5rem 0 ;
height: 2rem;
padding: 1rem;
border-width:2px;
border-color:white;
color:black;
outline:none;
    &:focus
    {
        display:inline-block ;
        box-shadow:0 0 0 0.2rem #ffffff ;
        ::placeholder
        {
            color:transparent;
        }
    }
    &::placeholder
    {

    }
`;
