import styled from "styled-components";
import React from "react";
export default function Input({type,placeholder})
{
    return(<StyInput type={type} placeholder={placeholder}></StyInput>);

}
const StyInput = styled.input`
background: rgba(255,255,255,0.7);
box-shadow: 0 8px 32px 0 rgba (31,38,135, 0.37);
border-radius: 2rem;
width: 80%;
margin: 0.5rem 0 0.5rem 0 ;
height: 3rem;
padding: 1rem;
border:none;
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
